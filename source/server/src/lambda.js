'use strict'

const awsServerlessExpress = require('aws-serverless-express')
let { app } = require('./app.js')

exports.handler = async()=>{
    app = await app().catch(er=>console.error(er))
    const server = awsServerlessExpress.createServer(app)
    return (event, context) => awsServerlessExpress.proxy(server, event, context)
};