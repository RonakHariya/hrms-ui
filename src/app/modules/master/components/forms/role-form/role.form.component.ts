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
      roleName: [{ value: '', disabled: true }, Validators.required],
      orgCode: [{ value: '', disabled: true }, Validators.required],
      createdBy: ['Admin'],
    });

    this.roleForm.get('roleId')?.valueChanges.subscribe((value) => {
      if (value !== null && value !== '') {
        this.roleForm.get('roleName')?.enable();
      } else {
        this.roleForm.get('roleName')?.disable();
        this.roleForm.get('orgCode')?.disable();
      }
    });

    this.roleForm.get('roleName')?.valueChanges.subscribe((value) => {
      if (value !== null && value !== '') {
        this.roleForm.get('orgCode')?.enable();
      } else {
        this.roleForm.get('orgCode')?.disable();
      }
    });
  }

  get roleIdControl() {
    return this.roleForm.get('roleId');
  }
  get roleNameControl() {
    return this.roleForm.get('roleName');
  }
  get orgControl() {
    return this.roleForm.get('orgCode');
  }
  onSumbit() {
    if (this.roleForm.valid) {
      const formData = this.roleForm.value;

      if (this.actionLabel === 'Save') {
        this.roleService.createRole(formData).subscribe(
          (response: Array<Role>) => {
            console.log('POST-ROLE Request successful', response);
            this.router.navigate(['/master/role']);
            this.roleService.notify('Role Added successfully..!');
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
            this.roleService.notify('Role Updated successfully..!');
            this.router.navigate(['/master/role']);
          },
          (error: any) => {
            console.error('PUT Request failed', error);
          }
        );
      }
    }
  }

  getById(id: string) {
    this.roleService.searchRoleById(id).subscribe((response: Role) => {
      console.log('GET-SEARCH BY ID Request successful', response);
      this.roleForm.patchValue(response);
      this.role = response;
    });
  }
}
