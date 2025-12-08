export interface Prescription {
    id: number;
    patientName: string;
    patientAge: number;
    patientGender: string;
    prescriptionDate: Date;
    nextVisitDate: Date;
    diagnosis: string;
    medicines: string;
}

export interface Pageable {
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    offset: number;
    sort: string;
    unpaged: boolean;
}

export interface PrescriptionSummary  {
    id: number
    patientName: string;	
    patientAge: number; 
    prescriptionDate: Date;
}
