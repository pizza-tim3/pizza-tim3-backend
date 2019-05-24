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

### DELETE `/api/users/:id`

deletes user with `:id`
