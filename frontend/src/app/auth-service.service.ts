import { HttpClient } from '@angular/common/http';

export class AuthServiceService {
  private loginUrl = ' http://127.0.0.1:8000/user/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(this.loginUrl, { username, password });
  }

 /
}
