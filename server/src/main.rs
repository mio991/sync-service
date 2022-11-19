mod cors;
mod storage;
mod store;

use cors::CorsExtension;
use rocket::{launch, log::LogLevel, Config};

use store::StoreApi;

#[launch]
fn rocket() -> _ {
    let config = Config {
        log_level: LogLevel::Debug,
        ..Config::default()
    };
    rocket::custom(config).add_store("/store").add_cors()
    //.mount("/", FileServer::from(relative!("static")))
}
