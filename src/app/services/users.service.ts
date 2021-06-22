import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { User } from "../modeles/User";

@Injectable()
export class UsersService {

  users_list: User []= [];
  apiUrl= "http://localhost:8080/api"

  constructor(private httpClient: HttpClient) {
    
  }

  recupUser(){
    this.httpClient.get<User[]>(this.apiUrl+"/user", {observe: "body"})
    .subscribe(usersFromApi => { 
      this.users_list= usersFromApi;
    }, error => { 
      console.log("Error :"+error);
    });

  }

  createUser(user: User){
    this.httpClient.post<User>(this.apiUrl+"/user", {name: user.username, password: user.password})
    .subscribe(responseFromApi => { 
      console.log(responseFromApi);
    }, error => { 
      console.log("Error :"+error);
    });

  }
   
}


