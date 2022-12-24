const Painting = require('../models/Painting');

const Paint_create_post = (req, res) => {

  const painting = new Painting(req.body);
  painting.save()
    .then(result => {
      res.status(201).send("painting added successfully");
    })
    .catch(err => {
      res.send(err);
    });
};

const paint_create_get = (req, res) => {
  res.status(201).send({ title: 'add new painting' });
}

const homepage = (req, res) => {
  Painting.find().sort({ createdAt: -1 })
    .then(result => {

      // res.render('index', { Painting: result, title: 'Homepage' });
      res
        .status(201)
        .send({ status: "ok", message: "homepage", result });
    })
    .catch(err => {
      console.log(err);
    });
};

const productpage = (req, res) => {
  const id = req.params.id;
  Painting.findById(id)
    .then(result => {
      // res.render('details', { Painting: result, title: 'Painting Details' });
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(500).send('process failed');
    });
}

const paint_delete = (req, res) => {
  const id = req.params.id;
  // const item_to_be_deleted = painting.findById(id);
  const item = Painting.findByIdAndDelete(id)
    .then(result => {
      if (item) {
        res.status(200).send('product deleted successfully .')
      }
      else {
        res.status(500).send('product delete failed .');
      }
    })
    .catch(err => { res.status(403).send(err) })
}

module.exports = {
  Paint_create_post,
  paint_create_get,
  productpage,
  paint_delete,
  homepage
}

