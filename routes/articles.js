const express = require("express")
const articleModel = require("../model/model")
const router = express.Router()

router.get(`/edit/:id`,async (req,res)=>{
    const article = await articleModel.findById(req.params.id)
    res.render(`articles/edit`,{article:article})
})
router.get('/new', (req,res)=>{
    res.render("articles/new",{article: new articleModel()})
})
router.get('/:id', async (req,res)=>{
    const article = await articleModel.findById(req.params.id)
    if(article == null) res.redirect('/')
    res.render("articles/show",{article:article})

})


// Routes For Saving,Updating,deleting The Article 


router.post('/',async (req,res,next)=>{
    req.article = new articleModel()
    next()
    
},saveArticleAndRedirect("new"))





router.put('/:id',async (req,res,next)=>{
    req.article = await articleModel.findById(req.params.id)
    next()
},saveArticleAndRedirect("edit"))


router.delete('/:id',async (req,res)=>{
    await articleModel.findByIdAndDelete(req.params.id)
    res.redirect("/")
})

function saveArticleAndRedirect(path){
        return async (req,res)=>{
            let article = req.article
            article.title = req.body.title
            article.desc = req.body.desc
            article.markdown = req.body.markdown
            try{
                article  = await article.save()
                res.redirect(`/articles/${article.id}`)  
            }
            catch(err){
                res.render(`articles/${path}`,{article:article})
            }
        }
        
}



module.exports = router