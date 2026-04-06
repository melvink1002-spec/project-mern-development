import mongoose from "mongoose";

const Project = new mongoose.Schema({
  name: String,
  description: String,

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
});

export default mongoose.model("Project", Project);