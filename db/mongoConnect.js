const mongoose = require('mongoose');
// דואג שנוכל לקרוא משתנים מה ENV
require("dotenv").config();

main().catch(err => console.log(err));

async function main() {

   //await mongoose.connect('mongodb://127.0.0.1:27017/toyse');

   await mongoose.connect('mongodb+srv://toys:toysmike@cluster0.okvfu3l.mongodb.net/shoptoy');


   
 // await mongoose.connect(process.env.DB_CONNECT);
 
  console.log("mongo atlas connect");
}