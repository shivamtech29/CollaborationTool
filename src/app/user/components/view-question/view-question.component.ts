import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { QuestionService } from '../../user-services/question-service/question.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from '../../user-services/answer-services/answer.service';
import { StorageService } from '../../../auth-services/storage-service/storage.service';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrl: './view-question.component.scss'
})
export class ViewQuestionComponent {

  questionId: number = this.activatedRoute.snapshot.params["questionId"];
  question: any;
  validateForm!: FormGroup;
  selectedFile!: File | null;
  imagePreview!: string | ArrayBuffer | null;
  formData: FormData = new FormData();
  answers: any[] = [];

  constructor(private questionService: QuestionService,
    private answerService: AnswerService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      body: [null, Validators.required]
    });
    this.getQuestionById();
  }

  getQuestionById() {
    this.questionService.getQuestionById(this.questionId).subscribe(data => {
      console.log("Get Question By Id questionService", data)
      this.question = data.questionDTO;
      data.answerDtoList.forEach((element: any) => {
        if (element.file != null) {
          element.convertedImg = "data:image/jpeg;base64," + element.file.data;
        }
        this.answers.push(element);
      })

    })
  }

  addAnswer() {
    const data = this.validateForm.value;
    data.questionId = this.questionId;
    data.userId = StorageService.getUserId();
    this.formData.append('multipartFile', this.selectedFile!);
    console.log("********** formDataTest formDataTest : ", this.formData)
    console.log("********** formDataTest multipartFile : ", this.formData.get("multipartFile"))
    this.answerService.postAnswer(data).subscribe(
      (res) => {
        this.answerService.postAnswerImage(this.formData, res.id).subscribe(
          (response) => {
            console.log("Answer image added", response)
          }
        )
        console.log("Post answer API Response", res)
        if (res.id != null) {
          this.snackBar.open("Answer added successfully", "Close", {
            duration: 5000,
          });
        } else {
          this.snackBar.open("Answer added failed", "Close", {
            duration: 5000,
          });
        }
      }
    );
    this.validateForm.reset();
  }

  addVote(voteType: string, voted: number) {

    if (voted == 1 || voted == -1) {
      this.snackBar.open("You already voted to this question", "Close", {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
    } else {
      const data = {
        userId: StorageService.getUserId(),
        questionId: this.questionId,
        voteType: voteType
      }
      this.questionService.addVoteToQuestion(data).subscribe(res => {
        console.log("********** addVote res : ", res)
        if (res != null) {
          this.snackBar.open("Vote added successfully", "Close", {
            duration: 5000,
          });
          this.getQuestionById();
        } else {
          this.snackBar.open("Vote added failed", "Close", {
            duration: 5000,
          });
        }
      })

    }


  }

  onFileSelectedd(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
    console.log("********** selected file", this.selectedFile)

  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
    this.previewImage();
  }
  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile!);
  }

}
