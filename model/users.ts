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
    }, personalCover: {
        type: String,
        require: false
    }, createDate: {
        type: String,
        require: true
    },
    headImgName: {
        type: String,
        required: false
    },
    root: {
        type: Boolean,
        require: true
    }, pariseArticles: {   //点赞的文章
        type: Array<string>,
        require: true
    }, collectionArticles: {  //收藏的文章
        type: Array<string>,
        require: true
    }, mypush: {  //我的发布
        type: Array<string>,
        require: true
    }
})

export default Users