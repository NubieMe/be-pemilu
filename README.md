# How To Use Pemilu Backend Using Postman

How to use authorization

1. Click tab authorization on postman
2. Choose Type "Bearer Token" on the left
3. Insert token on the right

## User API

### Register User
- URL: http://localhost:5000/api/v1/register
- Method: ``POST``
- Request Body:
```json
{
    "username": "example",
    "password": "secret",
    "fullName": "exampleeeeeee",
    "address": "wakanda", //optional
    "gender": "male",     //optional
    "isAdmin": true 
}
```
IMPORTANT NOTE 1: show 'isAdmin' input in the form just for creating admin account. if there is no 'isAdmin' input, the default value is false.

IMPORTANT NOTE 2: only Admin account that can CUD Articles, Parties and Paslons 

- Response Body:
``` 
{
    message: "Account created successfully!",
    user: "example",
    token: inH3reY0uG0nN4g3ty0uRto|<3n,5oy0uw1lL4uT0m4t1c4lLyL0gG3d1n
}
```
note: you will received token which is necessary for authorization
### Login User
- URL: http://localhost:5000/api/v1/login
- Method: ``GET``
- Request Body:
```json
{
    "username": "example",
    "password": "secret",
}
```

- Response Body
```
{
    message: "Login successfully!",
    token: inH3reY0uG0nN4g3ty0uRto|<3n,5oy0uw1lL4uT0m4t1c4lLyL0gG3d1n
}
```
note: you will received token which is necessary for authorization

### Logout User
- URL: http://localhost:5000/api/v1/logout
- Method: ``GET``
- Request Body:
``` 
for this, you don't need any request body
```

- Response Body:
``` 
inH3reY0uG0nN4g3ty0uRto|<3n,5oy0uw1lL4uT0m4t1c4lLyL0gG3d1n
```
note: this response is a token that's gonna expired at the time you received it

### Get All User
- URL: http://localhost:5000/api/v1/user
- Method: ``GET``
- Request Body:
``` 
for this, you don't need any request body
```

- Response Body:
```json
[
    {
        "id": 1,
        "fullName": "exampleeeeeee",
        "address": "wakanda",
        "gender": "male",
        "paslon": [
            {
                "id": 1,
                "name": "senator armstrong"
            }
        ]
    },
    {
        "id": 2,
        "fullName": "examplee22222",
        "address": "konoha",
        "gender": "female",
        "paslon": null
    }
]
```
note: this will show you all user data without 'username', 'password' and 'isAdmin'

### Get One User
- URL: http://localhost:5000/api/v1/user/:id

    note: change the ``:id`` to id number of the user you want to get

    for example: ``http://localhost:5000/api/v1/user/1``
- Method: ``GET``
- Request Body:
``` 
there's no need request body, but you need to change the params
```

- Response Body:
```json
{
    "id": 1,
    "username": "example",
    "fullName": "exampleeeeeee",
    "address": "wakanda",
    "gender": "male",
    "paslon": [
        {
            "id": 1,
            "name": "senator armstrong"
        }
    ],
    "isAdmin": true
}
```
note: this will show you a user data without 'password'

### Update User
- URL: http://localhost:5000/api/v1/user/:id

    note: change the ``:id`` to id number of the user you want to updaet

    for example: ``http://localhost:5000/api/v1/user/1``
- Method: ``PATCH``
- Request Body:
```json
{
    "username": "example",
    "password": "secret",
    "fullName": "exampleeeeeee",
    "address": "wakanda",
    "gender": "male",
    "isAdmin": true 
}
```
note: you can update a few or entire data if needed

- Response Body:
``` 
{
    message: "Account updated successfully!",
    user: "example"
}
```

### Delete User
- URL: http://localhost:5000/api/v1/user/:id

    note: change the ``:id`` to id number of the user you want to delete

    for example: ``http://localhost:5000/api/v1/user/1``
- Method: ``DELETE``
- Request Body:
``` 
there's no need request body, but you need to change the params
```
note: you need to login first before delete the account

- Response Body:
``` 
{
    message: "Account deleted successfully!"
}
```

### Vote User
- URL: http://localhost:5000/api/v1/vote
- Method: ``PATCH``
- Request Body:
```json
{
    "paslon": 1
}
```
note: you can only vote once, and it can't be edited

- Response Body:
``` 
{
    message: "Voting success!",
    voted: 1
}
```
### Vote Result User
- URL: http://localhost:5000/api/v1/vote/result
- Method: ``GET``
- Request Body:
``` 
for this, you don't need any request body
```
- Response Body:
``` 
{
    message: "Vote Result",
    data: [
        20, //paslon 1
        13  //paslon 2
    ]
}
```
note: it shows based on how many paslon that are registered. the number '20' and '13' is the vote that they got

