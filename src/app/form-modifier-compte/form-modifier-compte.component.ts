import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { User } from '../modeles/User';
import { UsersService } from '../services/users.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-form-modifier-compte',
  templateUrl: './form-modifier-compte.component.html',
  styleUrls: ['./form-modifier-compte.component.css'],

})
export class FormModifierCompteComponent implements OnInit {

  myForm!: FormGroup;
  user!: User;

  constructor(private userService: UsersService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      nvUsername: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      nvPassword: ['', [Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{3,50}$/)]],
      confirPassword: ['', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{3,50}$/), this.passwordConfirmValidator()]],
      actuelPassword: ['', [Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{3,50}$/)]]
    })

  }

  onSubmit(): void {
    console.log(this.myForm.value);
    this.user = this.myForm.value;
    this.userService.recupUser();

  }

  getUsernameErrors(): string | void {
    if (this.myForm.controls.nvUsername.hasError('maxlength')) {
      return "Vous avez dépassé le nombre de caractères maximum (50) !";
    }

    if (this.myForm.controls.nvUsername.hasError('minlength')) {
      return "L'username doit avoir 3 caractères minimum";
    }
  }

  getnvPasswordErrors(): string | void {
    if (this.myForm.controls.nvPassword.hasError('maxlength')) {
      return "Vous avez dépassé le nombre de caractères maximum (50) !";
    }

    if (this.myForm.controls.nvPassword.hasError('minlength')) {
      return "Le mot de passe doit avoir 3 caractères minimum";
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

    return (control: AbstractControl): {
      [key: string]: any} | null => {
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
}

