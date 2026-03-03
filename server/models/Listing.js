const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    roomType: {
      type: String,
      enum: ["single", "double", "triple"],
      required: true,
    },
    foodAvailable: {
      type: Boolean,
      default: false,
    },
    distanceFromCollege: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
      },
    },
    availability: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

listingSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Listing", listingSchema);