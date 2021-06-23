import { Component, OnInit } from '@angular/core';
import { Sujet } from '../modeles/sujet';
import { User } from '../modeles/User';
import { Message } from '../modeles/message';
import { SujetsService } from '../services/sujetsService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../services/messageService';

@Component({
  selector: 'app-sujet-details',
  templateUrl: './sujet-details.component.html',
  styleUrls: ['./sujet-details.component.css']
})
export class SujetDetailsComponent implements OnInit {
  creationMessage!: FormGroup;


  constructor(private sujetService: SujetsService, private messageService : MessageService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.creationMessage = this.formBuilder.group({
      message: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(3000)]]
    });
  }

  titreSujet(): string {
    let newDate = new Date(this.sujetService.recupUnSujet(4)[0].date * 1000);
    let year = newDate.getFullYear();
    let month = newDate.getMonth();
    let day = newDate.getDay();
    return this.sujetService.sujets[0].title + ' le ' + day + '/' + month + '/' + year;
  }

  onSubmit(): void {
    console.log(this.creationMessage.value.message);

  }

  getMessages() : Message[] {
    return this.messageService.messages;
  }

}
