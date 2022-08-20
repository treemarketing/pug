const express = require('express');
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', './views');

let productsHC = [
  { id: 1, title: 'nike ball', price: 101, thumbnail: 'http://localhost:8080/public/nike-ball.jpg' },
  { id: 2, title: 'nike shoes', price: 102, thumbnail: 'http://localhost:8080/public/nike-shoes.jpg' },
  { id: 3, title: 'adidas shoes', price: 102, thumbnail: 'http://localhost:8080/public/adidas-shoes.jpg' },
];

app.get('/hello', (req, res) => {
  res.render('hello.pug', { msg: 'un msg del perrito' });
});

app.get('/products', (req, res) => {
  res.render('products.pug', { title: 'listado de productos', products: productsHC });
});




app.get('/products/:id', (req, res) => {
  let {id} = req.params;
  const productoEncontrado = productsHC.find(e => e.id == id)
  if (productoEncontrado){
    res.render('oneproduct.pug', { title: 'Un producto encontrado', productoEncontrado });
    
  }else{
    res.render('errorproduct.pug', { error: 'No pasa Naranja' });
  }
});

app.get('/form', (req, res) => {
  res.render('form.pug', { title: 'FORMULARIO PUG' });
});

app.post('/products', (req, res) => {
  const {body} = req;
  const lastId = productsHC[productsHC.length - 1];
  
  //agrego bien el body y agrego un id nuevo
  let nuevoId = lastId.id + 1;
  let insertBody = {id: nuevoId, title: body.name, price: body.price, thumbnail: body.thumbnail}
  productsHC.push(insertBody);
})
