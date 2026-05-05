const express = require('express')
const postRoute = express.Router()
const controller = require('../controllers/post.controller')

// multer is a middleware , we use for read file form a forntend , by defualt express can't
// read the form-data formt file so we use multer 
const multer = require('multer')
/**
 * @path /api/post/create-post
 * @description creating post 
 */

const upload = multer({storage : multer.memoryStorage()})
postRoute.post('/create-post',upload.single('image') , controller.createPostController)


postRoute.get('/get-posts' , controller.getPostController)

module.exports = postRoute