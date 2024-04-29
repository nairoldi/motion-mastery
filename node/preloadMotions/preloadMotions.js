const mongoose = require('mongoose');

const preExistingMotionSchema = new mongoose.Schema({
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
    // Add any other fields you need for pre-existing motions
});

module.exports = mongoose.model("PreExistingMotion", preExistingMotionSchema);
