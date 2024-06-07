import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';

@Component({
  selector: 'app-get-questions-by-userid',
  templateUrl: './get-questions-by-userid.component.html',
  styleUrls: ['./get-questions-by-userid.component.scss']
})
export class GetQuestionsByUseridComponent implements OnInit {

  questions: any[] = [];
  pageNumber: number = 0;
  total!: number;
  profilePictures: { [key: string]: string } = {};

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionService.getQuestionsByUserId(this.pageNumber).subscribe(res => {
      console.log("res", res);
      this.questions = res.questionDTOList;
      this.total = res.totalPages * 5;
      this.generateProfilePictures();
    });
  }

  pageIndexChange(event: any) {
    this.pageNumber = event.pageIndex;
    this.getAllQuestions();
  }

  generateProfilePictures() {
    this.questions.forEach(question => {
      if (!this.profilePictures[question.username]) {
        const randomId = Math.floor(Math.random() * 10) + 1; // Generate a random number between 1 and 10
        this.profilePictures[question.username] = `https://robohash.org/${randomId}?set=set4&size=50x50`;
      }
    });
  }
}
