import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-modifier-compte',
  templateUrl: './form-modifier-compte.component.html',
  styleUrls: ['./form-modifier-compte.component.css']
})
export class FormModifierCompteComponent implements OnInit {
  
  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      nvUsername: ['', [Validators.minLength(3), Validators.maxLength(50)] ],
      nvPassword: ['', [Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{3,50}$/)]],
      confirPassword: [''],
      actuelPassword:['']
    })
    
  }

  onSubmit():void {
    console.log(this.myForm.controls.nvUsername);
    console.log(this.myForm.controls.nvPassword);
    
  }

  getUsernameErrors(): string|void {
    if (this.myForm.controls.nvUsername.hasError('maxlength')){
      return "Vous avez dépassé le nombre de caractères maximum (50) !";
    }

    if (this.myForm.controls.nvUsername.hasError('minlength')){
      return "L'username doit avoir 3 caractères minimum";
    }
  }

  getnvPasswordErrors(): string|void{
    if (this.myForm.controls.nvPassword.hasError('maxlength')){
      return "Vous avez dépassé le nombre de caractères maximum (50) !";
    }

    if (this.myForm.controls.nvPassword.hasError('minlength')){
      return "Le mot de passe doit avoir 3 caractères minimum";
    }

    if(this.myForm.controls.nvPassword.hasError('pattern')){
       return "Le mot de passe doit contenir au moins: un chiffre, une majuscule et un caractère spécial"
    }
  }

  getConfirPasswordErrors(): string|void{
 
    if(document.getElementsByName("confirPassword") != document.getElementsByName("nvPassword")){
      console.log(document.getElementsByName("confirPassword") == document.getElementsByName("nvPassword"));
      
      
      return "La confirmation n'est pas identique au nouveau mot de passe";
    }

    }
  }

