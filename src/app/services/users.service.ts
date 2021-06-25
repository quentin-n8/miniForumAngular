import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { User } from "../modeles/User";
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class UsersService {
  
  servicelist: User[]= [];
  usersSubject= new Subject<User[]>();
  user: any;
  userSubject = new Subject<User>();
  apiUrl= "http://localhost:8080/"
  
  constructor(private httpClient: HttpClient, private snackbar: MatSnackBar) {  
  }

  //Subject est un observable, faire .next permet de dire qu'il y a eu un changement et qu'il faut le mettre à jour
  //Permet de déclencher la méthode avec la requête dans laquelle on a mis le emit en cas de changement
  emitUsers() {
    this.usersSubject.next(this.servicelist);
  }

  emitUser(): void {
    this.userSubject.next(this.user);
  }
  
  recupAllUsers() {
    this.httpClient.get<User[]>(this.apiUrl+"api/user", {observe: "body"})
    .subscribe((usersFromApi: User[]) => { 
      this.servicelist= usersFromApi;
      this.emitUsers();
    });
  
  }

  recupUnUser(id: number) {
    this.httpClient.get<User>(this.apiUrl+`api/user/${id}`, {observe: "body"})
    .subscribe(usersFromApi => { 
      this.user= usersFromApi;
      this.emitUser();
    }, error => { 
      console.log("Error :"+error);
    });
  }

  createUser(user: User){
    this.httpClient.post<User>(this.apiUrl+"api/user", {username: user.username, password: user.password})
    .subscribe(responseFromApi => { 
      console.log(responseFromApi);
      this.snackbar.open("Nouvel utilisateur enregistré", "Ok");
    }, error => { 
      console.log("Error :"+error);
      this.snackbar.open("Le mot de passe actuel n'est associé à aucun compte", "Ok");
    });

  }

  modifierUnUser(id: number, userModif: User) {
    this.httpClient.patch<User>(`${this.apiUrl}api/user/${id}`, userModif)
      .subscribe(responseFromApi => {
        console.log(responseFromApi);
        this.snackbar.open("Nouveau mot de passe enregisté", "Ok");
      }, error => { 
        console.log("Error :" + error);
        this.snackbar.open("Erreur : Veuillez vérifier le mot de passe actuel saisi", "Ok");
      });
  }

  login(identifiants: any, seSouvenirDeMoi: boolean): void {
    this.httpClient.post(`${this.apiUrl}login`, identifiants).subscribe(user => {
      this.user = user;
      this.emitUser();
      if (seSouvenirDeMoi) {
        localStorage.setItem('seSouvenirDeMoi', 'true');
      } else {
        localStorage.setItem('seSouvenirDeMoi', 'false');
      }
    }, error => {
      console.log(error);
    });
  }

}
