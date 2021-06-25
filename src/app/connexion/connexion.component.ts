import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  connexionForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UsersService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    
    this.connexionForm = this.formBuilder.group({
      
      username: ['', [Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.minLength(4), Validators.maxLength(50), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{4,50}$/)]],
      seSouvenirDeMoi: false
    });

    if (localStorage.getItem('current_user') !== null) {
      this.userService.login(JSON.parse(localStorage.getItem('current_user')  || ""), true);
      this.router.navigate(['accueil']);
    }

    AppComponent.setMenuPosition(4);
  }

  onSubmit(): void { 
    let userToLogin = {username: this.connexionForm.value.username,
                       password: this.connexionForm.value.password,
                       admin: 0};
    console.log(userToLogin);
    const { ...identifiants } = this.connexionForm.value;
    localStorage.setItem('current_user', JSON.stringify(userToLogin));
    this.userService.login(identifiants, this.connexionForm.value.seSouvenirDeMoi);
    this.appComponent.ngOnInit();
    this.router.navigate(['']);
  }

}
