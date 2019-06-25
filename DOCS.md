#API ROUTES

## Users

### POST `/api/users/`

accepts:

```javascript
{
    email: "test@test.com",
    firebase_uid: "258975325235",
    username: "Ralphiu",
    first_name: "Ralph",
    last_name: "Pill"
},
```

returns:

```javascript
{
    email: "test@test.com",
    firebase_uid: "258975325235",
    username: "Ralphiu",
    first_name: "Ralph",
    last_name: "Pill"
},
```

### PUT `/api/users/`

accepts:

```javascript
{
    email: "test2@test.com",
    firebase_uid: "258975325235",
    username: "Ralphiu",
    first_name: "Ralph",
    last_name: "Pill"
}
```

returns:

```javascript
{
    email: "test2@test.com",
    firebase_uid: "258975325235",
    username: "Ralphiu",
    first_name: "Ralph",
    last_name: "Pill"
}
```

### GET `/api/users/`

returns array of users

```javascript
[{
    id: 1,
    email: "test@test.com",
    firebase_uid: "258975325235",
    username: "Ralphiu",
    first_name: "Ralph",
    last_name: "Pill"
},
{...}]
```

### GET `/api/users/:firebase_uid`

returns user of `:firebase_uid`

```javascript
{
    id: id,
    email: "test@test.com",
    firebase_uid: "258975325235",
    username: "Ralphiu",
    first_name: "Ralph",
    last_name: "Pill"
}
```

returns array of pending friends for user with `:firebase_uid`

```javascript
[{
    id: id,
    email: "test@test.com",
    firebase_uid: "258975325235",
    username: "Ralphiu",
    first_name: "Ralph",
    last_name: "Pill"
},{...}
]
```

### DELETE `/api/users/:firebase_uid/`

deletes user with `:firebase_uid`

## Friends

### GET `api/request/:user_uid/:friend_uid`

Will send a friend requests from `user_uid` to `friend_uid`

returns

```javascript
{
    friend_uid: friend_uid,
    id: 1,
    status: "pending",
    user_uid: user_uid
}
```

### GET `api/accept/:user_uid/:friend_uid`

Will send a friend requests from `user_uid` to `friend_uid`

returns

```javascript
{
    friend_uid: friend_uid,
    id: 2,
    status: "accepted",
    user_uid: user_uid
}
```

### GET `api/reject/:user_uid/:friend_uid`

Will send a friend requests from `user_uid` to `friend_uid`

returns

```javascript
{
    friend_uid: friend_uid,
    id: 1,
    status: "rejected",
    user_uid: user_uid
}
```

### DELETE `api/reject/:user_uid/:friend_uid`

Will send a friend requests from `user_uid` to `friend_uid`

returns

```javascript
{
  message: `friend with id ${friend_uid} deleted`;
}
```

### GET `/api/friends/:firebase_uid/`

returns array of friends for user with `:firebase_uid`

```javascript
[{
    id: id,
    email: "test@test.com",
    firebase_uid: "258975325235",
    username: "Ralphiu",
    first_name: "Ralph",
    last_name: "Pill"
},{...}
]
```

### GET `/api/friends/:firebase_uid/pending`

returns array of pending friends for user with `:firebase_uid`

```javascript
[{
    id: id,
    email: "test@test.com",
    firebase_uid: "258975325235",
    username: "Ralphiu",
    first_name: "Ralph",
    last_name: "Pill"
},{...}
]
```

## Favorites

### GET `/api/favorites/`

returns array of all favorites:

```javascript
[
    {
        id: 1,
        firebase_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2",
        location_id: 1
    },
    {...}
]
```

### GET `/api/favorites/:firebase_uid`

returns array of `uid`'s favorites:

```javascript
[
    {
        id: 1,
        firebase_uid: uid,
        location_id: 1
    },
    {...}
  ]
```

### POST `/api/favorites/`

accepts:

```javascript
{
    id: 1,
    firebase_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2",
    location_id: 1
}
```

returns newly created favorite:

```javascript
{
    id: 1,
    firebase_uid: "XVf2XhkNSJWNDGEW4Wh6SHpKYUt2",
    location_id: 1
}
```

### DELETE `/api/favorites/:id`

uid: must me the id of the favorite you want to delete

returns

```javascript
{
  message: "Favorite deleted";
}
```

## Admin

### GET `api/promote/:uid/`

Promotes a user to administrator

returns

```javascript
{
  message: "user has been promoted to admin";
}
```

### PUT `api/demote/:uid/`

Demotes a user to administrator

returns

```javascript
{
  message: "admin privileges revoked";
}
```

## getting the fire base authentication key to make requests with

### TL;DR

copy this code into your console while logged in, take the key and
use it as the value for your `authorization` header in Postman.

### What to do if it doesn't work?

try to replace the string in this line of code with the value that you see on _your_ console as shown in image[0]

```javaScript
// Make a request to get a record by key from the object store
  var objectStoreRequest = objectStore.get(
    "firebase:authUser:AIzaSyCitaEbYQsGXYRnuUk0PthEzuwuTmV37PQ:[DEFAULT]" //<--SEE IMAGE  REPLACE
  );
```

image[0]
![Database value](image[0].png)

```javascript
var DB_NAME = "firebaseLocalStorageDb";
var STORE_NAME = "firebaseLocalStorage";
var DBOpenRequest = window.indexedDB.open(DB_NAME);
var db;

DBOpenRequest.onsuccess = function(event) {
  // store the result of opening the database in the db variable.
  // This is used a lot below
  db = DBOpenRequest.result;
  // Run the getData() function to get the data from the database
  getData();
};

function getData() {
  // open a read/write db transaction, ready for retrieving the data
  var transaction = db.transaction([STORE_NAME], "readwrite");

  // report on the success of the transaction completing, when everything is done
  transaction.oncomplete = function(event) {
    console.log("complete");
  };

  transaction.onerror = function(event) {};

  // create an object store on the transaction
  var objectStore = transaction.objectStore(STORE_NAME);

  // Make a request to get a record by key from the object store
  var objectStoreRequest = objectStore.get(
    "firebase:authUser:AIzaSyCitaEbYQsGXYRnuUk0PthEzuwuTmV37PQ:[DEFAULT]" //<--SEE IMAGE
  );

  objectStoreRequest.onsuccess = function(event) {
    var myRecord = objectStoreRequest.result;
    console.log(myRecord.value.stsTokenManager.accessToken);
  };
}
```
