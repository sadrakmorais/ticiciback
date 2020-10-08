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
	description: {
		type: String,
		required: true,
	},
	vacancies: {
		type: Number,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	observations: String,
});

module.exports = mongoose.model('events', EventSchema);
