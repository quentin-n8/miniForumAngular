import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { User } from '../modeles/User';
import { UsersService } from '../services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-modifier-compte',
  templateUrl: './form-modifier-compte.component.html',
  styleUrls: ['./form-modifier-compte.component.css'],

})
export class FormModifierCompteComponent implements OnInit {

  myForm!: FormGroup;
  user!: User;
  usersSubscription!: Subscription;
  usersList: User[] = [];
  hideMdpActuel=true;
  hideNvMDP=true;
  hideConfirPassword = true; 

  constructor(private userService: UsersService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.usersSubscription = this.userService.usersSubject.subscribe((subscription_list: User[]) => {
      this.usersList = subscription_list;

    });

    this.userService.emitUsers();
    this.userService.recupAllUsers();

    this.myForm = this.formBuilder.group({
      nvUsername: [this.recupNomCurrentUser(), [Validators.minLength(3), Validators.maxLength(50), Validators.required, this.usernameValidator()]],
      nvPassword: ['', [Validators.minLength(4), Validators.maxLength(50), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{4,50}$/)]],
      confirPassword: ['', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{4,50}$/), this.passwordConfirmValidator()]],
      actuelPassword: ['', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{4,50}$/), Validators.required]],

    })
  }

  onSubmit(): void {
    let user = {
      username: this.myForm.value.nvUsername,
      password: this.myForm.value.nvPassword,
      passwordConfirm: this.myForm.value.confirPassword,
      oldPassword: this.myForm.value.actuelPassword
    };

    this.userService.modifierUnUser(user);

    let userLocalStorage ={
      username: this.myForm.value.nvUsername,
      password: this.myForm.value.nvPassword,
      admin: 0
    }
    localStorage.setItem('current_user', JSON.stringify(userLocalStorage));
  }

  getUsernameErrors(): string | void {
    if (this.myForm.controls.nvUsername.hasError('required')) {
      return "L'username doit être indiqué";
    }
    if (this.myForm.controls.nvUsername.hasError('maxlength')) {
      return "Vous avez dépassé le nombre de caractères maximum (50) !";
    }

    if (this.myForm.controls.nvUsername.hasError('minlength')) {
      return "L'username doit avoir 3 caractères minimum";
    }

    if (this.myForm.controls.nvUsername.hasError('existingUsername')) {
      return "Ce username est déjà utilisé !";
    }
  }

  getActuelPasswordErrors(): string | void {
    if (this.myForm.controls.actuelPassword.hasError('required')) {
      return "Le mot de passe actuel doit être indiqué"
    }
    if (this.myForm.controls.actuelPassword.hasError('pattern')) {
      return "Le mot de passe doit contenir au moins: un chiffre, une majuscule et un caractère spécial"
    }

  }

  getnvPasswordErrors(): string | void {
    if (this.myForm.controls.nvPassword.hasError('maxlength')) {
      return "Vous avez dépassé le nombre de caractères maximum (50) !";
    }

    if (this.myForm.controls.nvPassword.hasError('minlength')) {
      return "Le mot de passe doit avoir 4 caractères minimum";
    }

    if (this.myForm.controls.nvPassword.hasError('pattern')) {
      return "Le mot de passe doit contenir au moins: un chiffre, une majuscule et un caractère spécial"
    }
  }

  getPasswordConfirmErrors(): string | void {
    if (this.myForm.controls.confirPassword.hasError('passwordConfirm')) {
      return "Les mots de passe ne sont pas identiques !";
    }
  }

  // Validator custom permettant de vérifier que le nouveau mot de passe et la confirmation sont identiques
  passwordConfirmValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (this.myForm && (this.myForm.value.nvPassword !== control.value)) {
        return {
          passwordConfirm: { value: '' }
        };
      }
      else {
        return null;
      }
    }
  };

  //Validator Custom pour vérifier que l'username n'existe pas déjà
  usernameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
     let nomCurrentUser = this.recupNomCurrentUser()
      const searchUser = this.usersList.find(user => user.username === control.value && user.username!==nomCurrentUser );
      if (searchUser) {
        return {
          existingUsername: { value: '' }

        };
      } else return null;
    }
  };


  recupNomCurrentUser(): string{   
   return JSON.parse(localStorage.getItem('current_user')!).username;
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }
}

