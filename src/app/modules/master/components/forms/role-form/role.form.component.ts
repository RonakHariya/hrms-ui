import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RoleService } from '../../../services/role.service';
import { Role } from '../../../models/role.model';
import { MatDialog } from '@angular/material/dialog';
import { PopupContentComponent } from '../../popup-content/popup-content.component';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'role-form',
  templateUrl: './role.form.component.html',
  styleUrls: ['./role.form.component.scss'],
})
export class RoleFormComponent {
  roleForm!: FormGroup;
  role!: Role;
  submitted: boolean = false;
  queryParams?: Params;
  actionLabel: string = 'Save';
  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.queryParams.subscribe((params) => {
      this.queryParams = params;
      if (this.queryParams['id'] != undefined) {
        this.actionLabel = 'Update';
        this.getById(this.queryParams['id']);
      } else {
        this.actionLabel = 'Save';
      }
    });
  }

  initForm() {
    this.roleForm = this.formBuilder.group({
      id: [''],
      roleId: ['', Validators.required],
      roleName: ['', Validators.required],
      orgCode: ['', Validators.required],
      createdBy: ['Admin'],
    });
  }

  onSumbit() {
    if (this.roleForm.valid) {
      const formData = this.roleForm.value;

      if (this.actionLabel === 'Save') {
        this.roleService.createRole(formData).subscribe(
          (response: Array<Role>) => {
            console.log('POST-ROLE Request successful', response);
            this.openPopup('Role Addes successfully..!');
            this.router.navigate(['/master/role']);
          },
          (error: any) => {
            console.error('POST Request failed', error);
          }
        );
      }
      if (this.actionLabel === 'Update') {
        this.roleService.updateRole(formData).subscribe(
          (response: Array<Role>) => {
            console.log('PUT-ROLE Request successful', response);
            //this.openPopup('Role updated successfully..!');
            //this.router.navigate(['/master/role']);
          },
          (error: any) => {
            console.error('PUT Request failed', error);
          }
        );
      }
    }
  }

  openPopup(message: string) {
    this.dialog.open(PopupContentComponent, {
      width: '600px',
      height: '200px',
      data: { message: message },
    });
  }

  getById(id: string) {
    this.roleService.searchRoleById(id).subscribe((response: Role) => {
      console.log('GET-SEARCH BY ID Request successful', response);
      this.roleForm.patchValue(response);
      this.role = response;
    });
  }
}
