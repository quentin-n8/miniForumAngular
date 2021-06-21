import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  isConnected = false;

  constructor() { }

  ngOnInit(): void {
    console.log("test");
  }

  seConnecter(): void {
    this.isConnected = true;
    console.log(this.isConnected);
  }

  seDeconnecter(): void {
    this.isConnected = false;
    console.log(this.isConnected);
  }



}
