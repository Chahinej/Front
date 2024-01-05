import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Machine } from '../Model/machine';

@Injectable({
  providedIn: 'root'
})
export class MachineService {
private apiServerUrl =environment.apiBaseUrl ;
  constructor(private httpclient:HttpClient) { }
  public getMachines() : Observable<Machine[]>{
    return this.httpclient.get<Machine[]>(`${this.apiServerUrl}/Controller/Dashboard/Machines`);
  }
  public deleteMachine(machine:number) : Observable<void>
  {
    return this.httpclient.delete<void>(`${this.apiServerUrl}/Controller/Dashboard/Machine/delete/${machine}`);
}
public addMachine(machine:Machine) : Observable<Machine>
{
  return this.httpclient.post<Machine>(`${this.apiServerUrl}/Controller/Dashboard/Machine/save`,machine);
}
public updateMachine(machine:Machine) : Observable<Machine>
{
  return this.httpclient.put<Machine>(`${this.apiServerUrl}/Controller/Dashboard/Machine/update`,machine);
}

}
