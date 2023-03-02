import db from "../connection/db.js";

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
    }, personalCover: {  //个人主页的封面
        type: String,
        require: false
    }, createDate: {  //创建时间
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
        type: Array,
        require: true
    }, collectionArticles: {  //收藏的文章
        type: Array,
        require: true
    }, mypush: {  //我的发布
        type: Array,
        require: true
    },
    sex: {  //性别
        type: String,
        require: false
    },
    eMail: {  //邮箱
        type: String,
        require: false
    },
    introduce: {  //个人签名
        type: String,
        require: false
    },
    personalWeb: {  //个人网站
        type: String,
        require: false
    },
    focus: {  //关注列表
        type: Array,
        require: false
    },
    fans: {  //我的粉丝
        type: Array,
        require: false
    }
})

export default Users