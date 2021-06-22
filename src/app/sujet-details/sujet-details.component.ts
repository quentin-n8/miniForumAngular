import { Component, OnInit } from '@angular/core';
import { Sujet } from '../modeles/sujet';
import { User } from '../modeles/User';
import { SujetsService } from '../services/sujetsService';

@Component({
  selector: 'app-sujet-details',
  templateUrl: './sujet-details.component.html',
  styleUrls: ['./sujet-details.component.css']
})
export class SujetDetailsComponent implements OnInit {

  //sujet = new Sujet(2, "Pif paf pouf", 21651656, new User("Orane Monteil", "azerty"));
  //sujet = SujetsService

  constructor(private service: SujetsService) { }

  ngOnInit(): void {
  }

  test(): string {
    return this.service.recupUnSujet(4)[0].title;
  }

}
