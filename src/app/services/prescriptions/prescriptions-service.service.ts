import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prescription, PrescriptionSummary } from '../../models/prescription.model';
import { PRESCRIPTION_ENDPOINTS } from './api/prescriptions.api.endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionsServiceService {
  
  private readonly BASE_URL = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  createPrescription(request: Prescription) {
    return this.http.post<any>( `${ this.BASE_URL }${ PRESCRIPTION_ENDPOINTS.CREATE }`, request );
  }

  getAllPrescriptions(page: number, size: number): Observable<any> {
    const params = {
      page: page.toString(),
      size: size.toString()
    };
    return this.http.get<any>(`${this.BASE_URL}${PRESCRIPTION_ENDPOINTS.GET_ALL}`, { params });
  }

  getAllPrescriptionsByDateRange(fromDate: Date, toDate: Date, page: number, size: number): Observable<any> {
    const params = {
      fromDate: fromDate.toISOString(),
      toDate: toDate.toISOString(),
      page: page.toString(),
      size: size.toString()
    };
    return this.http.get<any>(`${this.BASE_URL}${PRESCRIPTION_ENDPOINTS.GET_ALL}`, { params });
  }

  getPrescriptionById(id: number) {
    return this.http.get<Prescription>(`${this.BASE_URL}${PRESCRIPTION_ENDPOINTS.GET_BY_ID.replace('{id}', id.toString())}`);
  }

  updatePrescription(id: string) {
    return this.http.put<any>(`${this.BASE_URL}${PRESCRIPTION_ENDPOINTS.UPDATE.replace('{id}', id)}`, {});
  }

  deletePrescription(id: string) {
    return this.http.delete<any>(`${this.BASE_URL}${PRESCRIPTION_ENDPOINTS.DELETE.replace('{id}', id)}`);
  }
}
