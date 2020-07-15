const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const TasksSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Projects',
        require: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    completed: {
        type: Boolean,
        require: true,
        default: false,
    },

    creatdat: {
        type: Date,
        default: Date.now,

    },
});


const Task = mongoose.model('Task', TasksSchema);

module.exports = Task;