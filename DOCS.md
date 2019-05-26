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

### GET `/api/users/:id`

returns user of `:id`

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

### GET `/api/users/:id/friends`

returns array of friends for user with `:id`

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

### DELETE `/api/users/:id/`

deletes user with `:id`

## Friends

### GET `api/request/:user_id/:friend_id`

Will send a friend requests from `user_id` to `friend_id`

returns

```javascript
{
    friend_id: friend_id,
    id: 1,
    status: "pending",
    user_id: user_id
}
```

### GET `api/accept/:user_id/:friend_id`

Will send a friend requests from `user_id` to `friend_id`

returns

```javascript
{
    friend_id: friend_id,
    id: 2,
    status: "accepted",
    user_id: user_id
}
```

### GET `api/reject/:user_id/:friend_id`

Will send a friend requests from `user_id` to `friend_id`

returns

```javascript
{
    friend_id: friend_id,
    id: 1,
    status: "rejected",
    user_id: user_id
}
```

### DELETE `api/reject/:user_id/:friend_id`

Will send a friend requests from `user_id` to `friend_id`

returns

```javascript
{
  message: `friend with id ${friend_id} deleted`;
}
```
