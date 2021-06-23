import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Sujet } from "../modeles/sujet";

@Injectable()
export class SujetsService {
    sujets: Sujet[] = [];
    apiUrl = 'http://localhost:8080/';
    n: number = 1;

    constructor(private httpClient: HttpClient) {
        this.httpClient.get<Sujet[]>(this.apiUrl + 'api/topic', { observe: 'body' })
            .subscribe((sujetsFromApi: Sujet[]) => {
                this.sujets = sujetsFromApi;
            }, error => {
                console.log('Erreur : ' + error);
            });
    }

    recupSujet () {
        if (this.n === 1) {
            this.httpClient.get<Sujet[]>(this.apiUrl + 'api/topic', { observe: 'body' })
            .subscribe((sujetsFromApi: Sujet[]) => {
                this.sujets = sujetsFromApi;
            }, error => {
                console.log('Erreur : ' + error);
            });
            this.n++;
        }
        return this.sujets;
        
    }

    recupUnSujet (id: number) {
        if(this.n === 1) {
            this.httpClient.get<Sujet[]>(`${this.apiUrl}api/topic/${id}`, { observe: 'body' })
            .subscribe((sujetsFromApi: Sujet[]) => {
                this.sujets = sujetsFromApi;
            }, error => {
                console.log('Erreur : ' + error);
            });
            this.n++;
        }
        return this.sujets;
    }

}