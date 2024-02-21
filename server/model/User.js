import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
	ratings: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Recipe"
		}
	]


})

export default model("User", userSchema);