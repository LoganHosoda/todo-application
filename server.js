const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.DB_STRING;
const PORT = process.env.PORT;

let db, dbName = 'todo';

MongoClient.connect(uri)
  .then(client => {
    console.log(`connected to ${dbName} Database`);
    db = client.db(dbName);
  })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', async (req, res) => {
  const todoItems = await db.collection('todos').find().toArray();
  const itemsLeft = await db.collection('todos').countDocuments({ completed: false });
  res.render('index.ejs', { items: todoItems, left: itemsLeft });
})


app.post('/addTodo', async (req, res) => {
  await db.collection('todos').insertOne({ thing: req.body.todoItem, completed: false });
  console.log('Todo added');
  res.redirect('/');
});


app.put('/markComplete', async (req, res) => {
  await db.collection('todos').updateOne({thing: req.body.itemFromJs}, {
    $set: {
      completed: true
    }
  },{
      sort: {_id: -1},
      upsert: false
  })
  console.log('Marked complete');   
  res.json('Marked complete')
});


app.put('/markIncomplete', async (req, res) => {
  await db.collection('todos').updateOne({thing: req.body.itemFromJs}, {
    $set: {
      completed: false
    }
  },{
      sort: {_id: -1},
      upsert: false
  })
  console.log('Marked incomplete');   
  res.json('Marked incomplete')
});


app.delete('/deleteItem', async (req, res) => {
  const deleted = await db.collection('todos').deleteOne({ thing: req.body.itemFromJs})
  if (deleted.deletedCount === 0) return res.json('No item to delete');  
  console.log('Deleted item');
  res.json('Deleted Todo item');
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`)
});
