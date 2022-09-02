import db from "../connection/db";

const Articles = db.model('articles', {
    id: {
        type: Number,
        required: true
    }, title: {
        type: String,
        required: true
    }, author: {
        type: String,
        required: false,
        default: 'noName',
    }, tag: {
        type: Array<string>,
        required: true
    }, cover: {
        type: String,
        required: false
    }, coverName: {
        type: String,
        required: false
    }, mdImgName: {
        type: String,
        required: false
    }, time: {
        type: String,
        required: true
    }, lastUpdataTime: {
        type: String,
        required: true
    }, oneSentence: {
        type: String,
        required: true
    }, content: {
        type: String,
        required: true
    }
})

export default Articles