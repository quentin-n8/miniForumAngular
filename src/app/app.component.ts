import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './modeles/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  isConnected = false;
  connectedUser!: User;
  public menuPosition = 0;
  

  constructor(
    private router : Router,
    private route: ActivatedRoute
  ) {
    this.menuPosition = 0;
  }

  ngOnInit(): void {
    if (this.checkIfConnected()) {
      console.log(this.checkIfConnected());
      this.isConnected = true;
      this.connectedUser = JSON.parse(localStorage.getItem("current_user")!);
      console.log(this.connectedUser.username);
    } else {
      this.isConnected = false;
      this.connectedUser = JSON.parse("");
    }
    setTimeout(() => {
      this.affichageUser();
    }, 1);
  }

  redirectToAccueil() {
    this.menuPosition = 0;
    this.router.navigate(['accueil']);
  }

  redirectToModifierCompte(): void {
    this.menuPosition = 1;
    this.router.navigate(['modifierCompte']);
  }

  redirectToseConnecter(): void {
    this.menuPosition = 2;
    this.router.navigate(['connexion']);
  }

  redirectToCreationCompte(): void {
    this.menuPosition = 3;
    this.router.navigate(['creationCompte']);
  }

  redirectToseDeconnecter(): void {
    this.menuPosition = 0;
    this.isConnected = false;
    // if (localStorage.getItem('seSouvenirDeMoi') === 'false') {
      
    // } 
    localStorage.removeItem('current_user');
    localStorage.removeItem('seSouvenirDeMoi');
    this.router.navigate(['connexion']);
  }

  checkIfConnected() {
    if (localStorage.getItem("current_user") === null) {
      return false;
    } else {
      return true;
    }
  }

  affichageUser() {
    const userDisp = document.getElementById("userDisp")!;
    if (this.checkIfConnected()) {
      userDisp.textContent = this.connectedUser.username;
    } else {
      userDisp.textContent = "";
    }
  }

  ngOnDestroy(): void {
    if (localStorage.getItem('seSouvenirDeMoi') === 'false') {
      localStorage.removeItem('current_user');
    }
  }


}
