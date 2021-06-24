import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Sujet } from "../modeles/sujet";
import { Subject } from 'rxjs';

@Injectable()
export class SujetsService {
    topics: Sujet[] = [];
    topic: any;
    topicSubject = new Subject<Sujet>();
    topicsSubject = new Subject<Sujet[]>();
    apiUrl = 'http://localhost:8080/';

    constructor(private httpClient: HttpClient) {}

    emitTopics() {
        this.topicSubject.next(this.topic);
        this.topicsSubject.next(this.topics);
    }

    recupSujet () {
        this.httpClient.get<Sujet[]>(`${this.apiUrl}api/topic`, { observe: 'body' })
        .subscribe((sujetsFromApi: Sujet[]) => {
            this.topics = sujetsFromApi;
            this.emitTopics();
        }, error => {
            console.log('Erreur : ' + error);
        });
    }

    recupUnSujet (id: number) {
        this.httpClient.get<Sujet>(`${this.apiUrl}api/topic/${id}`, { observe: 'body' })
        .subscribe((sujetsFromApi: Sujet) => {
            this.topic = sujetsFromApi;
            this.emitTopics();
        }, error => {
            console.log('Erreur : ' + error);
        });
    }




    



}