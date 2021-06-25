import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Sujet } from '../modeles/sujet';
import { User } from '../modeles/User';
import { Message } from '../modeles/message';
import { SujetsService } from '../services/sujetsService';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../services/messageService';
import { Subscription } from 'rxjs';
import { UsersService } from '../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sujet-details',
  templateUrl: './sujet-details.component.html',
  styleUrls: ['./sujet-details.component.css']
})
export class SujetDetailsComponent implements OnInit, OnDestroy {
  creationMessage!: FormGroup;
  topic!: any;
  topicSubscription!: Subscription;
  user!: any;
  userSubscription!: Subscription;
  message= new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(3000)]);
  @Input() topicSelected: any;

  constructor(private activatedRoute: ActivatedRoute, private userService: UsersService, private sujetService: SujetsService, private messageService : MessageService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    const topicId: number = this.activatedRoute.snapshot.params['id'];                   // x
    this.creationMessage = this.formBuilder.group({
      message: ['', [Validators.required, , Validators.maxLength(3000), Validators.minLength(0)]] 
    });
    this.topicSubscription = this.sujetService.topicSubject.subscribe((topic: any) => {
      this.topic = topic.map( (topic: any) => {
        topic.date= new Date(topic.date*1000);
        return topic;
      });
    });
    this.sujetService.emitTopics();
    this.sujetService.recupUnSujet(topicId); // this.sujetService.recupUnSujet(4); 
    this.userSubscription = this.userService.userSubject.subscribe((user: User) => {
      this.user = user;
    });
    this.userService.emitUser();
    this.userService.recupUnUser(87);
    
    AppComponent.setMenuPosition(0);
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
    let contentMessage = this.creationMessage.value.message
    let currentDate = Math.floor(Date.now()/1000);
    let currentUser = this.user;
    let currentSujet = this.topic;
    let messageAEnregistrer = {content: contentMessage,
                               date: currentDate,
                               topic: currentSujet,
                               user: currentUser};
    console.log(messageAEnregistrer);
    this.messageService.createMessage(messageAEnregistrer);
    this.creationMessage.reset();
  }

  getMessages() : Message[] {
    return this.topic.messages;
  }

  getErrorMessage() {
    if (this.message.hasError('required')) {
      return 'Vous devez entrer un message';
    }
    return this.message.hasError('message') ? 'Vous devez écrire un message entre 50 et 3000 caractères' : 'Vous devez écrire un message entre 50 et 3000 caractères';
  }

  ngOnDestroy(): void {
    this.topicSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  convertTimestampEnDate(date: number): string {
    let newDate = new Date(date * 1000);
    let year = newDate.getFullYear();
    let month = newDate.getMonth();
    let day = newDate.getDay();
    return day + '/' + month + '/' + year;
  }

  refreshMessages() {
    window.location.reload();
  }

}
