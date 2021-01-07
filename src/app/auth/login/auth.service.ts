import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public host=window.location.hostname;
  private isAuthentecated = false;
  private token: string;
  private tokenTimer : any;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) { }

getToken(){
    return this.token;
}
getIsAuth() {
    return this.isAuthentecated;
}
getUserId(){
    return localStorage.getItem("userId");
}

getAuthStatusListener(){
    return this.authStatusListener.asObservable();
}

logIn(email: string, password: string) {
    this.http.post<any>("http://"+this.host+":3000/api/signin",{email,password})
    .subscribe(response => {
       const token = response.token;
       this.token = token;
       this.authStatusListener.next(true);
      if(token){
        const expiresInDuration = response .expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthentecated = true;
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token, response, expirationDate,);
            setTimeout((router : Router) => {this.router.navigate(['/dashboard']);} , 500);
      }
    });
}
autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation) {
        return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationData.getTime() - now.getTime();
    if(expiresIn > 0) {
        this.token = authInformation.token;
        this.isAuthentecated = true;
        this.setAuthTimer(expiresIn / 1000);
        this.authStatusListener.next(true);
    }
}

logOut() {
    this.token = null;
    this.isAuthentecated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
}    

private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
        this.logOut();
    }, duration * 1000);
}

private saveAuthData(token: string, response:any, expirationData: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationData.toISOString());
    localStorage.setItem('response', JSON.stringify(response));
}

private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("projectId");
    localStorage.removeItem("userId");
    localStorage.removeItem("response");
}

private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if(!token || !expirationDate) {
        return;
    }
    return {
        token: token,
        expirationData: new Date(expirationDate)
    }
}

}
