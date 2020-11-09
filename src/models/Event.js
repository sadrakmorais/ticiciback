const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
	department: {
		type: Schema.Types.ObjectId,
		ref: 'departments',
	},
	name: {
		type: String,
		required: true,
	},
	period: {
		start: {
			type: Date,
			required: true,
		},
		end: {
			type: Date,
			required: true,
		},
	},
	isFinished: {
		type: Boolean,
		required: true,
		refault: false,
	},
	isAccepted: {
		type: Boolean,
		required: true,
		refault: false,
	},
	description: {
		type: String,
		required: true,
	},
	vacancies: {
		type: Number,
		required: true,
		default: 0,
	},
	location: {
		type: String,
		required: true,
	},
	observations: String,
	photo: String,
});

module.exports = mongoose.model('events', EventSchema);
