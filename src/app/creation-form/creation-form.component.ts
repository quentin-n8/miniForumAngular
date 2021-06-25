import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AbstractControl, AsyncValidatorFn, ValidatorFn, FormBuilder, FormGroup, NgForm, FormControl, Validators, Validator, ControlContainer } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from "../modeles/User";
import { AppComponent } from '../app.component';

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
  hide1 = true;
  hide2 = true;
  save_localstorage= false;
  
  constructor(private userservice: UsersService, private formBuilder: FormBuilder, private router : Router) {
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
    });

    AppComponent.setMenuPosition(3);
  }

  onSubmit(): void {
    this.user= this.CreationForm.value;
    this.userservice.createUser(this.user);
    if (this.save_localstorage === true) {
      localStorage.setItem('current_user', JSON.stringify(this.user));
    }
    this.router.navigate(['accueil']);
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

  getByUsername(username: string): User | undefined {
    const user = this.userslist.find(user => user.username === username);
    return user;
  }
  
  existingUserValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        if (this.CreationForm && this.getByUsername(this.CreationForm.controls.username.value) !== undefined) {
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

  saveUser() {
    if(this.save_localstorage === false) {
      this.save_localstorage= true;
    }
    else if (this.save_localstorage === true) {
      this.save_localstorage= false;
    }
  }

}
