import { model, Schema } from "mongoose";

const conversationSchema = Schema({
    participants:[
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    messages:[{
        type: Schema.Types.ObjectId,
        ref: "Message",
        default:[],
    }
],
},{
    timestamps:true,
}
);

export const Conversation = model("Conversation",conversationSchema);
