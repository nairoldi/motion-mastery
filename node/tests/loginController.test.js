const request = require('supertest');
const app = require('../server.js');
//const createAccount = require('../login/loginController');

userObject = {
    'email':'test@email.com',
    'pass':'testPass',
    'user': "testUsernam"    
}

// tesing test to figure out how super test works
describe('test /api', () => {
    describe('we should hit the endpoint',() => {
        test('should respond with a 200 status code', async () => {
            const response = await request(app).get('/api')
            expect(response.statusCode).toBe(200);
        })
    })
})

// signup test 
describe('POST /login/signup', () => {
    describe('given a username and password', () => {
        test('should respond with a 200 status code and created true', async() => {
            const response = await request(app).post('/login/signup').send(userObject).expect(200);
            expect(response.body).toEqual({created: true});
        })
    })
    describe('given a username that already exists', () => {
        test('should respond with 200 code and created false', async() => {
            const response = await request(app).post('/login/signup').send(userObject);
            expect(response.body).toEqual({"created": false, "message": "Email already exists! try logging in"});
        })
    })
    // another test for database connection
})