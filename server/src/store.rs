use rocket::{get, http::uri::Origin, post, put, routes, trace, Build, Rocket, State};
use std::fmt;
use uuid::Uuid;

use crate::storage::{mem::MemStorage, Storage};

type StorageImpl = MemStorage;

pub trait StoreApi {
    /// Mounts Store API under `base` endpoint
    fn add_store<'a, B>(self: Self, base: B) -> Self
    where
        B: TryInto<Origin<'a>> + Clone + fmt::Display,
        B::Error: fmt::Display;
}

impl StoreApi for Rocket<Build> {
    fn add_store<'a, B>(self: Self, base: B) -> Self
    where
        B: TryInto<Origin<'a>> + Clone + fmt::Display,
        B::Error: fmt::Display,
    {
        self.mount(base, routes![create, retrieve, update])
            .manage(StorageImpl::new())
    }
}

#[post("/", data = "<content>")]
async fn create(storage: &State<StorageImpl>, content: Vec<u8>) -> String {
    let id = Uuid::new_v4();
    trace!("Create Item: {}", id);
    storage.store(id, content).await;

    id.to_string()
}

#[get("/<id>")]
async fn retrieve(storage: &State<StorageImpl>, id: Uuid) -> Option<Vec<u8>> {
    trace!("Retrieve: {}", id);
    storage.read(id).await
}

#[put("/<id>", data = "<content>")]
async fn update(storage: &State<StorageImpl>, id: Uuid, content: Vec<u8>) -> () {
    trace!("Update Item: {}", id);
    storage.store(id, content).await;
}
