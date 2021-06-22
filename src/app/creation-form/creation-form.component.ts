import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { User } from "../modeles/User";

@Component({
  selector: 'app-creation-form',
  templateUrl: './creation-form.component.html',
  styleUrls: ['./creation-form.component.css']
})

export class CreationFormComponent implements OnInit {
  CreationForm!: FormGroup;
  user!: User;
  
  constructor(private userservice: UsersService, private formBuilder: FormBuilder) {
   }

  ngOnInit(): void {
    this.CreationForm= this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password_confirm: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  onSubmit(): void {
    console.log(this.CreationForm.value);
    this.user= this.CreationForm.value;
    this.userservice.createUser(this.user);

  }

}
