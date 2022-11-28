const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;


app.get('/api/create', (req, res) => {
  res.send('hello')

});



//conect db
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'company',
  port     : 3307,
});
connection.connect();
//simple query
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())
app.get('/try/product', async (req, res) => {

  
  

  const dataproduct = await query('SELECT * FROM product')
  res.send(dataproduct)

});

app.post('/api/insertproduct', async (req, res) => {

  var name = req.body.nama_product;
  var harga = req.body.harga_product;
  
  

  let insert = "INSERT INTO product (nama_product, harga_product) VALUES (?,?)";
  const dataproduct = await query(insert,[name,harga])
  res.send(dataproduct)

});
app.post('/api/detailproduct/:id', async (req, res) => {

  var id  = req.params.id;


  let detail = "SELECT * FROM product WHERE id = ?";
  const dataproduct = await query(detail,[id])
  res.send(dataproduct[0])
});
app.put('/api/updateproduct/:id', async (req, res) => {

  var id  = req.params.id;
  var name = req.body.nama_product;
  var harga = req.body.harga_product;

  let detail = "UPDATE product SET nama_product='"+name+"',harga_product='"+harga+"' WHERE id='"+id+"' ";
  const dataproduct = await query(detail,[name,harga])
  res.send("berhasil update")
});
app.delete('/api/deleteproduct/:id', async (req, res) => {

  var id  = req.params.id;


  let detail = "DELETE FROM product WHERE id = ?";
  const dataproduct = await query(detail,[id])
  res.send("berhasil")
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});







