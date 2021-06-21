import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from "../modeles/User";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users_list: User []= [];

  constructor() { }
}


