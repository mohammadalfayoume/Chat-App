import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css'
})

export class ChatRoomComponent {
  @Output() sendMessage = new EventEmitter<{ username: string, message: string }>();
  @Output() sendToUser = new EventEmitter<{ username: string, message: string, receiverId: string }>();

  firstForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    message: new FormControl("", [Validators.required])
  });

  secondForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    message: new FormControl("", [Validators.required]),
    receiverId: new FormControl("", [Validators.required])
  });

  onSendAllSubmit(): void {
    const username = this.firstForm.get('username')?.value;
    const message = this.firstForm.get('message')?.value;
    console.log(this.firstForm.value);
    
    if (username && message) {
      this.sendMessage.emit({ username, message });
    } else {
      console.log("something went wrong");
    }
  }

  onSendSubmit(): void {
    const username = this.secondForm.get('username')?.value;
    const message = this.secondForm.get('message')?.value;
    const receiverId = this.secondForm.get('receiverId')?.value;
    if (username && message && receiverId) {
      this.sendToUser.emit({ username, message, receiverId });
    }
  }
}