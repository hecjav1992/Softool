import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({providedIn:'root'})
export class AuthService{
 constructor(private http:HttpClient){}
 login(usuario:string,password:string){return this.http.post<any>(`${environment.apiUrl}/auth/login`,{usuario,password}).pipe(tap(r=>{localStorage.setItem('token',r.token);localStorage.setItem('nombre',r.nombre);}));}
 logout(){localStorage.clear();}
 isLogged(){return !!localStorage.getItem('token');}
 get nombre(){return localStorage.getItem('nombre')||'Usuario';}
}
