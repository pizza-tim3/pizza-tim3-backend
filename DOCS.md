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
