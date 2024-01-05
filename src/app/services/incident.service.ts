import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Incident } from '../Model/Incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private apiServerUrl =environment.apiBaseUrl ;
  constructor(private httpclient:HttpClient) { }
  public getIncidents():Observable<Incident[]>{
   return this.httpclient.get<Incident[]>(`${this.apiServerUrl}/Controller/Front/Incidents`)
  }
  public deleteIncident(incident:number) : Observable<void>
  {
    return this.httpclient.delete<void>(`${this.apiServerUrl}/Controller/Dashboard/Incident/delete/${incident}`); //done
}
public addIncident(Incident:Incident) : Observable<Incident>
{
  return this.httpclient.post<Incident>(`${this.apiServerUrl}/Controller/Dashboard/Incident/save`,Incident);
}
public updateIncident(Incident:Incident) : Observable<Incident>
{
  return this.httpclient.put<Incident>(`${this.apiServerUrl}/Controller/Dashboard/Incident/update`,Incident);
}
}
