import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import { HackerNewsService } from './hacker-news.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  questions: any[] = [];
  pageNumber: number = 0;
  total!: number;
  searchtext: any;
  hackerNews: any[] = [];
  blogPosts: any[] = [];
  maxNewsItems: number = 5;

  constructor(
    private questionService: QuestionService,
    private hackerNewsService: HackerNewsService
  ) { }

  ngOnInit() {
    this.getAllQuestions();
    this.getHackerNews();
    this.getBlogPosts();
  }

  getAllQuestions() {
    this.questionService.getAllQuestions(this.pageNumber).subscribe(res => {
      console.log("res", res);
      this.questions = res.questionDTOList;
      this.total = res.totalPages * 5;
      this.loadProfilePictures(); // Load profile pictures after questions are fetched
    });
  }

  pageIndexChange(event: any) {
    this.pageNumber = event.pageIndex;
    this.getAllQuestions();
  }

  getHackerNews() {
    this.hackerNewsService.getTechStories().subscribe(results => {
      console.log("Tech News Results:", results);
      this.hackerNews = results.slice(0, this.maxNewsItems);
    }, error => {
      console.error("Error fetching tech news:", error);
    });
  }

  getBlogPosts() {
    this.hackerNewsService.getBlogPosts().subscribe(results => {
      console.log("Blog Posts Results:", results);
      this.blogPosts = results.slice(0, this.maxNewsItems);
    }, error => {
      console.error("Error fetching blog posts:", error);
    });
  }

  loadProfilePictures() {
    this.questions.forEach(question => {
      question.profilePicture = this.getRandomProfilePicture();
    });
  }

  getRandomProfilePicture(): string {
    const randomIndex = Math.floor(Math.random() * 100);
    return `https://robohash.org/${randomIndex}?set=set4&size=50x50`;
  }
}
