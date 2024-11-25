import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FormDataService {
  private apiUrl="http://localhost:3000/data";
  constructor(private http:HttpClient) {}

  createForm(formData:any):Observable<any>{
    return this.http.post<any>(this.apiUrl,formData);
  }

  getById(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`)
  }

  deleteForm(id:string):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
  }

  getAllForms():Observable<any[]>{
  return this.http.get<any[]>(this.apiUrl);  
  }

  updateForm(id:number,formData: any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${id}`,formData);
  }
   
}

