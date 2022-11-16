mod storage;
mod store;

use rocket::{
    fs::{relative, FileServer},
    launch,
};

use store::StoreApi;

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount_store_api("store")
        .mount("/", FileServer::from(relative!("static")))
}
