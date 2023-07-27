import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ColumnsMetadata } from '../models/columnMetaData';
import { Designation } from '../models/designation.model';
import { ApiResponse } from '../models/response';
@Injectable()
export class DesignationService {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getDesignations(): Observable<Array<Designation>> {
    return this.http.get<Array<Designation>>(
      'http://localhost:8080/designation/get-all'
    );
  }

  getDesignationHeaders(): Observable<{
    columnsMetadata: Array<ColumnsMetadata>;
  }> {
    return this.http.get<{ columnsMetadata: Array<ColumnsMetadata> }>(
      'http://localhost:8080/data-table-metadata/designation'
    );
  }

  createDesignation(data: Designation): Observable<Array<Designation>> {
    return this.http.post<Array<Designation>>(
      'http://localhost:8080/employee/designation/create',
      data
    );
  }

  searchDesignationById(id: string): Observable<Designation> {
    return this.http.get<Designation>(
      'http://localhost:8080/designation/' + id
    );
  }
  updateDesignation(data: Designation): Observable<Array<Designation>> {
    return this.http.put<Array<Designation>>(
      'http://localhost:8080/employee/designation/update',
      data
    );
  }

  deleteDesignation(designationId: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(
      'http://localhost:8080/employee/designation/delete/' + designationId
    );
  }
}
