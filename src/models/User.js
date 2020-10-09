const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Userchema = new Schema({
	course: {
		type: Schema.Types.ObjectId,
		ref: 'courses',
	},
	level: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	cpf: {
		type: String,
		required: true,
	},
	registration: String,
	isStudent: {
		type: Boolean,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('users', Userchema);
