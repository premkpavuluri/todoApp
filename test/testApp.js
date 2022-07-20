const request = require('supertest');
const { createApp } = require('../src/app.js');
// require('dotenv').config();

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

const todos = {
  'pk': {
    username: 'pk',
    lists: [{ id: 1 }]
  }
}

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

  it('Should serve the home page if already logged in', (done) => {
    const app = createApp(appConfig, users);
    request(app)
      .post('/login')
      .send('username=pk&password=123')
      .expect('location', '/todo/home')
      .expect(302)
      .end((err, res) => {
        request(app)
          .get('/login')
          .set('Cookie', res.header['set-cookie'])
          .expect('location', '/todo/home')
          .expect(302, done);
      });
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

describe('GET /logout', () => {
  it('Should delete the session and redirect to /login', (done) => {
    const app = createApp(appConfig, users);

    request(app)
      .get('/logout')
      .expect('location', '/login')
      .expect(302, done);
  });
});

describe('GET /todo/home --Router', () => {
  let cookies;
  let app;

  beforeEach((done) => {
    app = createApp(appConfig, users);
    request(app)
      .post('/login')
      .send('username=pk&password=123')
      .expect('location', '/todo/home')
      .expect(302)
      .end((err, res) => {
        cookies = res.header['set-cookie'];
        done();
      });
  });

  it('Should serve home page on GET /todo/home', (done) => {
    request(app)
      .get('/todo/home')
      .set('Cookie', cookies)
      .expect('content-type', /html/)
      .expect(200, done);
  });
});

describe('GET /todo/lists', () => {
  let cookies;
  let app;

  beforeEach((done) => {
    app = createApp(appConfig, users, todos);
    request(app)
      .post('/login')
      .send('username=pk&password=123')
      .expect('location', '/todo/home')
      .expect(302)
      .end((err, res) => {
        cookies = res.header['set-cookie'];
        done();
      });
  });

  it('Should serve the lists of user on GET /todo/lists', (done) => {
    request(app)
      .get('/todo/lists')
      .set('Cookie', cookies)
      .expect('content-type', /json/)
      .expect(todos['pk'].lists)
      .expect(200, done);
  });
});

describe('POST /todo/add-list', () => {
  let cookies;
  let app;

  beforeEach((done) => {
    app = createApp(appConfig, users, todos);
    request(app)
      .post('/login')
      .send('username=pk&password=123')
      .expect('location', '/todo/home')
      .expect(302)
      .end((err, res) => {
        cookies = res.header['set-cookie'];
        done();
      });
  });

  it('Should add the list to database', (done) => {
    request(app)
      .post('/todo/add-list')
      .send("title=hi")
      .set('Cookie', cookies)
      .expect(201, done)
  });
});

describe('POST /todo/delete-list', () => {
  let cookies;
  let app;

  beforeEach((done) => {
    app = createApp(appConfig, users, todos);
    request(app)
      .post('/login')
      .send('username=pk&password=123')
      .expect('location', '/todo/home')
      .expect(302)
      .end((err, res) => {
        cookies = res.header['set-cookie'];
        done();
      });
  });

  it('Should delete the list in database', (done) => {
    request(app)
      .post('/todo/delete-list?id=1')
      .set('Cookie', cookies)
      .expect(201, done)
  });
});
