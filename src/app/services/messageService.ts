import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Message} from "../modeles/message";
import { Subject } from "rxjs";


@Injectable()
export class MessageService {

    messages: Message[] = [];
    apiURL = "http://localhost:8080";
    messageSubject = new Subject<Message[]>();

    constructor(private httpClient: HttpClient) {}

    emitTopics() {
        this.messageSubject.next(this.messages);
    }

    recupMessages() {
        this.httpClient.get<Message[]>(this.apiURL +"/api/message", { observe: 'body' })
        .subscribe((messagesFromApi: Message[]) => {
            this.messages = messagesFromApi;
            this.emitTopics();
        }, error => {
            console.log("Erreur: " + error);
        });
    }


    createMessage(message: Message){
        this.httpClient.post<Message>(this.apiURL+"/api/message", message)     // {content: message.content, date: message.date, topic_id: message.topic_id, author_id: message.author_id}
        .subscribe(responseFromApi => { 
          console.log(responseFromApi);
        }, error => { 
          console.log("Error :"+error);
        });
    
      }

}
