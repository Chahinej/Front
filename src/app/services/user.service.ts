import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl =environment.apiBaseUrl ;
  constructor(private httpclient:HttpClient) { }
  public getUsers() : Observable<User[]>{
    return this.httpclient.get<User[]>(`${this.apiServerUrl}/Controller/Dashboard/users`);
  }
  public getUser(username:String): Observable<User>
  {
    return this.httpclient.get<User>(`${this.apiServerUrl}/Controller/Front/get_user/${username}`);
  }
  public deleteUser(User:number) : Observable<void>
  {
    return this.httpclient.delete<void>(`${this.apiServerUrl}/Controller/Front/user/delete/${User}`);//link
}
public addUser(User:User) : Observable<User>
{
  return this.httpclient.post<User>(`${this.apiServerUrl}/Controller/Front/user/Register`,User);
}
public updateUser(User:User) : Observable<User>
{
  return this.httpclient.put<User>(`${this.apiServerUrl}/Controller/Front/user/update`,User);
}
}

