import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Message} from "../modeles/message";

@Injectable()
export class MessageService {

    messages: Message[] = [];
    apiURL = "http://localhost:8080";

    constructor(private httpClient: HttpClient) {

    }

    getMessages() {
        
        //GET request tous les messages:
        this.httpClient.get<Message[]>(this.apiURL +"/api/message", { observe: 'body' })
        .subscribe((messagesFromApi: Message[]) => {
            this.messages = messagesFromApi;
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
