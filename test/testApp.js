const request = require('supertest');
const { createApp } = require('../src/app.js');

const appConfig = {
  root: 'public'
};

const users = {
  'pk': {
    username: 'pk',
    password: '123'
  }
};

describe('GET /badRequest', () => {
  it('Should serve 404 on /badRequest', (done) => {
    const app = createApp(appConfig, users);
    request(app)
      .get('/bad-request')
      .expect(404, done);
  });
});

describe('GET /', () => {
  it('Should serve the landing page on /', (done) => {
    const app = createApp(appConfig, users);
    request(app)
      .get('/')
      .expect('content-type', /html/)
      .expect(200, done)
  });
});

describe('GET /signup.html', () => {
  it('Should serve signUp page on GET /signup.html', (done) => {
    const app = createApp(appConfig, users);
    request(app)
      .get('/signup.html')
      .expect('content-type', /html/)
      .expect(200, done);
  });
});

describe('GET /login.html', () => {
  it('Should serve loginpage on GET /login.html', (done) => {
    const app = createApp(appConfig, users);
    request(app)
      .get('/login.html')
      .expect('content-type', /html/)
      .expect(200, done)
  });
});

describe('POST /login', () => {
  it('Should give 201 if credentials are valid', (done) => {
    const app = createApp(appConfig, users);
    request(app)
      .post('/login')
      .send('username=pk&password=123')
      .expect(201, done)
  });

  it('Should give 401 if credentials are not valid', (done) => {
    const app = createApp(appConfig, users);
    request(app)
      .post('/login')
      .send('username=unknown&password=123')
      .expect(401, done);
  });
});