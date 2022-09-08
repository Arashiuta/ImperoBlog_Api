import db from "../connection/db";

const Users = db.model('users', {
    id: {
        type: Number,
        required: true
    },
    account: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    nickName: {
        type: String,
        require: false
    },
    headImg: {
        type: String,
        require: false
    },
    headImgName: {
        type: String,
        required: false
    },
    root: {
        type: Boolean,
        require: true
    }
})

export default Users