import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
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
  userslist!: User[];
  hide = true;
  username = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  password= new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('.*[0-9]+.*'), Validators.pattern('.*[A-Z]+.*'), Validators.pattern('.*[^A-Za-z0-9]+.*')]);
  password_confirm= new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  
  constructor(private userservice: UsersService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.CreationForm= this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('.*[0-9]+.*'), Validators.pattern('.*[A-Z]+.*'), Validators.pattern('.*[^A-Za-z0-9]+.*')]],
      password_confirm: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      save_localstorage: false,
    });
  }

  onSubmit(): void {
    console.log(this.CreationForm.value);
    this.user= this.CreationForm.value;
    console.log(this.user);
    this.userservice.createUser(this.user);

  }

  getUsernameMessage() {
    if (this.username.hasError('required')) {
      return 'Vous devez entrer un nom d\'utilisateur';
    }

    return this.username.hasError('username') ? 'Nom invalide' : '';
  }

  getPasswordMessage() {
    if (this.password.hasError('required')) {
      return 'Vous devez entrer un mot de passe';
    }

    return this.password.hasError('password') ? 'Mot de passe invalide' : '';
  }

  getConfirmMessage() {
    if (this.password_confirm.hasError('required')) {
      return 'Vous devez confirmer le mot de passe';
    }

    return this.password_confirm.hasError('password_confirm') ? 'Confirmation invalide' : '';
  }

}
