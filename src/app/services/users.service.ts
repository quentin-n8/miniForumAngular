import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from 'rxjs';
import { User } from "../modeles/User";

@Injectable()
export class UsersService {
  
  servicelist: User[]= [];
  usersSubject= new Subject<User[]>();
  user: any;
  userSubject = new Subject<User>();
  apiUrl= "http://localhost:8080/api"
  
  constructor(private httpClient: HttpClient) {  
  }

  emitUsers() {
    this.usersSubject.next(this.servicelist);
  }

  emitTopics(): void {
    this.userSubject.next(this.user);
  }
  
  recupAllUsers() {
    this.httpClient.get<User[]>(this.apiUrl+"/user", {observe: "body"})
    .subscribe((usersFromApi: User[]) => { 
      this.servicelist= usersFromApi;
      this.emitUsers();
    });
  
  }

  recupUnUser(id: number) {
    this.httpClient.get<User>(this.apiUrl+`/user/${id}`, {observe: "body"})
    .subscribe(usersFromApi => { 
      this.user= usersFromApi;
      this.emitTopics();
    }, error => { 
      console.log("Error :"+error);
    });
  }

  createUser(user: User){
    this.httpClient.post<User>(this.apiUrl+"/user", {username: user.username, password: user.password})
    .subscribe(responseFromApi => { 
      console.log(responseFromApi);
    }, error => { 
      console.log("Error :"+error);
    });

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
