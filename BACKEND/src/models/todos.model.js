import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    isCompleted: { type: Boolean, default: false },
});

const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    day: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },

    totalTasks: { type: Number, default: 0 },
    completedTasks: { type: Number, default: 0 },

    goals: [goalSchema],
});

export const Todos = mongoose.model("Todos", todoSchema);
