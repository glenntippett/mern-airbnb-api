import pkg from 'mongoose'
const { Schema, model } = pkg

const ListingSchema = new Schema({
  name: {
    type: String
  },
  summary: {
    type: String
  },
  images: {
    type: Object
  },
  address: {
    type: Object
  }
})

export const Listing = model('listing', ListingSchema, 'listingsAndReviews')
