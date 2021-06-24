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

 
    postMessage(modifierMessage: Message){
        //POST request :
        this.httpClient.post<Message>(this.apiURL+"/api/message", { id: modifierMessage.id, content: modifierMessage.content, date: modifierMessage.date, topic_id: modifierMessage.topic_id, author_id: modifierMessage.author_id })
        .subscribe(responseFromApi => {
            console.log(responseFromApi);
            
        }, error => {
            console.log("Erreur : " + error);      
            
        });
    
      }

}
