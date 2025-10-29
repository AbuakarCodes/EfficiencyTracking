import mongoose from "mongoose";

const efficiency = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        efficiencies: {
            type: Object,
            default: {}
        }
    },
    { timestamps: true }
)

export const Efficiencies = mongoose.model("Efficiencies", efficiency)