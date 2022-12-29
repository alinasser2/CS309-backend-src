const Painting = require('../models/Painting');
const User = require('../models/User');
const cookieParser = require('cookie-parser');

//add painting with post request
const Paint_create_post = (req, res) => {

  const painting = new Painting(req.body);
  painting.save()
    .then(result => {
      res.status(200).send("painting added successfully");
    })
    .catch(err => {
      res.send(err);
    });
};

const paint_create_get = (req, res) => {
  res.status(200).send({ title: 'add new painting' });
}

//homepage
const homepage = (req, res) => {
  Painting.find().sort({ createdAt: -1 })
    .then(result => {

     
      res
        .status(200)
        .send({ status: "ok", message: "homepage", result });
    })
    .catch(err => {
      // console.log(err);
      res.status(200).send(err)
    });
};

//getting the page of a product with get request containing the product_id
const productpage = (req, res) => {
  const id = req.params.id;
  Painting.findById(id)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(200).send('process failed');
    });
}

//delete painting with delete request containing product_id
const paint_delete = (req, res) => {
  const id = req.params.id;
  const item = Painting.findByIdAndDelete(id)
    .then(result => {
      if (item) {
        res.status(200).send('product deleted successfully .')
      }
      else {
        res.status(200).send('product delete failed .');
      }
    })
    .catch(err => { res.status(200).send(err) })
}


const paint_update = async (req, res) => {
  try {
    const updatedPaint= await Painting.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send({ status: "ok", user: updatedPaint });
  } catch (error) {
    const err = error.message;
    res.status(200).send({ status: "error", message: err });
  }
};

const paint_search = async (req, res) => {
  try {
    const paint_title =  req.body.title
    const ress = paint_title.trim();
    const findPaint= await Painting.find({title:ress});
    if(findPaint.length != 0 )
      res.status(200).send({ status: "ok", paint: findPaint });
    else
      res.status(200).send({ status: "ok", message: "Paint Not Found!!" });
  } catch (error) {
    const err = error.message;
    res.status(200).send({ status: "error", message: err });
  }
};


//method takes product_id with get to show all comments related to this product
const get_reviews = async (req,res) => 
  {
    
    try {
    const product = await Painting.findById(req.params.id);
    const Clients_reviews = product.reviews;
    res.status(200).send(Clients_reviews);
    }  
    catch (error)
    {
      const err = error.message
      res.status(200).send({ status: "error", message: err })
    }
    
  }

  //method takes product_id with get and comment ,rating with with post request
  const add_Review = async (req,res) => 
  {
  try{
    //getting the product before any updates
    const old = await Painting.findById(req.params.id);
    //getting the product's reviews in a variable
    const arr = old.reviews;
    //getting user's data
    const user_id = req.cookies.access_token.id;
    const user = User.findById(user_id);
    //adding the new review to the reviews array
    arr.push({name : user.username , comment : req.body.comment , rating : req.body.rating});
    //updating the product with the new array of reviews
    const updated = await Painting.findByIdAndUpdate(req.params.id,{reviews: arr});
    res.status(200).send("review added successfully");
  }
  catch (err) 
  {
    
    res.status(200).send(err);
  }
  }

  //exporting all methods
module.exports = {
  Paint_create_post,
  paint_create_get,
  productpage,
  paint_delete,
  homepage,
  paint_update,
  paint_search,
  add_Review,
  get_reviews
}