## Article API

### Create Article
- URL: http://localhost:5000/api/v1/article
- Method: ``POST``
- Request Body:
```json
{
    "title": "article1",
    "description": "blablablablabla",
    "image": "photo.jpg", //optional
}
```
IMPORTANT NOTE: only Admin account that can Create Article
- Response Body:
``` 
{
    message: "Article Created Successfully!",
    data: {
        "title": "article1",
        "description": "blablablablabla",
        "image": "http://imagestoredsite.com/",
        "author": 1,  //id of admin that create this article
        "id": 1,    //id of this article
        "createdAt": "2024-01-01T00:00:00.000Z"
    }
}
```
### Get All Article
- URL: http://localhost:5000/api/v1/article
- Method: ``GET``
- Request Body:
``` 
for this, you don't need any request body
```

- Response Body:
```json
[
    {
        "id": 1,
        "title": "article1",
        "image": "http://imagestoredsite.com/",
        "createdAt": "2024-01-01T00:00:00.000Z"
    },
    {
        "id": 2,
        "title": "article2",
        "image": "http://imagestoredsite.com/",
        "createdAt": "2024-01-01T00:00:00.000Z"
    }
]
```
note: shows all Article without 'description' and 'author'

### Get One Article
- URL: http://localhost:5000/api/v1/article/:id

    note: change the ``:id`` to id number of the user you want to get

    for example: ``http://localhost:5000/api/v1/article/1``
- Method: ``GET``
- Request Body:
``` 
for this, you don't need any request body
```

- Response Body:
```json
{
    "id": 1,
    "title": "article1",
    "description": "blablablablabla",
    "image": "http://imagestoredsite.com/",
    "author": {
        "id": 1,
        "fullName": "exampleeeeee"
    }
}
```

### Update Article
- URL: http://localhost:5000/api/v1/article/:id

    note: change the ``:id`` to id number of the user you want to update

    for example: ``http://localhost:5000/api/v1/article/1``
- Method: ``PATCH``
- Request Body:
```json
{
    "title": "article",
    "description": "blablablablabla",
    "image": "photo.jpg" //optional
}
```
note: you can update a few or entire data if needed

- Response Body:
``` 
{
    message: "article updated successfully!",
    data: {
        "title": "article",
        "description": "blablablablabla",
        "image": "photo.jpg"
    }
}
```
### Delete Article
- URL: http://localhost:5000/api/v1/article/:id

    note: change the ``:id`` to id number of the user you want to update

    for example: ``http://localhost:5000/api/v1/article/1``
- Method: ``DELETE``
- Request Body:
``` 
for this, you don't need any request body
```
- Response Body:
``` 
{
    message: "article deleted successfully!"
}
```

## Party API

### Create Party
- URL: http://localhost:5000/api/v1/party
- Method: ``POST``
- Request Body:
```json
{
    "name": "Panas Dalem",
    "leader": "Surya16",
    "image": "photo.jpg",
    "visimisi": ["Conquer Wakanda", "Went to isekai"],
    "address": "Konoha", //optional
    "paslon": 1   //optional
}
```
IMPORTANT NOTE: only Admin account that can Create Party
- Response Body:
``` 
{
    message: "Party Created Successfully!",
    data: {
        "name": "Panas Dalem",
        "leader": "Surya16",
        "image": "http://imagestoredsite.com/",
        "visimisi": ["Conquer Wakanda", "Went to isekai"],
        "address": "Konoha",
        "paslon": 1,
        "id": 1
    }
}
```
### Get All Party
- URL: http://localhost:5000/api/v1/party
- Method: ``GET``
- Request Body:
``` 
for this, you don't need any request body
```

- Response Body:
```json
[
    {
        "id": 1,
        "name": "Panas Dalem",
        "leader": "Surya16",
        "image": "http://imagestoredsite.com/",
        "visimisi": ["Conquer Wakanda", "Went to isekai"],
        "address": "Konoha"
    },
    {
        "id": 2,
        "name": "Panas Dalem",
        "leader": "Surya16",
        "image": "http://imagestoredsite.com/",
        "visimisi": ["Conquer Konoha", "Make a Gate to isekai"],
        "address": "Wakanda"
    }
]
```
note: paslon won't show up here, but in paslon's 'coalition' instead

### Get One Party
- URL: http://localhost:5000/api/v1/party/:id

    note: change the ``:id`` to id number of the user you want to get

    for example: ``http://localhost:5000/api/v1/party/1``
- Method: ``GET``
- Request Body:
``` 
for this, you don't need any request body
```

