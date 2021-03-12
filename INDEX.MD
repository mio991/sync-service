# Sync Storage

Make privacy driven apps posible through a publicly reachable privacy friendly sync service.

Don't store unnecesary data, like (user-)names or e-mail addresses. Only store requested data.

## Use Case
Syncing data between ofline first or offline only web apps in a privacy friendly way.
Later enable payment for storage. 
 
Exchange of Storage details needs to happen out of band, for example through a shared link or a QR-Code.

There MUST NOT be a listing endpoint.

### Creating, Reading and Updating Data
_in development_
| Action    | Request | Result |
|:----------|:--------|:-------|
| Create    | POST '/store/' with the data in the body.</br> _If payment is requiered a 'payment-token' cookie is needed._ | created id |
| Retrieve  | GET '/store/{id}' | stored data |
| Update    | PUT '/store/{id}' with new data in the body.</br>  _If payment is requiered a 'payment-token' cookie is needed._ | empty |

### Paying for storage
_In conception_

There my be an additional API to pay for access. Payment information should be stored in encrypted Tokens.

The tokens could be AES encrypted expiration dates.

How can we make the User responsible to store the Token, to avoid having to reisue it?
If we have to have the ability to reissue the Token we need to store to much information about the User.

## Notes

To be format agnostic we could store the `Content-Type` header width the data, but I would prefer to store only binary data.

We could later add a manifest.