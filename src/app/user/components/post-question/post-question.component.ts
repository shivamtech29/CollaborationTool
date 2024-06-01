import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { QuestionService } from './../../user-services/question-service/question.service';
import { Component, inject } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-post-question',
  templateUrl: './post-question.component.html',
  styleUrl: './post-question.component.scss'
})
export class PostQuestionComponent {

  tags: any[] = [];
  isSubmitting!: boolean;
  addOnBlur: boolean = true;
  validateForm!: FormGroup;
  fruits = [{ name: 'Lemon' }, { name: 'Lime' }, { name: 'Apple' }];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add our tags
    if (value) {
      this.tags.push({ name: value });
    }
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
      this.announcer.announce(`Removed ${tag}`);
    }
  }

  edit(tag: any, event: MatChipEditedEvent) {
    const value = event.value.trim();
    // Remove tag if it no longer has a name 
    if (!value) {
      this.remove(tag);
      return;
    }
    // Edit existing tag
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index].name = value;
    }
  }

  constructor(private questionService: QuestionService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      tags: ['', Validators.required],
    })
  }

  postQuestion() {

    this.questionService.postQuestion(this.validateForm.value).subscribe(res => {
      console.log(res);
      this.validateForm.reset();
      if (res.id !== null) {
        this.snackBar.open("Question Posted Successfully", "Close", {
          duration: 5000,
        });
      } else {
        this.snackBar.open("Error Posting Question", "Close", {
          duration: 5000,
        });
      }
    })
  }

}
