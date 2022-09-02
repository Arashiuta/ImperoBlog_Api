import db from "../connection/db";

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