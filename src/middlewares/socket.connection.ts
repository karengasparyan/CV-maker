import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Socket} from "socket.io";
import {UnauthorizedException} from "@nestjs/common";

//https://hoppscotch.io/ru/realtime/
@WebSocketGateway({cors: {origin: '*'}})
export class SocketConnection implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server;
    private static users = new Set();

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string): void {
        this.server.emit('message', message);
    }

    handleConnection(socket: Socket) {
        try {
            console.log('connected');
            const decoded = socket.handshake.headers.authorization;
            SocketConnection.users[decoded] = socket;
            this.server.emit('connected')
        } catch (e) {
            return SocketConnection.disconnect(socket);
        }
    }

    handleDisconnect() {
        console.log('disconnected')
    }

    private static disconnect(socket: Socket){
        socket.emit('Error', new UnauthorizedException())
        socket.disconnect();
    }

    static emit(userId: string, event: string, data: {message: string}) {
        return this.users[userId] && this.users[userId].emit(event, data)
    }

}
