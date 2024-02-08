import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    comment: String,
    createdAt: Date,
    recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' }
})

export default model('Comment', commentSchema)

