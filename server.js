var express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session =  require ('express-session')
app.use(session({
    secret: 'azeazeazeaze',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(require('./middlewares/flash'))

//moteur
app.set('view engine', 'ejs')
//nos middleware
app.use('/assets', express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// GET method route
app.get('/', (request, response) => {

    let Message=require('./models/message')
    Message.all(function(messages){
        response.render('pages/index',{messages:messages})
    })
})
//Post method route
app.post('/', function (req, res) {
if(req.body.message ===undefined || req.body.message === ''){
    req.flash('error',"Vous n'avez posté de message")
    res.redirect('/')

}else{
    let Message=require('./models/message')
    Message.create(req.body.message,function(){
    req.flash('success',"Merci!")
    res.redirect('/')
})
}

})
app.get('/message/:id',(req,res)=>{
let Message=require('./models/message')
Message.find(req.params.id,(message)=>{
    res.render('/messages/show',{message:message})
})
})
app.listen(8080)