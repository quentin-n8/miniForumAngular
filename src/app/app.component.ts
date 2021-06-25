import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isConnected = false;
  public menuPosition = 0;
  

  constructor(
    private router : Router,
    private route: ActivatedRoute
  ) {
    this.menuPosition = 0;
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
    this.isConnected = true;
    console.log(this.isConnected);
    this.router.navigate(['connexion']);
  }

  redirectToCreationCompte(): void {
    this.menuPosition = 3;
    this.router.navigate(['creationCompte']);
  }

  redirectToseDeconnecter(): void {
    this.menuPosition = 4;
    this.isConnected = false;
    console.log(this.isConnected);
  }

  


}
