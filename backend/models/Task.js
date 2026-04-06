import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true },
    description: String,

    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo"
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Task", schema);