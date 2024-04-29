const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    motions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Motion",
        },
    ],
});

module.exports = mongoose.model("Workout", workoutSchema);