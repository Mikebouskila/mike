const express = require("express");
const { ToysModel, validateToys } = require("../models/toyModel");
const router = express.Router();


// -> localhost:3001/toys?page=3&parPeg=12&sort=price
router.get("/", async(req,res) => {
  const reverse = req.query.reverse == "yes" ? 1 : -1;

    const parPeg = req.query.parPeg ? Math.min(req.query.parPeg) : 10;
    const page = req.query.page ? req.query.page -1 : 0;
    const sort = req.query.sort || "_id";
    

    try{
      let data = await ToysModel
      .find({})
      .limit(parPeg)
      .skip(page*parPeg)
      .sort({ [sort]: reverse })



      res.json(data);
    }
    catch(err){
      console.log(err);
      res.status(502).json({err})
    }
  })

  // -> localhost:3001/toys/search?s=
  router.get("/search", async(req,res) => {
    try{
      const s = req.query.s;
      const regExp = new RegExp(s,"i");
      const data = await ToysModel.find({$or:[
        {name:regExp},
        {info:regExp},
        {category:regExp}
      ]});
      res.json(data);
    }
    catch(err){
      console.log(err);
      res.status(502).json({err})
    }
  })


router.get("/single/:id", async(req,res) => {
    try{
      const id = req.params.id
      let data = await ToysModel.findOne({_id:id});
      res.json(data);
    }
    catch(err){
      console.log(err);
      res.status(502).json({err})
    }
  })


// הכל בראוט אחד של get!

router.post("/", async(req,res) => {
    let validBody = validateToys(req.body);
    if(validBody.error) {
      return res.status(400).json(validBody.error.details);
    }
    try {
      const toy = new ToysModel(req.body);
      await toy.save();
      res.json(toy)
    }
    catch(err) {
      if(err.code == 11000){
        return res.status(400).json({err:"Toys_url already in system",code:11000})
      }
      console.log(err);
      res.status(502).json( {err})
    }
  })


router.put("/:id", async(req,res) => {
    let validBody = validateToys(req.body);
    if(validBody.error) {
      return res.status(400).json(validBody.error.details);
    }
    try {
     const id = req.params.id;
     const data = await ToysModel.updateOne({_id:id},req.body);
    res.json(data)
    }
    catch(err) {
      console.log(err);
      res.status(502).json( {err})
    }
  })


router.delete("/:id", async(req,res) => {
    try {
      const id = req.params.id;
      const data = await ToysModel.deleteOne({_id:id} );
      res.json(data)
    }
    catch(err) {
      console.log(err);
      res.status(502).json( {err})
    }
  })

  
  module.exports = router;