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
        
        //GET request :
        this.httpClient.get<Message[]>(this.apiURL, { observe: 'body' })
        .subscribe((messagesFromApi: Message[]) => {
            this.messages = messagesFromApi;
        }, error => {
            console.log("Erreur: " + error);

        });
    }

    postMessage(){
        //POST request :
        this.httpClient.post<any>(this.apiURL, { id: '', content: '', date: '', topic_id: '', author_id: '' })
        .subscribe(responseFromApi => {
            console.log(responseFromApi);
            
        }, error => {
            console.log("Erreur : " + error);      
            
        });
    }
}
