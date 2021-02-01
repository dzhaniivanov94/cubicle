const { Router } = require('express');
const productService = require('../services/productService');
const { validateProduct } = require('./helpers/productHelper');


const router = Router();


router.get('/', (req, res) => {
    productService.getAll(req.query)
        .then(products => {
            console.log(products);
            res.render('home', { title: 'browse', products })
        })
        .catch(() => res.status(500).end())

});
router.get('/create', (req, res) => {
    res.render('create', { title: 'create' })
});

router.get('/details/:productId', async (req, res) => {
    let product = await productService.getOne(req.params.productId)
    console.log(product);
    res.render('details', { title: 'product details', product });

});

router.post('/create', validateProduct, (req, res) => {
    productService.create(req.body)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end())
});




module.exports = router;