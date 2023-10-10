//这里链接数据库
import mongoose from "mongoose";

//链接数据库
const dbArticle = mongoose.createConnection(
    'mongodb://127.0.0.1:27017/blog',
    err => {
        if (err) return console.log('文章数据库连接失败' + err);
        console.log('数据库链接成功');
    }
)


export default dbArticle
