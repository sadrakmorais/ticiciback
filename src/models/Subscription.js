const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	event: {
		type: Schema.Types.ObjectId,
		ref: 'events',
	},
});

module.exports = mongoose.model('subscriptions', SubscriptionSchema);
