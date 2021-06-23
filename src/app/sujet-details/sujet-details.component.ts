import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sujet } from '../modeles/sujet';
import { User } from '../modeles/User';
import { Message } from '../modeles/message';
import { SujetsService } from '../services/sujetsService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  topic: any;
  topicSubscription!: Subscription;
  messages: Message[] = [];
  messageSubscription!: Subscription;

  constructor(private sujetService: SujetsService, private messageService : MessageService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.creationMessage = this.formBuilder.group({
      message: ['', [Validators.minLength(0)]]    // Validators.required, , Validators.maxLength(3000)
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
    console.log(this.topic);
    let newDate = new Date(this.topic.date * 1000);
    let year = newDate.getFullYear();
    let month = newDate.getMonth();
    let day = newDate.getDay();
    return this.topic.title + ' le ' + day + '/' + month + '/' + year;
  }

  onSubmit(): void {
    console.log(this.creationMessage.value.message);
    let currentDate = Math.floor(Date.now()/1000);
    console.log(currentDate);
  }

  getMessages() : Message[] {
    console.log(this.messages);
    return this.messages;
  }

  ngOnDestroy(): void {
    this.topicSubscription.unsubscribe();
    this.messageSubscription.unsubscribe();
}

}
