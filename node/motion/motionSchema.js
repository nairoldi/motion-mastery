const mongoose = require('mongoose');

const motionSchema = new mongoose.Schema({
    workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "workout",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    primaryMuscle: {
        type: String,
        required: true,
    },
    secondaryMuscle: {
        type: String,
    },
    reps: {
        type: Number,
    },
    time: {
        type: Number,
    },
});

module.exports = mongoose.model("Motion", motionSchema);