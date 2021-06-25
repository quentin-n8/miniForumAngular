import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  connexionForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UsersService) { }

  ngOnInit(): void {
    this.connexionForm = this.formBuilder.group({
      username: ['', [Validators.minLength(4), Validators.maxLength(50)]],
      password: ['', [Validators.minLength(4), Validators.maxLength(50), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{3,50}$/)]],
      rememberMe: false
    })
  }

  onSubmit(): void {
    const { ...credentials } = this.connexionForm.value;
    this.userService.login(credentials);
    console.log(credentials);
    this.router.navigate(['']);
  }

}
