const mongoose = require('mongoose')
const supertest = require('supertest');
const app = require('../index.js')

require('dotenv').config();


beforeEach(async () =>{
    await mongoose.connect(process.env.MONGO_URI);
})

afterEach(async () => {
    await mongoose.connection.close();
})


//productroutes test /api/products
describe('testing product routes ', () =>{
    describe('GET /api/products', () => {
        it('should get all products', async () => {
            const res = await supertest(app).get('/api/products');

            expect(res.statusCode).toBe(200);
            // expect(res.headers['content-type']).toBe('application/json')
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body).toHaveProperty('products');
            expect(res.body).toHaveProperty('totalCount');
            // console.log(res.body)
            console.log(res.headers)
        })
    })

    const product = {
        productIdentifier : Math.floor(Math.random() * 1000000).toString(),
        name: '24k Gold Bracelet',
        category: 'Jwellery',
        image: '',
        rating: 5,
        price: 63000,
        description: "jwellery you've never seen before",
        isAvailable: true,
    }

    // {
    //     "productIdentifier": "8",
    //     "name": "Mini Stainless Steel Lunch Box",
    //     "category": "tiffin box",
    //     "image": "https://m.media-amazon.com/images/I/41mvImqNCtL._SX300_SY300_QL70_FMwebp_.jpg",
    //     "rating": 0,
    //     "price": 929,
    //     "description": "first product",
    //     "isAvailable": true
    //   }
    describe('POST /api/products/create', () =>{
        
        it('should create a product', async () => {
            const res = await supertest(app).post('/api/products/create').send(product);

            expect(res.statusCode).toBe(201);
            // expect(res.headers['content-type']).toBe('application/json')
            expect(res.body).toHaveProperty('_id');
            expect(res.body.productIdentifier).toBe(product.productIdentifier);
            
        })
        it('should a product exists returns 409', async () => {
            const res = await supertest(app).post('/api/products/create').send(product);
    
            expect(res.statusCode).toBe(409);
            // expect(res.headers['content-type']).toBe('application/json')
            expect(res.body.message).toBe("product already exists");

        })

    })
    
    describe('DELETE /api/products/delete/:productIdentifier', () => {
        it('should delete product by id', async() => {
            const res = await supertest(app).delete('/api/products/delete/'+ product.productIdentifier);
            expect(res.statusCode).toBe(201);
            // expect(res.body.productIdentifier).toBe(product.productIdentifier);
        })
    })
} )

