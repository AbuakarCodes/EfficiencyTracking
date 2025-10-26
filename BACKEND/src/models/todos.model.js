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
    date_id:{type:String,required:true},
    day: { type: Number, required: true },
    month: { type: Number, required: true },
    year: { type: Number, required: true },

    totalTodoTasks: { type: Number, default: 0 },
    completedTodoTasks: { type: Number, default: 0 },
    // The date (day) we define as a id
    dayEfficiency:{ type: Number, default: 0 },
    qotes:{type:string, required:true},

    goals: [goalSchema],
});

export const Todos = mongoose.model("Todos", todoSchema);
