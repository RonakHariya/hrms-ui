import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MasterRoutingModule } from './master-routing.module';
import { RoleComponent } from './components/summary-tables/role/role/role.component';
import { DesignationComponent } from './components/summary-tables/role/designation/designation.component';
import { SharedModule } from '../shared/shared.module';
import { GradeComponent } from './components/summary-tables/role/grade/grade.component';
import { DivisionComponent } from './components/summary-tables/role/division/division.component';
import { DepartmentComponent } from './components/summary-tables/role/department/department.component';
import { EmployeeTypeComponent } from './components/summary-tables/role/employee-type/employee-type.component';
import { RoleFormComponent } from './components/forms/role-form/role.form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleService } from './services/role.service';
import { DesignationService } from './services/designation.service';
import { GradeService } from './services/grade.service';
import { PopupContentComponent } from './components/popup-content/popup-content.component';
import { DesignationFormComponent } from './components/forms/designation/designation.form.component';

@NgModule({
  declarations: [
    RoleComponent,
    DesignationComponent,
    GradeComponent,
    DivisionComponent,
    DepartmentComponent,
    EmployeeTypeComponent,
    RoleFormComponent,
    PopupContentComponent,
    DesignationFormComponent,
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [RoleService, DesignationService, GradeService],
})
export class MasterModule {}
