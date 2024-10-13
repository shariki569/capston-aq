import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    PostTitle: {
      type: String,
      required: true,
    },
    PostDesc: {
      type: String,
      required: true,
    },
    PostImg: {
      type: String,
      required: true,
    },
    PostCat: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    Post_Uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a User model
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Post', PostSchema);
