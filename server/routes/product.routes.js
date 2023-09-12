const ProductController = require('../controllers/product.controller');

module.exports = (app) => {
    // GET Requests
    app.get(   '/api/products',     ProductController.getAll);
    app.get(   '/api/products/:id', ProductController.getOne);
    // POST Requests
    app.post(  '/api/products',     ProductController.createOne);
    // PATCH Requests
    app.patch( '/api/products/:id', ProductController.updateOne);
    // DELETE Requests
    app.delete('/api/products/:id', ProductController.deleteOne);
}
