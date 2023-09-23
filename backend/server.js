require("dotenv").config();
const express=require('express');
const data =require('./data.js');
const cors=require('cors');
const app =express();
const userModel = require('./models/usermodel');
const path = require('path');
const contactModel = require('./models/contactmodel.js')
const { sendMail } = require("./nodemailer.js");
const mongoose = require('mongoose');
const orderRouter = express.Router();

const db_link='mongodb+srv://Sarfaraz:nOWlix9QbsZrhAEH@cluster0.jpler.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link).then(()=>
{
    console.log("connected to mongodb");
}).catch((error) =>
{
    console.log(error);
});

app.use(cors());
app.use(express.json());

app.use('/api',orderRouter);

orderRouter
.route('/products')
.get(productsData)

orderRouter
.route('/products/:id')
.get(productData)


orderRouter
.route('/orders')
.post(postOrders)

orderRouter
.route('/contact')
.post(postcontact)


async function postcontact(req,res){
    let obj = new contactModel({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
    });
   
    const contactdetail = await obj.save({ writeConcern: { w: "majority" , wtimeout: 5000 } });
    sendMail("contact",obj);
    res.json({
        message: "Conatct form recieved",
        data: contactdetail,
    })
}

function productsData(req,res){
    res.send(data.products);
}

function productData(req,res){
    const product =data.products.find((x) => x._id == req.params.id);
    if(product){
        res.send(product);
    }
    else{
    res.status(404).send({message: 'Product Not Found'});
    return;
    }
};

async function postOrders(req,res){
   const  orders = new userModel({
    orderItems: req.body.order.orderItems,
    shipping: req.body.order.shipping,
    payment: req.body.order.payment,
    itemsPrice: req.body.order.itemsPrice,
    totalPrice: req.body.order.totalPrice,
   });
   const createdOrder = await orders.save({ writeConcern: { w: "majority" , wtimeout: 5000 } });
   sendMail("order",createdOrder);
// const data = req.body;
console.log("data",orders);
console.log("data",createdOrder);
// console.log("orderItems",data.order.orderItems);
// console.log("shipping",data.shipping);
   res.status(201).send({
       message: "New order Created",
       order : createdOrder
   });
}

app.use(express.static(path.join(__dirname, '/../frontend')));
app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/ShopZilla.html'));
  });
const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`serve at http://localhost:${port}`);
});