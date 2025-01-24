import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    task:{type:String, required:true},
});

export default mongoose.model.tasks||mongoose.model("tasks",userSchema)