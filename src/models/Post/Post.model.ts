import pkg from 'mongoose'
const { Schema, model } = pkg

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String
  }
})

export const Post = model('post', PostSchema)
