import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './modeles/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit{
  isConnected = false;
  connectedUser!: User;
  static menuPosition = 0;
  

  constructor(
    private router : Router,
    private route: ActivatedRoute
  ) {
    AppComponent.menuPosition = 0;
  }

  ngAfterViewInit(): void {
    this.affichageUser();
  }

  ngOnInit(): void {
    if (this.checkIfConnected()) {
      console.log(this.checkIfConnected());
      this.isConnected = true;
    } else {
      this.isConnected = false;
    }
  }

  redirectToAccueil() {
    AppComponent.menuPosition = 0;
    this.router.navigate(['accueil']);
  }

  redirectToModifierCompte(): void {
    AppComponent.menuPosition = 1;
    this.router.navigate(['modifierCompte']);
  }

  redirectToseConnecter(): void {
    AppComponent.menuPosition = 2;
    this.router.navigate(['connexion']);
  }

  redirectToCreationCompte(): void {
    AppComponent.menuPosition = 3;
    this.router.navigate(['creationCompte']);
  }

  redirectToseDeconnecter(): void {
    AppComponent.menuPosition = 0;
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

  affichageUser() : string {
    if (this.checkIfConnected()) {
      return JSON.parse(localStorage.getItem("current_user")!).username;
    } else {
      return "";
    }
  }

  getMenuPosition() {
    return AppComponent.menuPosition;
  }

  static setMenuPosition(pos: number) {
    AppComponent.menuPosition = pos;
  }

  @HostListener('window:unload', ['$event'])
  unloadHandler(event: any) {
    if (localStorage.getItem("seSouvenirDeMoi") === "false") {
      localStorage.removeItem("current_user");
    }
  }

}
