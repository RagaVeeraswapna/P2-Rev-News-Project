const { ApolloServer, gql } = require('apollo-server');

// Define your schema using GraphQL SDL (Schema Definition Language)
const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    country: String!
    password: String!
    contactNumber: String!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, country: String!, password: String!, contactNumber: String!): User
  }
`;

// Define some sample data
const users = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    country: 'USA',
    password: 'password123',
    contactNumber: '1234567890',
  },
  // Add more users if needed
];

// Implement the resolvers
const resolvers = {
  Query: {
    getUser: (parent, { id }) => {
      // Retrieve the user by ID from the data source (e.g., database)
      return users.find(user => user.id === id);
    },
    getUsers: () => {
      // Retrieve all users from the data source (e.g., database)
      return users;
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      // Create a new user with the provided data
      const newUser = {
        id: String(users.length + 1),
        ...args,
      };

      // Store the new user in the data source (e.g., database)
      users.push(newUser);

      // Return the created user
      return newUser;
    },
  },
};

// Create an instance of ApolloServer and pass in the schema and resolvers
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});