import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isConnected = false;

  //constructor(private router : Router) {}

  seConnecter(): void {
    this.isConnected = true;
    console.log(this.isConnected);
  }

  seDeconnecter(): void {
    this.isConnected = false;
    console.log(this.isConnected);
  }

  //testSujet(): void {
  //  this.router.navigate(['test']);
  //}
}
