import mongoose from 'mongoose'

const exerciseSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	duration: {
		type: Number,
		required: true
	},
	date: {
		type: Date
	}
})

export default mongoose.model('Exercise', exerciseSchema)
