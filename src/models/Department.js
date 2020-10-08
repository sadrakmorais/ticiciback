const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
	sector: {
		type: Schema.Types.ObjectId,
		ref: 'sectors',
	},
	name: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('departments', DepartmentSchema);
