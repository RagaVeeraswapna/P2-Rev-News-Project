import { gql } from "apollo-angular";

export const CREATE_User = gql`
mutation ($firstName:String!,$lastName:String!,$email:String!,$password:String!,$confirmPassword:String!,$country:String!){
    createUser(firstName:$firstName,lastName:$lastName,email:$email,password:$password,confirmPassword:$confirmPassword,country:$country){
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