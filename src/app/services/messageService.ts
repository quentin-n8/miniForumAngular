import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Message} from "../modeles/message";

@Injectable()
export class MessageService {

    messages: Message[] = [];
    apiURL = "http://localhost:8080";
    n: number = 1;

    constructor(private httpClient: HttpClient) {
        this.httpClient.get<Message[]>(this.apiURL + '/api/message', { observe: 'body' })
            .subscribe((messagesFromApi: Message[]) => {
                console.log(messagesFromApi);
                this.messages = messagesFromApi;
            }, error => {
                console.log("Erreur: " + error);

            });
    }

    getMessages() {
        if (this.n === 1) {
            //GET request :
            this.httpClient.get<Message[]>(this.apiURL +"/api/user", { observe: 'body' })
            .subscribe((messagesFromApi: Message[]) => {
                this.messages = messagesFromApi;
            }, error => {
                console.log("Erreur: " + error);
            });
            this.n++;
            }
        return this.messages;
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
