import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Declaration } from '../Model/Declaration';

@Injectable({
  providedIn: 'root'
})
export class DeclarationService {
  private apiServerUrl =environment.apiBaseUrl ;
  constructor(private httpclient:HttpClient) { }
  public getDeclarations() : Observable<Declaration[]>{
    return this.httpclient.get<Declaration[]>(`${this.apiServerUrl}/Controller/Dashboard/Declarations`);
  }
  public deleteDeclaration(declaration:number) : Observable<void>
  {
    return this.httpclient.delete<void>(`${this.apiServerUrl}/Controller/Front/Declaration/delete/${declaration}`);//change link
}
public addDeclaration(Declaration:Declaration) : Observable<Declaration>
{
  return this.httpclient.post<Declaration>(`${this.apiServerUrl}/Controller/Front/Declaration/save`,Declaration);
}
public updateDeclaration(Declaration:Declaration) : Observable<Declaration>
{
  return this.httpclient.put<Declaration>(`${this.apiServerUrl}/Controller/Front/Declaration/update`,Declaration);
}

}
