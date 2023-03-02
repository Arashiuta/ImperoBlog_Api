import express from "express";
import articleControl from "../control/articleControl.js";

const apiRouter = express.Router()

//上传封面调用这个
apiRouter.post('/uploadarticlecover', articleControl.uploadArticleCover);

//MD文档上传图片调用这个
apiRouter.post('/uploadmdimg', articleControl.uploadMdImg)


export default apiRouter