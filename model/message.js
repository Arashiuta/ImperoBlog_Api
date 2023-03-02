import db from "../connection/db.js";

const Message = db.model('messages', {
    id: {
        type: Number,
        required: true
    },
    account: {
        type: String,
        required: true
    }, time: {
        type: String,
        required: true
    }, content: {
        type: String,
        required: true
    }
})

export default Message