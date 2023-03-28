//这里链接数据库
import mongoose from "mongoose";

//链接数据库
const dbArticle = mongoose.createConnection(
    'mongodb://127.0.0.1:27017/blog',
<<<<<<< HEAD
    // 'mongodb://root:admin123@101.43.176.92:27017/?directConnection=true&authMechanism=DEFAULT&authSource=admin',
=======
>>>>>>> 5ebb24f734ef352a7f908ef39d75c436db5a1e96
    err => {
        if (err) {
            return console.log('文章数据库连接失败' + err);

        }
        console.log('数据库链接成功');
    }
)


export default dbArticle
