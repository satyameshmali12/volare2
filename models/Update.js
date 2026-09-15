import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    image: {
      type: String,
      required: false,
      trim: true,
    },

    googleDriveLink: {
      type: String,
      required: false,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Who can see this update
    visibility: {
      type: String,
      enum: ["public", "members_sponsors", "specific_sponsors"],
      default: "public",
    },

    // Used only when visibility = specific_sponsors
    sponsors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Optional information about when/where the activity happened
    dateTime: {
      type: Date,
      required: false,
    },

    location: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    // Useful for categorizing updates
    category: {
      type: String,
      enum: [
        "general",
        "project",
        "purchase",
        "testing",
        "competition",
        "event",
        "achievement",
        "milestone",
        "other",
      ],
      default: "general",
    },

    // Money/resource utilization
    amountSpent: {
      type: Number,
      min: 0,
      default: 0,
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
      trim: true,
    },

    resourceUsed: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    // Optional tags
    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    // Users who liked the update
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Number of likes can be obtained from likes.length,
    // so no separate likeCount is necessary.

    published: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Update || mongoose.model("Update", postSchema);