- Response Body:
```json
{
    "id": 1,
    "name": "Panas Dalem",
    "leader": "Surya16",
    "image": "http://imagestoredsite.com/",
    "visimisi": ["Conquer Wakanda", "Went to isekai"],
    "address": "Konoha"
}
```
### Update Party
- URL: http://localhost:5000/api/v1/party/:id

    note: change the ``:id`` to id number of the user you want to update

    for example: ``http://localhost:5000/api/v1/party/1``
- Method: ``PATCH``
- Request Body:
```json
{
    "id": 1,
    "name": "Panas Dalem",
    "leader": "Surya16",
    "image": "http://imagestoredsite.com/",
    "visimisi": ["Conquer Wakanda", "Went to isekai"],
    "address": "Konoha"
}
```
note: you can update a few or entire data if needed

- Response Body:
``` 
{
    message: "article updated successfully!",
    data: {
        "id": 1,
        "name": "Panas Dalem",
        "leader": "Surya16",
        "image": "http://imagestoredsite.com/",
        "visimisi": ["Conquer Wakanda", "Went to isekai"],
        "address": "Konoha"
    }
}
```
### Delete Party
- URL: http://localhost:5000/api/v1/party/:id

    note: change the ``:id`` to id number of the user you want to update

    for example: ``http://localhost:5000/api/v1/party/1``
- Method: ``DELETE``
- Request Body:
``` 
for this, you don't need any request body
```
- Response Body:
``` 
{
    message: "party deleted successfully!"
}
```

## Paslon API

### Create Paslon
- URL: http://localhost:5000/api/v1/paslon
- Method: ``POST``
- Request Body:
```json
{
    "name": "Senator Armstrong",
    "image": "photo.jpg",
    "visimisi": ["Conquer Wakanda", "it's nanomachine son"]
}
```
IMPORTANT NOTE: only Admin account that can Create Paslon
- Response Body:
``` 
{
    message: "Paslon Created Successfully!",
    data: {
        "name": "Senator Armstrong",
        "image": "http://imagestoredsite.com/",
        "visimisi": ["Conquer Wakanda", "it's nanomachine son"],
        "id": 1,
        "coalition": []
    }
}
```

### Get All Paslon
- URL: http://localhost:5000/api/v1/paslon
- Method: ``GET``
- Request Body:
``` 
for this, you don't need any request body
```

- Response Body:
```json
[
    {
        "id": 1,
        "name": "Senator Armstrong",
        "image": "http://imagestoredsite.com/",
        "visimisi": ["Conquer Wakanda", "it's nanomachine son"],
        "coalition": [
            {
                "id": 1,
                "name": "Panas Dalem"
            }
        ]
    },
    {
        "id": 2,
        "name": "Puh Sepuh",
        "image": "http://imagestoredsite.com/",
        "visimisi": ["lowed to the core of the earth", "dancing dulu ga seh"],
        "coalition": [
            {
                "id": 2,
                "name": "gerinday"
            }
        ]
    }
]
```
note: 'coalition' would automatically filled up, after paslon choosen by Party
### Get One Paslon
- URL: http://localhost:5000/api/v1/paslon/:id

    note: change the ``:id`` to id number of the user you want to get

    for example: ``http://localhost:5000/api/v1/paslon/1``
- Method: ``GET``
- Request Body:
``` 
for this, you don't need any request body
```

- Response Body:
```json
{
    "id": 1,
    "name": "Senator Armstrong",
    "image": "http://imagestoredsite.com/",
    "visimisi": ["Conquer Wakanda", "it's nanomachine son"],
    "coalition": [
        {
            "id": 1,
            "name": "Panas Dalem"
        }
    ]
}
```

### Update Paslon
- URL: http://localhost:5000/api/v1/paslon/:id

    note: change the ``:id`` to id number of the user you want to update

    for example: ``http://localhost:5000/api/v1/paslon/1``
- Method: ``PATCH``
- Request Body:
```json
{
    "name": "Senator Armstrong",
    "image": "photo.jpg",
    "visimisi": ["Conquer Wakanda", "it's nanomachine son"]
}
```
note: you can update a few or entire data if needed

- Response Body:
``` 
{
    message: "paslon updated successfully!",
    data: {
        "name": "Senator Armstrong",
        "image": "http://imagestoredsite.com/",
        "visimisi": ["Conquer Wakanda", "it's nanomachine son"]
    }
}
```

### Delete Paslon
- URL: http://localhost:5000/api/v1/paslon/:id

    note: change the ``:id`` to id number of the user you want to update

    for example: ``http://localhost:5000/api/v1/paslon/1``
- Method: ``DELETE``
- Request Body:
``` 
for this, you don't need any request body
```
- Response Body:
``` 
{
    message: "paslon deleted successfully!"
}
```
