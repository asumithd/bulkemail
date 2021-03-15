const mongoose = require('mongoose');

var bulkmailSchema = mongoose.Schema({
    bulkmailName: { type: String, required: true },
    bulkmailEmail: { type: String, required: true },
    active: { type: Boolean, required: false, default: true },
    createdAt: { type: Date, required: false, default: Date.now }
});

module.exports = mongoose.model('bulkmail', bulkmailSchema);