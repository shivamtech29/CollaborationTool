// import { Component } from '@angular/core';
// import { AiService } from '../../user-services/ai-service/ai.service';

// interface Message {
//   text: string;
//   user: boolean;
// }

// @Component({
//   selector: 'app-ai-help',
//   templateUrl: './ai-help.component.html',
//   styleUrls: ['./ai-help.component.scss']
// })
// export class AiHelpComponent {
//   query = '';
//   messages: Message[] = [];

//   constructor(private aiService: AiService) {}

//   sendMessage() {
//     if (this.query.trim() === '') {
//       return;
//     }

//     this.messages.push({ text: this.query, user: true });
//     this.query = '';
//     this.addAiResponse();
//   }
//   addAiResponse() {
//     setTimeout(() => {
//       this.aiService.getAnswer(this.query).subscribe(answer => {
//          this.messages.push({ text: answer, user: false });
//       });
//       // this.messages.push({ text: 'This is a sample AI response.', user: false });
//     }, 1000);
//   }
// }

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
  query = '';
  messages: Message[] = [];

  constructor(private aiService: AiService) {}

  sendMessage() {
    if (this.query.trim() === '') {
      return;
    }

    this.messages.push({ text: this.query, user: true });
    this.addAiResponse(this.query); // Pass the query to get AI response
    this.query = '';
  }

  addAiResponse(query: string) {
    console.log(this.aiService.getAnswer(query))
    this.aiService.getAnswer(query).subscribe({
      next: (answer) => {
        this.messages.push({ text: answer, user: false });
      },
      error: (error) => {
        console.error('Error getting AI response:', error);
        this.messages.push({ text: 'Error fetching AI response', user: false });
      }
    });
  }
  
}
