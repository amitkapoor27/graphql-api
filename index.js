import { createServer } from 'http';
import { createHandler } from 'graphql-http/lib/use/express';
import express from 'express';
import { buildSchema } from 'graphql';
import { readFileSync, writeFileSync } from 'fs';

const app = express();

// Read the users data from the file
const userData = JSON.parse(readFileSync('./users.json', 'utf-8'));

// Define the GraphQL schema
const schema = buildSchema(`
  type User {
    id: ID
    name: String
    email: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    addUser(name: String!, email: String!): User
    updateUser(id: ID!, name: String, email: String): User
    deleteUser(id: ID!): ID
  }
`);

// Define the root resolver
const rootResolver = {
  users: () => userData,
  user: ({ id }) => userData.find((user) => user.id === id),
  addUser: ({ name, email }) => {
    const newUser = { id: String(userData.length + 1), name, email };
    userData.push(newUser);
    writeFileSync('./users.json', JSON.stringify(userData));
    return newUser;
  },
  updateUser: ({ id, name, email }) => {
    const userIndex = userData.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    const updatedUser = { ...userData[userIndex], name, email };
    userData[userIndex] = updatedUser;
    writeFileSync('./users.json', JSON.stringify(userData));
    return updatedUser;
  },
  deleteUser: ({ id }) => {
    const userIndex = userData.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    userData.splice(userIndex, 1);
    writeFileSync('./users.json', JSON.stringify(userData));
    return id;
  },
};

// Create the GraphQL endpoint
app.use(
  '/graphql',
  createHandler({
    schema,
    rootValue: rootResolver,
    graphiql: true,
  }),
);

// Start the server
const server = createServer(app);
server.listen(3000, () => {
  console.log('Server started on port 3000');
});
