import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Sujet } from "../modeles/sujet";

@Injectable()
export class SujetsService {
    sujets: Sujet[] = [];
    apiUrl = 'http://localhost:8080/';

    constructor(private httpClient: HttpClient) {

    }

    recupSujet () {
        this.httpClient.get<Sujet[]>(this.apiUrl + 'api/topic', { observe: 'body' })
            .subscribe((sujetsFromApi: Sujet[]) => {
                console.log(sujetsFromApi);
                this.sujets = sujetsFromApi;
            }, error => {
                console.log('Erreur : ' + error);
            });
        return this.sujets;
    }

    recupUnSujet (id: number) {
        this.httpClient.get<Sujet[]>(`${this.apiUrl}api/topic/${id}`, { observe: 'body' })
            .subscribe((sujetsFromApi: Sujet[]) => {
                console.log(sujetsFromApi);
                this.sujets = sujetsFromApi;
            }, error => {
                console.log('Erreur : ' + error);
            });
        return this.sujets;
    }

}