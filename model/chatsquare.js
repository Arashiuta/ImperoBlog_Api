import db from "../connection/db.js";

const chatSquare = db.model('chatsquares', {
    tip: {
        type: String,
        required:true
    }
})

export default chatSquare