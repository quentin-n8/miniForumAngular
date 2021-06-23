import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sujet } from '../modeles/sujet';
import { User } from '../modeles/User';
import { Message } from '../modeles/message';
import { SujetsService } from '../services/sujetsService';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../services/messageService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sujet-details',
  templateUrl: './sujet-details.component.html',
  styleUrls: ['./sujet-details.component.css']
})
export class SujetDetailsComponent implements OnInit, OnDestroy {
  creationMessage!: FormGroup;
  topics: Sujet[] = [];
  topic!: any;
  topicSubscription!: Subscription;
  messages: Message[] = [];
  messageSubscription!: Subscription;
  message= new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(3000)]);

  constructor(private sujetService: SujetsService, private messageService : MessageService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.creationMessage = this.formBuilder.group({
      message: ['', [Validators.required, , Validators.maxLength(3000), Validators.minLength(0)]] 
    });
    this.topicSubscription = this.sujetService.topicSubject.subscribe((topic: Sujet) => {
      this.topic = topic;
    });
    this.sujetService.emitTopics();
    this.sujetService.recupUnSujet(4);
    this.messageSubscription = this.messageService.messageSubject.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
    this.messageService.emitTopics();
    this.messageService.recupMessages();
  }

  titreSujet(): string {
    return this.topic.title;
  }

  sousTitreSujet(): string {
    let newDate = new Date(this.topic.date * 1000);
    let year = newDate.getFullYear();
    let month = newDate.getMonth();
    let day = newDate.getDay();
    let hour = newDate.getHours();
    let minute = newDate.getMinutes();
    return 'Posté le ' + day + '/' + month + '/' + year + ' à ' + hour + ':' + minute + ' par ' + this.topic.author.username;
  }

  onSubmit(): void {
    console.log(this.creationMessage.value.message);
    let currentDate = Math.floor(Date.now()/1000);
    console.log(currentDate);
  }

  getMessages() : Message[] {
    // const listMessagesDuSujet: Message[] = [];
    // this.messages.forEach(message => {
    //   console.log("------- " + message.topic_id.id + " === " + this.topic.id);
    //   if (message.topic_id.id === this.topic.id) {
    //     listMessagesDuSujet.push(message);
    //   }
    // })
    return this.messages;
  }

  getErrorMessage() {
    if (this.message.hasError('required')) {
      return 'Vous devez entrer un message';
    }
    return this.message.hasError('message') ? 'Vous devez écrire un message entre 50 et 3000 caractères' : 'Vous devez écrire un message entre 50 et 3000 caractères';
  }

  ngOnDestroy(): void {
    this.topicSubscription.unsubscribe();
    this.messageSubscription.unsubscribe();
  }

  convertTimestampEnDate(date: number): string {
    let newDate = new Date(date * 1000);
    let year = newDate.getFullYear();
    let month = newDate.getMonth();
    let day = newDate.getDay();
    return day + '/' + month + '/' + year;
  }

}
