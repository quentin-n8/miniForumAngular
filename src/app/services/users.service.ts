import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { User } from "../modeles/User";

@Injectable()
export class UsersService {
  users: User[] = [];
  apiUrl = "http://localhost:8080/api"
  constructor(private httpClient: HttpClient) {

  }

  recupUser(): User[] {
    let userslist: User[] = [];
    this.httpClient.get<User[]>(this.apiUrl + "/user", { observe: "body" })
      .subscribe(usersFromApi => {
        usersFromApi.forEach(user => {
          userslist.push(user);
        });
      }, error => {
        console.log("Error :" + error);
      });
    return userslist;
  }

  createUser(user: User) {
    this.httpClient.post<User>(this.apiUrl + "/user", { username: user.username, password: user.password })
      .subscribe(responseFromApi => {
        console.log(responseFromApi);
      }, error => {
        console.log("Error :" + error);
      });

  }
  recupUnUser(id: number) {
    this.httpClient.get<User[]>(`${this.apiUrl}/user/${id}`, { observe: 'body' })
      .subscribe((usersFromApi: User[]) => {
        console.log(usersFromApi);
        this.users = usersFromApi;
      }, error => {
        console.log('Erreur : ' + error);
      });
    return this.users;
  }

  modifierUnUser(id: number, userModif: User) {
    this.httpClient.patch<User>(`${this.apiUrl}/user/${id}`, userModif)
      .subscribe(responseFromApi => {
        console.log(responseFromApi);
      }, error => {
        console.log("Error :" + error);
      });
  }

}
