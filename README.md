# GraphQL API with Node.js and ES Modules
This is a simple example of a GraphQL API implemented using Node.js and ES modules. The API allows you to manage a list of users, including adding, updating, deleting, and retrieving users.

## Installation
1. Clone the repository: git clone **https://github.com/example/graphql-api.git**
2. Install dependencies: **npm install**

## Usage
To start the server, run npm start:

```sh
npm start
```

This will start the server on **http://localhost:3000/graphql**.

## Example Queries
Here are some example queries you can run in GraphiQL or GraphQL Playground:



### Get all users
```query {
  users {
    id
    name
    email
  }
}
```
### Get a single user by ID
```query {
  user(id: "1") {
    id
    name
    email
  }
}
```
### Add a new user
```mutation {
  addUser(name: "John Doe", email: "john@example.com") {
    id
    name
    email
  }
}
```

### Update an existing user
```bash {
  updateUser(id: "1", email: "jane@example.com") {
    id
    name
    email
  }
}
```
### Delete an existing user
```mutation {
  deleteUser(id: "1")
}
```
## Data Store
User data is stored in a file named **users.json**. You can edit this file directly to add or modify users.

## License
This project is licensed under the MIT License.