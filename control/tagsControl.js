import Tags from '../model/tags.js'

class tagsControl {
    //获取所有的标签
    async getAllTags(req, res) {
        const all = await Tags.find()
        res.send({
            status: 0,
            data: all
        })
    }
}

export default new tagsControl()