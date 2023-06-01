import db from "../connection/db.js";

const topArticle = db.model("topArticles", {
    id: {
        type: Number,
        required: true
    },
    topArticleIdNum: {
        type: Number,
        required: true
    }
})

export default topArticle