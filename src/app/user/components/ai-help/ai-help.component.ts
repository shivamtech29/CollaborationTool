import { Component } from '@angular/core';
import { AiService } from '../../user-services/ai-service/ai.service';

interface Message {
  text: string;
  user: boolean;
}

@Component({
  selector: 'app-ai-help',
  templateUrl: './ai-help.component.html',
  styleUrls: ['./ai-help.component.scss']
})
export class AiHelpComponent {
  newMessage = '';
  messages: Message[] = [];

  constructor(private aiService: AiService) {}

  sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }

    this.messages.push({ text: this.newMessage, user: true });
    this.newMessage = '';
    this.addAiResponse();
  }
  addAiResponse() {
    setTimeout(() => {
      // this.aiService.getAnswer(this.newMessage).subscribe(answer => {
      //    this.messages.push({ text: answer, user: false });
      // });
      this.messages.push({ text: 'This is a sample AI response.', user: false });
    }, 1000);
  }
}