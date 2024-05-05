import Post from "../models/post.model.js"
const create= async( req, res, next)=> {
if(!req.user.isAdmin){
    return res.status(403).json({
        message: "You are not allowed to create a post"
    })
}

if(!req.body.title || !req.body.content ){
    return res.status(400).json({
        message: "Please fill all the fields"
    })
}

try{
    const slug = req.body.title.replace(/[^\w\s]+/gi, '-').replace(/\s+/g, '-').replace(/-+/g, '-').toLowerCase();


const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    slug: slug,
    image: req.body.image,
    userId: req.user.id,
    category: req.body.category
})

const savedPost =await newPost.save();

res.status(201).json(savedPost)
}
catch(err){
   next(err);
}

    
}






export {create}