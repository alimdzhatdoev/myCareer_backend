import mongoose from "mongoose";

const Role = new mongoose.Schema({
    value: {type: String, required: true, unique: true, default: "USER "},
})

export default mongoose.model('Role', Role )