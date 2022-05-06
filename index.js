var express = require("express");
var app = express();
var path = require("path");
const session = require('express-session');
app.use(session({secret:'likhitha'}));


app.use(express.json());

app.use(express.urlencoded({extended:false}));


app.use(express.static(path.join(__dirname, 'public')));
// Mongodb Database Connection

const mongoose = require("mongoose");
const urlencoded = require("body-parser/lib/types/urlencoded");
mongoose.connect("mongodb+srv://Likhitha:Likhi1802@cluster0.jx5im.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useUnifiedTopology : true,
    useNewUrlParser : true,
}).then(() => {
    console.log("Successfully Connected To MongoDB Database.");
}).catch((e) => {
    console.log("Not Connected To MongoDB Database.");
})
var monk = require('monk');
var dbs = monk('mongodb+srv://veeru:12345@cluster0.9sppz.mongodb.net/myFirstCapstoneProject?retryWrites=true&w=majority')
var collection = dbs.collection('Products')

const connection = mongoose.connection;
const signupData = require('./models/schema.js');
const loginData = require('./models/login_schema.js');

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/winkel/index.html");
});
app.get('/faq',(req,res)=>{
    res.sendFile(__dirname+"/winkel/faqs.html");
});

app.get("/cart", (req,res) => {
    res.sendFile(__dirname + "/winkel/cart.html");
});
app.get("/checkout", function(req,res){
    console.log(req.session)
    if(req.session.visited == false || req.session.visited == undefined)
    {
        res.sendFile(__dirname+'/winkel/login.html');
    }
    else
    {
        res.sendFile(__dirname+'/winkel/checkout.html');
    }    
});
app.get("/shop", (req,res) => {
    res.sendFile(__dirname + "/winkel/shop.html");
});
app.get("/detail", (req,res) => {
    res.sendFile(__dirname + "/winkel/detail.html");
});
app.get("/contact", (req,res) => {
    res.sendFile(__dirname + "/winkel/contact.html");
});
app.get("/electronics", (req,res) => {
    res.sendFile(__dirname + "/winkel/electronics.html");
});
app.get("/jewellery", (req,res) => {
    res.sendFile(__dirname + "/winkel/jewellery.html");
});
app.get("/men", (req,res) => {
    res.sendFile(__dirname + "/winkel/men-fashion.html");
});
app.get("/women", (req,res) => {
    res.sendFile(__dirname + "/winkel/women-fashion.html");
});
app.get("/kids", (req,res) => {
    res.sendFile(__dirname + "/winkel/kids-fashion.html");
});
app.get("/sports", (req,res) => {
    res.sendFile(__dirname + "/winkel/sports.html");
});
app.get("/furniture", (req,res) => {
    res.sendFile(__dirname + "/winkel/furniture.html");
});

   // mensdress 
   app.get('/mensdress',(req,res)=>{
    collection.find({sub_category_name:"men's dresses"},function(err,docs){
            if(err || docs==null)
            {
                
                console.log(err)
            }
            else if(docs!=undefined)
            {
                
                
                res.send(docs);
            }
        })
    });

app.get('/womensdress',(req,res)=>{
    collection.find({sub_category_name:"women's dresses"},function(err,docs){
            if(err || docs==null)
                {
                    
                    console.log(err)
                }
            else if(docs!=undefined)
                {
                    res.send(docs);
                }
            })
});
        
app.get('/babysdress',(req,res)=>{
collection.find({sub_category_name:"baby's dresses"},function(err,docs){
    if(err || docs==null)
        {
            
            console.log(err)
        }
    else if(docs!=undefined)
        {
            res.send(docs);
        }
    })
});

app.get('/electronicsData',(req,res)=>{
collection.find({sub_category_name:"electronics"},function(err,docs){
        if(err || docs==null)
        {
            
            console.log(err)
        }
        else if(docs!=undefined)
        {
            
            
            res.send(docs);
        }
    })
});                    

app.get('/getallsportsdata',(req,res)=>{
collection.find({sub_category_name:"sports"},function(err,docs){
    if(err || docs==null)
        {
            
            console.log(err)
        }
    else if(docs!=undefined)
        {
            res.send(docs);
        }
    })
});

app.get('/getjewellerydata',(req,res)=>{
    collection.find({sub_category_name:"jewellery"},function(err,docs){
        if(err || docs==null)
            {
                
                console.log(err)
            }
        else if(docs!=undefined)
            {
                res.send(docs);
            }
    })
});

app.get('/getfurnituredata',(req,res)=>{
    collection.find({sub_category_name:"furniture"},function(err,docs){
        if(err || docs==null)
            {
                
                console.log(err)
            }
        else if(docs!=undefined)
            {
                res.send(docs);
            }
    })
});
        

app.get("/login", (req,res) => {
    res.sendFile(__dirname + "/winkel/login.html");
});
app.get("/signup", (req,res) => {
    res.sendFile(__dirname + "/winkel/signup.html");
});


app.post('/sendData', function(req,res){   
    console.log(req.body);
    var obj = new signupData({
        UserName:req.body.name,
        MobileNumber:req.body.mobile,
        Email:req.body.email,
        Password:req.body.password
    })
    signupData.findOne({Email: req.body.email}, function(err,docs){
        if(err || docs==null){
            obj.save(function(err, results) {
                if(results){
                   console.log("results"+ results);
                    res.send(results);
                }else{
                    console.log(err)
                    res.send(err);
                }
            })
        } 
        else{
            res.sendStatus(500);
        }
    })
   
});
app.post('/logindata', function(req,res){
    //res.sendFile(__dirname + '/template/signup.html');
    console.log(req.body);
    
    signupData.findOne({Email : req.body.email,Password:req.body.password}, function(err,docs){
        if(err || docs==null){
            //console.log(err)
            res.sendStatus(500)
        } 
        else{
            req.session.visited = true;
            res.send(docs);
        }
    })
   
});





app.get('/getRegisterationData',(req,res)=>{
RegisterationData.find(function(err,result){
        if(err || result==null)
        {
            
            console.log(err)
        }
        else if(result!=undefined)
        {
            
            console.log(result)
            res.send(result);
        }
    })
});


app.get('/login',function(req,res){
    res.sendFile(__dirname + "/template/login.html");
});



app.get('/signup',function(req,res){
    res.sendFile(__dirname + "/template/signup.html");
});
app.get('/adminlogin',function(req,res){
    res.sendFile(__dirname + "/template/admin_login.html");
});


app.get("/getproduct/:id", function(req,res){
    console.log(req.body.id)
})



app.post('/getproductdata', function(req,res){
    console.log(req.body)
    collection.find({'_id':req.body.itemid}, function(err,docs){
        if(err){
            res.send(err)
        }
        else{
            console.log(docs)
            res.send(docs)
        }
    })
})




app.listen(4000, ()=> console.log("Successfully Server Started"));