import db from "../connection/db.js";

const Tags = db.model('tags', {
    id: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

export default Tags