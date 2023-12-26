// const mongoose = require('mongoose')
// const supertest = require('supertest');
// const app = require('../index.js')

// require('dotenv').config();


// beforeEach(async () =>{
//     await mongoose.connect(process.env.MONGO_URI);
// })

// afterEach(async () => {
//     await mongoose.connection.close();
// })


// //userroutes test
// describe('testing users ', () =>{
//     describe('GET /api/user/all/users', () => {
//         it('should get all users', async () => {
//             const res = await supertest(app).get('/api/user/all/users');

//             expect(res.statusCode).toBe(200);
//             // expect(res.headers['content-type']).toBe('application/json')
//             expect(res.body).toBeInstanceOf(Array);
//             console.log(res.body)
//             console.log(res.headers)
//         })
//     })

//     const user = {
//         name : 'john',
//         username: 'john12',
//         email: 'john12@gmail.com',
//         mobile : '12345',
//         password: '123456'
//     }
//     describe('POST /api/user/register', () =>{
        
//         it('should create a user', async () => {
//             const res = await supertest(app).post('/api/user/register').send(user);

//             expect(res.statusCode).toBe(201);
//             // expect(res.headers['content-type']).toBe('application/json')
//             expect(res.body).toHaveProperty('_id');
//             expect(res.body.username).toBe(user.username);
            
//         })
//         it('should a user exists returns 409', async () => {
//             const res = await supertest(app).post('/api/user/register').send(user);
    
//             expect(res.statusCode).toBe(409);
//             // expect(res.headers['content-type']).toBe('application/json')
//             expect(res.body.message).toBe("username already exists");
//         });
//     });
    
//     describe('DELETE /api/user/delete/:username', () => {
//         it('should delete user by username', async() => {
//             const res = await  supertest(app).delete('/api/user/delete/'+ user.username);
//             expect(res.statusCode).toBe(201);
//             expect(res.body.username).toBe(user.username);
//         })
//     });
// } )

