import db from "../connection/db.js";

const chatRooms = db.model('chatrooms', {
    name: {
        type: String,
        required:true
    },
    chatLog: {
        type: Array,
        required:true
    },
    delRoot: {
        type: Boolean,
        required:true
    }
})

export default chatRooms