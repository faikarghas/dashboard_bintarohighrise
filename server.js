const express       = require('express');
const next          = require('next');
const compression   = require('compression')
const cookieParser = require('cookie-parser');

require('dotenv').config()
const port      = process.env.PORT || 3014;
const dev       = process.env.NODE_ENV !== 'production';
const app       = next({dev});
const handle    = app.getRequestHandler();


const sitemapOptions = {
    root: __dirname + '/public/',
    headers: {
        'Content-Type': 'text/xml;charset=UTF-8'
    }
};

const robotsOptions = {
    root: __dirname + '/public/',
    headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
    }
};


app.prepare()
.then(()=>{
    const server = express()
    server.use(compression());
    server.use(cookieParser());


    server.get('/sitemap.xml', (req, res) => res.status(200).sendFile('sitemap.xml', sitemapOptions));
    server.get('/robots.txt', (req, res) => res.status(200).sendFile('robots.txt', robotsOptions));

    server.get('/', (req, res) => {
        if(!req.cookies.token) {
          res.redirect('/login');
        } else {
          return app.render(req, res, '/', req.query);
        }
    });

    server.get('/leads', (req, res) => {
        if(!req.cookies.token) {
          res.redirect('/login');
        } else {
          return app.render(req, res, '/leads', req.query);
        }
    });

    server.get('/login', (req, res) => {
        if(req.cookies.token) {
          res.redirect('/');
        } else {
          return app.render(req, res, '/login', req.query);
        }
    });

    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, err =>{
        if (err) throw err
        console.log(`> Ready on ${port}`);
    })
})
.catch(ex=>{
    console.error(ex.stack);
    process.exit(1)
})

