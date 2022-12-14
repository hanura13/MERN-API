const {validationResult} = require('express-validator');
const BlogPost = require('../model/blog');

exports.createBlogPost = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const err = new Error('Invalid Value')
        err.errorStatus = 400;
        err.data=errors.array();
        throw err;
    }
    if(!req.file){
        const err = new Error('Image harus di upload')
        err.errorStatus = 422;
        err.data=errors.array();
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;
    

    const Posting = new BlogPost({
        title: title,
        body: body,
        image: image,
        author: {uid: 1 ,name: 'hanura'}
    })

    Posting.save()
    .then(result => {
        res.status(201).json({
            message: 'Create Blog Success',
            data: result
        });
    })
    .catch(err => {
        console.log('Error: ',err)
    });

 
}

exports.getAllBlogPost = (req, res, next) => {
    BlogPost.find()
    .then(result => {
        res.status(200).json({
            message: 'data Blogpost berhasil dipanggil',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.getBlogPostById= (req,res,next)=>{
    const postId = req.params.postId
    BlogPost.findById(postId)
    .then(result => {
        if(!result){
            const error = new Error('Blog Post tidak ditemukan');
            error.errorStatus = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Data BlogPOst berhasil dipanggil',
            data: result,
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.updateBlogPost = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const err = new Error('Invalid Value')
        err.errorStatus = 400;
        err.data=errors.array();
        throw err;
    }
    if(!req.file){
        const err = new Error('Image harus di upload')
        err.errorStatus = 422;
        err.data=errors.array();
        throw err;
    }

    const title = req.body.title;
    const image = req.file.path;
    const body = req.body.body;
    const postId = req.params.postId;

    BlogPost.findById(postId)
    .then(post => {
        if(!post){
            const err = new Error('Blogpost tidak ditemukan');
            err.errorStatus = 404;
            throw err;
        }
        post.title = title;
        post.body = body;
        post.image = image;

        return post.save();
    })
    .then(result => {
        res.status(200).json({
            message: 'Update suskses',
            data: result,
        })
    })
    .catch( err => {
        next(err)
    })
}