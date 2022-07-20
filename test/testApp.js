const request = require('supertest');
const { createApp } = require('../src/app.js');
require('dotenv').config();

const appConfig = {
  root: 'public',
  templates: {
    login: 'login page',
    loginWithError: 'invalid login page',
    homePage: 'home page'
  }
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

describe('GET /login', () => {
  it('Should serve loginpage on GET /login', (done) => {
    const app = createApp(appConfig, users);
    request(app)
      .get('/login')
      .expect('login page')
      .expect(200, done)
  });

  it('Should give invalid error page on GET /login?invalid=true', (done) => {
    const app = createApp(appConfig, users);
    request(app)
      .get('/login?invalid=true')
      .expect('invalid login page')
      .expect(200, done);
  });
});

describe('POST /login', () => {
  it('Should give 201 if credentials are valid', (done) => {
    const app = createApp(appConfig, users);
    request(app)
      .post('/login')
      .send('username=pk&password=123')
      .expect('location', '/todo/home')
      .expect(302, done)
  });

  it('Should give 401 if credentials are not valid', (done) => {
    const app = createApp(appConfig, users);
    request(app)
      .post('/login')
      .send('username=unknown&password=123')
      .expect('location', '/login?invalid=true')
      .expect(302, done);
  });
});

describe('GET /todo/home', () => {
  it('Should serve home page on GET /todo/home', (done) => {
    const app = createApp(appConfig, users);

    request(app)
      .post('/login')
      .send('username=pk&password=123')
      .expect('location', '/todo/home')
      .expect(302)
      .end((err, res) => {
        request(app)
          .get('/todo/home')
          .set('Cookie', res.header['set-cookie'])
          .expect('content-type', /html/)
          .expect(200, done);
      });
  });
});
