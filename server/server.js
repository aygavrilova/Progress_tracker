const express = require('express')
const morgan = require('morgan')
const PORT = 8000
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
require("dotenv").config();
const {
    getUsersHandler,
    getProfileHandler,
    getGoalsHandler,
    getGoalHandler,
    getCurrProfileHandler,
    createGoalHandler,
    patchCurrProfileHandler,
    patchProfileEmailsPrefsHandler,
    patchProfileUserInfoHandler
} = require('./handlers.js')

const { auth, requiresAuth } = require('express-openid-connect');
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: "https://dev-jkinoppb.us.auth0.com/.well-known/jwks.json",
    }),
  
    audience: "https://dev-jkinoppb.us.auth0.com/api/v2/",
    issuer: "https://dev-jkinoppb.us.auth0.com/",
    algorithms: ["RS256"],
  });


  const extractToken = (req,res,next)=>{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader === "undefined"){
        return res.sendStatus(403);
    }

    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    req.token = token;

    next();
  }

express()

    .use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Methods",
            "OPTIONS, HEAD, GET, PUT, POST, DELETE"
        );
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        );

        next();
    })

    .use(morgan("tiny"))
    .use(express.static("./server/assets"))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))

    .get('/', (req, res) => {
        res.status(200).json({ status: 200, message: "Hello!" })
    })

    .get("/v1/api/profiles",getUsersHandler)
    .get("/v1/api/profiles/:id", getProfileHandler)

    // auth required
    .get("/v1/api/profile",extractToken,checkJwt,getCurrProfileHandler)
    .patch("/v1/api/profile", extractToken, checkJwt, patchCurrProfileHandler)
    .patch("/v1/api/profile/emailPrefs", extractToken, checkJwt, patchProfileEmailsPrefsHandler)
    .patch("/v1/api/profile/userInfo", extractToken, checkJwt, patchProfileUserInfoHandler)

    .get("/v1/api/goals", getGoalsHandler)
    .get("/v1/api/goals/:id", getGoalHandler)
    
    // auth required
    .post("/v1/api/goals",extractToken, checkJwt, createGoalHandler)


    .listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`)
    })
