'use strict';

// const serverless = require('serverless-http');
const express = require('express');
const compression = require('compression')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

// https://www.npmjs.com/package/cors

const root = require('./libs/root.js');
const versionList = require('./libs/versionList.js');
const tokens = require('./libs/tokens.js');
const classMembers = require('./libs/classMembers.js');

const AWS = require('aws-sdk');
AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'personal_default'});
const s3 = new AWS.S3({ apiVersion: '2006-03-01', region: 'us-west-2'});

// @ToDo: Add Winston/Bunyan logging

module.exports.app = async ()=>{
    const app = express()
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(compression());
    app.use(morgan('tiny')) // server request logs options: // dev | short | tiny | combined | common | 
    
    const classMembersHandler = await classMembers.init({s3client: s3})

    app.get( '/', root.handler)
    app.get( '/v1', versionList.version1);
    app.get( '/_v1', tokens.normalize, tokens.validate, versionList.version1);
    app.get( '/v1/classMembers.json',  tokens.normalize, tokens.validate, classMembersHandler)
    app.get( '/v1/tokens.json', tokens.normalizeCredentials, tokens.normalize, tokens.get) // does validation in the handler
    
    return app;
}

// module.exports.app = app