import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable, of, Subscription, timer } from 'rxjs';
import { map, debounceTime, take, switchMap } from "rxjs/operators";
import { AbstractControl, AsyncValidatorFn, ValidatorFn, FormBuilder, FormGroup, NgForm, FormControl, Validators, ControlContainer } from '@angular/forms';
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
  usersSubscription!: Subscription;
  userslist: User[]= [];
  hide = true;
  check_existing= false;
  
  constructor(private userservice: UsersService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {

    this.usersSubscription = this.userservice.usersSubject.subscribe((subscription_list: User[]) => {
      this.userslist = subscription_list;
    });
    this.userservice.emitUsers();
    this.userservice.recupAllUsers();

    this.CreationForm= this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), this.existingUserValidator()]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('.*[0-9]+.*'), Validators.pattern('.*[A-Z]+.*'), Validators.pattern('.*[^A-Za-z0-9]+.*')]],
      password_confirm: ['', [Validators.required, this.passwordConfirmValidator()]],
      save_localstorage: false,
    });
  }

  onSubmit(): void {
    this.user= this.CreationForm.value;
    this.userservice.createUser(this.user);

  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }

  getUsernameMessage() {
    if (this.CreationForm.controls.username.hasError('required')) {
      return 'Vous devez entrer un nom d\'utilisateur';
    }
    else if (this.CreationForm.controls.username.hasError('minlength') || this.CreationForm.controls.username.hasError('maxlength')) {
      return 'Le nom doit comporter entre 3 et 50 caractères';
    }
    else if (this.CreationForm.controls.username.hasError('existingUser')) {
      return 'Ce nom existe déjà';
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
    else if (this.CreationForm.controls.password_confirm.hasError('passwordConfirm')) {
      return 'La confirmation n\'est pas identique au mot de passe';
    }
    return this.CreationForm.controls.password_confirm.hasError('password_confirm') ? 'Confirmation invalide' : '';
  }

  Test(){
    // this.userservice.recupAllUsers();
    // let check_existing= false;
    // this.userslist.forEach( user => {
    //   if(user.username === this.CreationForm.controls.username.value) {
    //     check_existing= true;
    //   }
    // })
    // console.log(check_existing);
    console.log(this.userslist);
    console.log(this.userslist.length);
  }
  
  existingUserValidator(): AsyncValidatorFn {
    this.userservice.recupAllUsers();
    let check_existing= false;
    this.userslist.forEach( user => {
      if(user.username === this.CreationForm.controls.username.value) {
        check_existing= true;
      }
    });
    return (control: AbstractControl): Promise<{[key: string]: any} | null> | Observable<{ [key: string]: any } | null> => { 
      if (this.CreationForm && check_existing === true) {
            return {
                existingUser: {
                    value: ''
                }
            };
        } else {
            return null;
        }
    };
  }
  
  passwordConfirmValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        if (this.CreationForm && this.CreationForm.controls.password.value !== this.CreationForm.controls.password_confirm.value) {
            return {
                passwordConfirm: {
                    value: ''
                }
            };
        } else {
            return null;
        }
    };
  }

}
