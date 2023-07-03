import { gql } from "apollo-angular";

// export class UsersQuery {

// }

export const GET_USERS=gql`
query{
    allUsers{
     id,
     firstName,
     lastName,
     email,
     password,
     confirmPassword,
     country
   }
 }
`
