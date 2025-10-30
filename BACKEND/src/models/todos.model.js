import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
    todo_id: { type: String, required: true },
    text: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
});

const todoSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date_id: { type: String, required: true  }, 
    month: { type: Number, required: true },
    year: { type: Number, required: true },

    totalTodoTasks: { type: Number, default: 0 },
    completedTodoTasks: { type: Number, default: 0 },
    dayEfficiency: { type: Number, default: 0 },

    goals: [goalSchema],
});

export const Todo = mongoose.model("Todo", todoSchema);
