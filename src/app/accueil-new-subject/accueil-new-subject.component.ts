import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-accueil-new-subject',
  templateUrl: './accueil-new-subject.component.html',
  styleUrls: ['./accueil-new-subject.component.css']
})

export class AccueilNewSubjectComponent implements OnInit {
  newSubjectForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.newSubjectForm = this.formBuilder.group({
      newTitle: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      newMessage: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(3000)]]
    });
  }

  onSubmitNewSubject(): void {
    console.log(this.newSubjectForm.value);
  }

}
