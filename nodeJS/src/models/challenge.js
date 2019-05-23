const mongoose = require('mongoose');

var challengeSchema = new mongoose.Schema({
    title: { type: String, uniq: true, required: true },
    description: { type: String, required: true },
    task: { type: String, required: true },
    solution: { type: String, required: true }
}, { collection: 'challenge' });

challengeSchema.pre('save', function (next) {
    next();
});

mongoose.model('challenge', challengeSchema);