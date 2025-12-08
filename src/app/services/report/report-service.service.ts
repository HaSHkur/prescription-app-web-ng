import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { REPORT_ENDPOINTS } from './api/report.api.endpoints';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  private readonly BASE_URL = 'http://localhost:8080/api/v1';


  constructor(private http: HttpClient) { }
  countPrescriptions() {
    return this.http.get<any>(`${this.BASE_URL}${REPORT_ENDPOINTS.COUNT}`);
  }

  countPrescriptionsByDate(date: string) {
    const params = { date };
    return this.http.get<any>(`${this.BASE_URL}${REPORT_ENDPOINTS.COUNT}`, { params });
  }
}
