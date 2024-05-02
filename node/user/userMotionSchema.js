const mongoose = require('mongoose');

const motionSchema = new mongoose.Schema({
     user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
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
    weight: {
        type: Number,
    },
    time: {
        type: Number,
    },
});

module.exports = mongoose.model("Motion", motionSchema);