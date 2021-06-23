import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, FormControl, Validators, ControlContainer } from '@angular/forms';
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
    if (this.CreationForm.controls.username.hasError('required')) {
      return 'Vous devez entrer un nom d\'utilisateur';
    }
    else if (this.CreationForm.controls.username.hasError('minlength') || this.CreationForm.controls.username.hasError('maxlength')) {
      return 'Le nom doit comporter entre 3 et 50 caractères';
    }

    return this.CreationForm.controls.username.hasError('username') ? 'Nom invalide' : '';
  }

  getPasswordMessage() {
    if (this.CreationForm.controls.password.hasError('required')) {
      return 'Vous devez entrer un mot de passe';
    }
    else if (this.CreationForm.controls.password.hasError('minlength') || this.CreationForm.controls.password.hasError('maxlength')) {
      return 'Le mot de passe doit comporter entre 3 et 50 caractères';
    }
    else if (this.CreationForm.controls.password.hasError('pattern')) {
      return 'Le mot doit contenir au moins un chiffre, une majuscule et un caractère spécial'
    }
    return this.CreationForm.controls.password.hasError('password') ? 'Mot de passe invalide' : '';
  }

  getConfirmMessage() {
    if (this.CreationForm.controls.password_confirm.hasError('required')) {
      return 'Vous devez confirmer le mot de passe';
    }

    return this.CreationForm.controls.password_confirm.hasError('password_confirm') ? 'Confirmation invalide' : '';
  }

  Test(){
    // this.userslist= this.userservice.recupUser();
    console.log(this.userservice.recupUser());
  }

}
