const router = require('express').Router();

const Book = require('../models/book');

const mongoose = require('mongoose');

router.get('/books', async (request, response) => {
  try{
    const book = await Book.find({});
    response.send({ book });
  }
  catch (error){
    response.status(400).send({ error });
  }
});

router.post('/books', async (request, response) => {
  try{
    const { title, author, release_year, category } = request.body;
    const book = await Book.create(request.body, (error, result) => {
      if (error)
        return response.status(400).send({ error: error.message });
      
      response.send({ result });
    });
  }
  catch (error){
    response.status(400).send({ error });
  }
});


router.get('/books/:id', async(request, response) => {
  try{
    const id = mongoose.mongo.ObjectId(request.params.id);

    const book = await Book.find({ _id: id}, (error, result) => {
      if(error)
        return response.status(400).send({ error: error.message});

      response.send({ result });
    });
  }
  catch (error){
    response.status(400).send({ error });
  }
});

router.put('/books/:id', async (request, response) => {
  try{
    const id = mongoose.mongo.ObjectId(request.params.id);
    await Book.update({ _id: id }, request.body, (error, result) => {
      if(error)
            return response.status(400).send({ error: error.message});

          response.send({ result });
    });
  }
  catch (error){
    response.status(400).send({ error });
  }
});

router.delete('/books/:id', async (request, response) =>{
  try{
    const id = mongoose.mongo.ObjectId(request.params.id);

    Book.remove({_id : id}, error => {
      if(error)
        return response.status(400).send({ error: error.message});

      response.send({ msg: 'Book successfuly removed! '});

    });
  }
  catch (error){
    response.status(400).send({ error });
  }

});

module.exports = app => app.use('/api', router);
