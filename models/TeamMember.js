import mongoose from "mongoose";

const TeamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    vertical: {
      type: String,
      required: true,
      enum: ["mechanical", "electrical", "software"],
      lowercase: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.TeamMember ||
  mongoose.model("TeamMember", TeamMemberSchema);
