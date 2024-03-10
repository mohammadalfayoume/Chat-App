// app.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  connectionId: string | undefined;
  conn: HubConnection | undefined;

  ngOnInit(): void {
    this.conn = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/chat')
      .configureLogging(LogLevel.Information)
      .build();

    this.conn.on('ReceiveMessage', (username: string, msg: string, connId: string) => {
      const li = document.createElement('li');
      li.textContent = `${connId}: ${username} says ${msg}`;
      document.getElementById('messagesList')?.appendChild(li);
      console.log(`Message: ${msg}, from ${username}`);
    });

    this.conn.start()
      .then(() => {
        this.conn?.invoke('GetConnectionId').then((id: string) => {
          console.log(id);
          this.connectionId = id;
        });
      })
      .catch(error => console.error('Error establishing connection:', error));
  }

  ngOnDestroy(): void {
    this.conn?.stop();
  }

  sendMessage(event : any): void {
    this.conn?.invoke('SendMessage', event.username, event.message).catch(e => console.error(e));
  }

  sendToUser(event : any): void {
    this.conn?.invoke('SendToUser', event.username, event.receiverId, event.message).catch(e => console.error(e));
  }
}
