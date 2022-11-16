pub mod mem;

use rocket::async_trait;
use uuid::Uuid;

#[async_trait]
pub trait Storage: Sync + Send {
    async fn store(&self, id: Uuid, data: Vec<u8>) -> ();
    async fn read(&self, id: Uuid) -> Option<Vec<u8>>;
}
