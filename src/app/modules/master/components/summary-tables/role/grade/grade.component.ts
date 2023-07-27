import { Component } from '@angular/core';
import { ColumnsMetadata } from 'src/app/modules/master/models/columnMetaData';
import { Grade } from 'src/app/modules/master/models/grade.model';
import { GradeService } from 'src/app/modules/master/services/grade.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss'],
})
export class GradeComponent {
  gradesList!: Array<Grade>;
  gradesHeaders: { columnsMetadata: Array<ColumnsMetadata> } = {
    columnsMetadata: [],
  };
  constructor(private gradeService: GradeService) {}

  ngOnInit(): void {
    this.getData();
    this.getHeaders();
  }

  getData() {
    this.gradeService.getGrades().subscribe(
      (response: Array<Grade>) => {
        console.log('GET-ROLES Request successful', response);
        this.gradesList = response;
      },
      (error: any) => {
        console.error('GET Request failed', error);
      }
    );
  }

  getHeaders() {
    this.gradeService.getGradesHeaders().subscribe(
      (response: { columnsMetadata: Array<ColumnsMetadata> }) => {
        console.log('GET-HEADERS Request successful', response);
        this.gradesHeaders = response;
        console.log(this.gradesHeaders);
      },
      (error: any) => {
        console.error('GET Request failed', error);
      }
    );
  }
  action(event: Object) {
    alert(JSON.stringify(event));
  }
}
