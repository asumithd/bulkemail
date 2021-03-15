import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

interface TokenResponse {
  token: string;
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private loginDisplay = new Subject<any>();

  constructor(
    private http: HttpClient) { }

  getData(url) {
    return this.http.get(url).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  callOtpService(url){
    return this.http.get(url).pipe(distinctUntilChanged());
  }

  postData(url, data) {
    return this.http.post(url, data).pipe(
      map((datas: any) => {
        return datas;
      })
    );
  }

  update(url, data) {
    return this.http.put(url, data).pipe(
      map((datas: any) => {
        return datas;
      })
    );
  }

  delete(url) {
    return this.http.delete(url);
  }


  getLoginModal(): Observable<any> {
    return this.loginDisplay.asObservable();
  }

  setLoginModal(val) {
    this.loginDisplay.next(val);
  }
 
}
