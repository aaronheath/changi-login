import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {CurrentUserApiResponse, LoginApiResponse, User} from './auth.interface';

@Injectable()
export class AuthService {
  protected currentUser: User;
  protected csrfToken: string;

  constructor(private http: HttpClient) {
    this.fetchCurrentUser().subscribe((response) => {
      this.csrfToken = response.csrf_token ? response.csrf_token : response.data.csrf_token;

      if(response.data) {
        this.currentUser = response.data.user;
      }
    });
  }

  fetchCurrentUser(): Observable<CurrentUserApiResponse> {
    return this.http
      .get<CurrentUserApiResponse>(`https://${environment.apiUrl}/user`, this.options());
  }

  login(email: string, password: string): Observable<LoginApiResponse> {
    return this.http.post<LoginApiResponse>(
      `https://${environment.apiUrl}/login`,
      {email, password},
      this.options()
    );
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  protected options(options: object = {}): Object {
    const common: any = {withCredentials: true};

    if(this.csrfToken) {
      common.headers = new HttpHeaders({'X-CSRF-TOKEN': this.csrfToken});
    }

    return Object.assign(common, options);
  }
}
