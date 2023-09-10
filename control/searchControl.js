import Articles from "../model/articles.js"
import Users from "../model/users.js"

class searchControl {
    //搜索文章==========================================================================================
    async searchArticle(req, res) {
        const searchStr = req.query.str //要搜索的文本
        const resArticle = new Array; //符合条件的文章
        const articleRes = await Articles.find()
        articleRes.map(item => {
            if (item.title.includes(searchStr)) {
                resArticle.push(item)
            }
        })
        if (resArticle.length === 0) { //没有匹配到
            if (searchStr !== undefined) {
                //逐字匹配
                for (let i = 0; i < searchStr.length; i++) {
                    articleRes.map(item => {
                        if (item.title.includes(searchStr[i]) && !resArticle.includes(item)) {
                            resArticle.push(item)
                        }
                    })
                }
            }
        }
        res.send({
            status: 0,
            data:resArticle
        })
    }

    //搜索用户==========================================================================================
    async searchUser(req, res) {
        const searchStr = req.query.str //要搜索的文本
        const resUser = new Array; //符合条件的文章
        const UserRes = await Users.find()
        UserRes.map(item => {
            if (item.nickName.includes(searchStr)) {
                resUser.push(item)
            }
        })
        if (resUser.length === 0) { //没有匹配到
            if (searchStr !== undefined) {
                //逐字匹配
                for (let i = 0; i < searchStr.length; i++) {
                    UserRes.map(item => {
                        if (item.nickName.includes(searchStr[i]) && !resUser.includes(item)) {
                            resUser.push(item)
                        }
                    })
                }
            }
        }
        res.send({
            status: 0,
            data:resUser
        })
    }
}

export default new searchControl()