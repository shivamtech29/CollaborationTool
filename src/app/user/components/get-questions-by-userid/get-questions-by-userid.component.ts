import { Component } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';

@Component({
  selector: 'app-get-questions-by-userid',
  templateUrl: './get-questions-by-userid.component.html',
  styleUrl: './get-questions-by-userid.component.scss'
})
export class GetQuestionsByUseridComponent {

  questions: any[] = [];
  pageNumber: number = 0;
  total!: number;
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionService.getQuestionsByUserId(this.pageNumber).subscribe(res => {
      console.log("res", res);
      this.questions = res.questionDTOList;
      this.total = res.totalPages * 5;
    })
  }
  pageIndexChange(event: any) {
    this.pageNumber = event.pageIndex;
    this.getAllQuestions();
  }
}
