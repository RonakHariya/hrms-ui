import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';
import { ColumnsMetadata } from '../models/columnMetaData';
import { Grade } from '../models/grade.model';
@Injectable()
export class GradeService {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getGrades(): Observable<Array<Grade>> {
    return this.http.get<Array<Grade>>(
      'http://localhost:8080/employee/grade/get-all'
    );
  }

  getGradesHeaders(): Observable<{ columnsMetadata: Array<ColumnsMetadata> }> {
    return this.http.get<{ columnsMetadata: Array<ColumnsMetadata> }>(
      'http://localhost:8080/data-table-metadata/grade'
    );
  }

  createGrade(data: Grade): Observable<Array<Grade>> {
    return this.http.post<Array<Grade>>(
      'http://localhost:8080/employee/grade/create',
      data
    );
  }

  updateGrade(data: Role): Observable<Array<Role>> {
    return this.http.put<Array<Role>>(
      'http://localhost:8080/employee/role/update',
      data
    );
  }

  deleteGrade(roleId: string): Observable<string> {
    return this.http.delete<string>(
      'http://localhost:8080/employee/role/delete/' + roleId
    );
  }
}
