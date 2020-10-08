const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
	department: {
		type: Schema.Types.ObjectId,
		ref: 'department',
	},
	name: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('courses', CourseSchema);
