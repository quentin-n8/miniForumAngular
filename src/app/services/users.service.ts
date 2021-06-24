import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { User } from "../modeles/User";
import { Subject } from 'rxjs';

@Injectable()
export class UsersService {
  user: any;
  userSubject = new Subject<User>();

  apiUrl= "http://localhost:8080/api"
  constructor(private httpClient: HttpClient) {
    
  }

  emitTopics(): void {
    this.userSubject.next(this.user);
  }

  recupUser(): User[] {
    let userslist: User[]= [];
    this.httpClient.get<User[]>(this.apiUrl+"/user", {observe: "body"})
    .subscribe(usersFromApi => { 
      userslist= usersFromApi;
    }, error => { 
      console.log("Error :"+error);
    });
    return userslist;
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
   
}


