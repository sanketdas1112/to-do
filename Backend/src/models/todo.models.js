import mongoose, {Schema, model} from "mongoose";

const todoSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        complete: {
            type: Boolean,
            default: false
        },
        createdBy : {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        subTodos: [
            {
                type: Schema.Types.ObjectId,
                ref : "SubToDo"
            }
        ]
    }, 
    {timestamps: true});


export const Todo = model("Todo", todoSchema);