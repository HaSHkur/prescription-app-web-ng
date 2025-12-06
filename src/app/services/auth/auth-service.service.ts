import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, RegistrationRequest, UserDomain } from '../../models/auth.model';
import { Observable } from 'rxjs';
import { AUTH_ENDPOINTS } from './api/auth.api.endpoints';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private readonly BASE_URL = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  register(request: RegistrationRequest): Observable<UserDomain> {
    return this.http.post<UserDomain>(`${this.BASE_URL}${AUTH_ENDPOINTS.REGISTER}`, request);
  }

  login(request: LoginRequest): Observable<Record<string, string>> {
    return this.http.post<Record<string, string>>(`${this.BASE_URL}${AUTH_ENDPOINTS.LOGIN}`, request);
  }
}
