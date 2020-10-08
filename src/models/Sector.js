const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SectorSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('sectors', SectorSchema);
