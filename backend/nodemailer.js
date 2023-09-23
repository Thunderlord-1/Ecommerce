
const nodemailer = require("nodemailer");
const userModel = require('./models/usermodel.js');
const contactModel = require('./models/contactmodel');
// async..await is not allowed in global scope, must use a wrapper

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

 module.exports.sendMail = async function sendMail(str,data){
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,//smtp protocol port
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'mohdsarfarazkhan870@gmail.com', // generated ethereal user
      pass: "txibehfvzdwbhxog", // generated ethereal password
    },
  });
var Osubject,Otext,Ohtml;
if(str=="order")
{
    Osubject = `Thanks for purchasing,Your order is successfully recieved we will contact you soon for the payment😊`;
                let name='',qty='';
                let arr=data.orderItems;
                for(i=0;i<arr.length;i++)
                {
                    name += arr[i].name + ",";
                    qty  += arr[i].qty + ",";
                }
    Ohtml = `
            <h1>Welcome to ShopZilla 🛍️</h1>
            Hope you have good time !<br>
            Here are your details-<br>
            order-details -> <br> name of products purchased- ${name}<br>
                              respective quantity of products purchased- ${qty}<br>
    <br>    shipping-details -> <br> ${data.shipping}<br>
            <br> ${data.payment} <br>
            Total-price ->  <br> $${data.totalPrice}<br>
    `
    let info = await transporter.sendMail({
      from: '"ShopZilla 🛍️" <mohdsarfarazkhan870@gmail.com>', // sender address
      to: data.shipping.email , // list of receivers
      subject: Osubject, // Subject line
      // text: Otext, // plain text body
      html: Ohtml, // html body
    });
    let user = await userModel.findOneAndDelete({data},{ writeConcern: { w: "majority" , wtimeout: 5000 } });
    console.log("Message sent: %s", info.messageId);
}
if(str=="contact")
{
  Osubject =`Your contact form is recieved`;
  Ohtml = `
            <h1>Your contact form is recieved</h1><br>
              We will answer your query soon,${data.name}.<br>
              Your Subject -> ${data.subject} <br>
              Your message ->${data.message}   
            `
            let info = await transporter.sendMail({
              from: '"ShopZilla 🛍️" <mohdsarfarazkhan870@gmail.com>', // sender address
              to:  data.email, // list of receivers
              subject: Osubject, // Subject line
              // text: Otext, // plain text body
              html: Ohtml, // html body
            });
            
            console.log("Message sent: %s", info.messageId);
}
  // send mail with defined transport object
 

 
 
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}


