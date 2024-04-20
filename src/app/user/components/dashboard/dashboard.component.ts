import { Component } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  questions: any[] = [];
  pageNumber: number = 0;
  total!: number;
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.questionService.getAllQuestions(this.pageNumber).subscribe(res => {
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
