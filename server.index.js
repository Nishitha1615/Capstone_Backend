const express=require('express');
const env = require('dotenv');
const app = express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const path=require('path');
const cors = require('cors')

//impport routes
const routeUser=require('./src/Routes/Auth')
const adminroute=require('./src/Routes/admin/Auth')
const categoryRoutes=require('./src/Routes/category')
const productRoutes=require('./src/Routes/product')
const cartRoutes=require('./src/Routes/AddCart')

// const PORT=5000;

// app.use(bodyParser.json());
// app.use(
//     express.urlencoded({ extended: true })
// );
    
app.use(express.json());
const setconsole=app.use(express.static(__dirname + '/public'))
// const setconsole=app.use(express.static(__dirname));
console.log("dir:",setconsole);
env.config();

// app.use(express.json());

// db connection

const connectdb=async()=>
{
    mongoose.connect(`mongodb+srv://abimeeraperumal10:OHEtGBIYWmjBw9ZI@nishitha.8jv94cv.mongodb.net/orders`)
    console.log("connected")
}
// mongoose.connect(`mongodb+srv://nishitha:umW6fbFWfIgEvUTn@cluster0.602gwxp.mongodb.net/test`,{ useNewUrlParser: true, useUnifiedTopology: true}).then(()=>
// {
//     console.log('Database connected successfully')
// })

connectdb();

// middleware
app.use(cors());
app.use('/backendAPI',routeUser);
app.use('/backendAPI',adminroute);
app.use('/backendAPI',categoryRoutes);
app.use('/backendAPI',productRoutes);
app.use('/backendAPI',cartRoutes);



app.get('/',(req,res,next)=>
{
    res.status(200).json({
        message:"hello i am from the server"
    })
})

// app.use('/backendAPI',routeUser);

//this wll return an empty object because we are nor passing our input. we are sending some data from the api as a payload

app.post('/postdata',(req,res,next)=>
{
    res.status(200).json({
        message:req.body
    })
})



app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
})




