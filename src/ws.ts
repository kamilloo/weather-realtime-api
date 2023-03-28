import express, { Application, Request, Response } from 'express';
import {json} from "body-parser";
import http from "http";
import Websocket from 'ws';


const server = http.createServer();
const wss = new Websocket.Server({server})
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        ws.send(`echo ${message}`)
    })
    ws.send("hello")
})

export default server