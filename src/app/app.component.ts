import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isConnected = false;

  seConnecter(): void {
    this.isConnected = true;
    console.log(this.isConnected);
  }

  seDeconnecter(): void {
    this.isConnected = false;
    console.log(this.isConnected);
  }
}
