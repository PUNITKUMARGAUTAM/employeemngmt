const mongoose = require('mongoose');

const empSchema = new mongoose.Schema({

    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    position: { type: String },
    salary: { type: Number, default: 0 },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },


}, { timestamps: true });

module.exports = mongoose.model('Employee', empSchema);