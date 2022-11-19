use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::{Header, Status};
use rocket::{options, routes, Build, Request, Response, Rocket};

pub trait CorsExtension {
    fn add_cors(self: Self) -> Self;
}

impl CorsExtension for Rocket<Build> {
    fn add_cors(self: Self) -> Self {
        self.attach(CORS).mount("/", routes![options])
    }
}

#[options("/<_..>")]
fn options() -> Status {
    Status::Ok
}

struct CORS;

#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Add CORS headers to responses",
            kind: Kind::Response,
        }
    }

    async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new(
            "Access-Control-Allow-Methods",
            "POST, GET, PATCH, OPTIONS",
        ));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}
