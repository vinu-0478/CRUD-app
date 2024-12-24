const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const app = express()

app.use(express.json());
app.listen(8080,()=>{console.log("server is running on port 8080")});
app.get("/", (req,res)=>
    {res.send("hellooooooooo vinutha")});

app.get('/api/products',async (req,res) =>
{
  try{

    const products = await Product.find({});
    res.status(200).json(products);
  }catch(error)
  {
         res.status(500).json({message:error.message});
  }
});

app.get('/api/product/:id',async (req,res) =>
{
  try{
       const {id} = req.params;
       const product = await Product.findById(id);
       res.status(200).json(product);
  }catch(error)
  {
      res.status(500).json({message:error.message});
  }
});
//update

app.put('/api/product/:id', async(req,res) =>{
  try{
    const {id} = req.params;
  const product=  await Product.findByIdAndUpdate(id,req.body);
  if(!product)
  {
    return res.status(404).json({message:"product not found"});
  }
  const updatedProduct = await Product.findById(id);
  } catch(error)
  {
    res.status(500).json({message:error.message});
  }

});
//delete
app.delete('/api/product/:id', async (req,res) =>
{
  try{
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product)
    {
      return res.status(404).json({message : "Product not found"});
    }
    res.status(200).json({message:"product deleted successfully"});

  }catch(error)
  {
    res.status(500).json({message:error.message});
  }
  }
);

app.post('/api/products', async (req,res)=> {
 try{
      console.log(req.body);
      const product = await Product.create(req.body);
      res.status(200).json(product);
 } catch(error)
 {
  res.status(500).json({message:error.message});
 }
});

mongoose.connect('mongodb://localhost:27017/')
  .then(() => {console.log("Connected!")
    })
  .catch(() => { console.log("Connection failed")})