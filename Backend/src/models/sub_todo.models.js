import mongoose, {Schema} from "mongoose";


const subToDoSchema = new Schema(
    {
        content: {
            type: String,
            required : true
        },
        complete:{
            type: Boolean,
            default: false
        },
        createdBy:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        
    },
    {timestamps: true});

export const SubTodo = mongoose.model("SubToDo", subToDoSchema);