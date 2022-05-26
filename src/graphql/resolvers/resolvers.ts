import Post from './../../models/Post'
import Listing from './../../models/Listing'

interface Updates {
  title: string,
  description: string
}

const resolvers = {
  Query: {
    hello: () => {
      return 'Hello there'
    },
    getAllPosts: async () => {
      return await Post.find()
    },
    getAllListings: async () => {
      return await Listing.find().limit(20)
    },
    getPost: async (_parent, { id }, _context, _info) => {
      return await Post.findById(id)
    }
  },

  Mutation: {
    createPost: async (parent, args, context, info) => {
      const { title, description } = args.post
      const post = new Post({ title, description })
      await post.save()
      return post
    },
    deletePost: async (parent, args, context, info) => {
      const { id } = args
      const post = await Post.findById(id)
      if (post) {
        await Post.deleteOne(post)
        return 'Post deleted'
      } else {
        return 'No post found'
      }
    },
    updatePost: async (parent, args, context, info) => {
      const { id } = args
      const { title, description } = args.post
      const updates = {} as Updates
      if (title) {
        updates.title = title
      }
      if (description) {
        updates.description = description
      }
      const post = await Post.findByIdAndUpdate(id, updates, { new: true })
      return post
    }
  }
}

export default resolvers
