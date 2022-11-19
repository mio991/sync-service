use evmap::{ReadHandleFactory, WriteHandle};
use rocket::{async_trait, tokio::sync::Mutex};
use uuid::Uuid;

use super::Storage;

pub struct MemStorage {
    read: ReadHandleFactory<Uuid, Vec<u8>>,
    write: Mutex<WriteHandle<Uuid, Vec<u8>>>,
}

impl MemStorage {
    pub fn new() -> MemStorage {
        let (get_data, store_data) = evmap::new::<Uuid, Vec<u8>>();

        return MemStorage {
            read: get_data.factory(),
            write: Mutex::new(store_data),
        };
    }
}

#[async_trait]
impl Storage for MemStorage {
    async fn store(&self, id: uuid::Uuid, data: Vec<u8>) -> () {
        self.write.lock().await.update(id, data).refresh();
    }

    async fn read(&self, id: uuid::Uuid) -> Option<Vec<u8>> {
        self.read.handle().get_one(&id).map(|g| g.clone())
    }
}
