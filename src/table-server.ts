import { createServer, Server } from 'http';
import * as express from 'express';
import { Request, Response } from 'express';
import * as socketIo from 'socket.io';

import { iGuest } from './model/guest';
import Guest from './model/guest';

export class TableServer {
    public static readonly PORT: number = 8080;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
    }

    private createApp(): void {
        this.app = express();
        //put headers for cors
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private config(): void {
        this.port = process.env.PORT || TableServer.PORT;
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
        this.app.get('/all', this.getAll);
        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);
            socket.on('guest', (m: iGuest) => {
                console.log(JSON.stringify(m));
                this.addGuest(m);
                this.io.emit('guest', m);
            });

            socket.on('disconnect', (m: iGuest) => {
                console.log('Client disconnected: ', JSON.stringify(m));
            });
        });
    }

    public getApp(): express.Application {
        return this.app;
    }

    getAll(req: Request, res: Response, next) {
        let guests = Guest.find((err: any, guests: any) => {
            if(err){
                res.send("Error!");
            } else {
                res.send(guests);
            }
        })
    }

    private addGuest = (m) => {
        var guest = new Guest(m);

        guest.save((err: any) => {
            if (err) {
                console.log(err);
            } else {
                console.log(guest);
            }
        })
    }
}
