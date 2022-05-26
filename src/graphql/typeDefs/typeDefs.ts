import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Post {
    id: ID
    title: String
    description: String
  }

  type ListingImage {
    thumbnail_url: String
    medium_url: String
    picture_url: String
    xl_picture_url: String
  }

  type Listing {
    _id: ID
    name: String
    summary: String
    images: ListingImage
  }

  type Query {
    hello: String

    getAllPosts: [Post]
    getAllListings: [Listing]
    getPost(id: ID): Post
  }

  input PostInput {
    title: String
    description: String
  }

  type Mutation {
    createPost(post: PostInput): Post
    deletePost(id: ID): String
    updatePost(id: ID, post: PostInput): Post
  }
`

export default typeDefs
