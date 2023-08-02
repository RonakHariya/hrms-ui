import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DesignationService } from '../../../services/designation.service';
import { Role } from '../../../models/role.model';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Designation } from '../../../models/designation.model';

@Component({
  selector: 'designation-role',
  templateUrl: './designation.form.component.html',
  styleUrls: ['./designation.form.component.scss'],
})
export class DesignationFormComponent {
  designationForm!: FormGroup;
  designation!: Designation;
  submitted: boolean = false;
  queryParams?: Params;
  actionLabel: string = 'Save';
  constructor(
    private formBuilder: FormBuilder,
    private designationService: DesignationService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.queryParams.subscribe((params) => {
      this.queryParams = params;
      if (this.queryParams['id'] == undefined) {
        //this.roleService.notify('Please select Id for the selected operation');
      }
      if (this.queryParams['id'] != undefined) {
        this.actionLabel = 'Update';
        this.getById(this.queryParams['id']);
      } else {
        this.actionLabel = 'Save';
      }
    });
  }

  initForm() {
    this.designationForm = this.formBuilder.group({
      id: [''],
      designationId: ['', Validators.required],
      designationName: [{ value: '', disabled: true }, Validators.required],
      designationDesc: [{ value: '', disabled: true }, Validators.required],
      orgCode: [{ value: '', disabled: true }, Validators.required],
      createdBy: ['Admin'],
      createdAt: [''],
      updatedBy: [''],
      updatedAt: [''],
      isDeleted: [false],
    });

    this.designationForm
      .get('designationId')
      ?.valueChanges.subscribe((value) => {
        if (value !== null && value !== '') {
          this.designationForm.get('designationName')?.enable();
        } else {
          this.designationForm.get('designationName')?.disable();
          this.designationForm.get('designationDesc')?.disable();
          this.designationForm.get('orgCode')?.disable();
        }
      });

    this.designationForm
      .get('designationName')
      ?.valueChanges.subscribe((value) => {
        if (value !== null && value !== '') {
          this.designationForm.get('designationDesc')?.enable();
        } else {
          this.designationForm.get('designationDesc')?.disable();
          this.designationForm.get('orgCode')?.disable();
        }
      });

    this.designationForm
      .get('designationDesc')
      ?.valueChanges.subscribe((value) => {
        if (value !== null && value !== '') {
          this.designationForm.get('orgCode')?.enable();
        } else {
          this.designationForm.get('orgCode')?.disable();
        }
      });
  }

  get designationIdControl() {
    return this.designationForm.get('designationId');
  }
  get designationNameControl() {
    return this.designationForm.get('designationName');
  }
  get designationDescControl() {
    return this.designationForm.get('designationDesc');
  }
  get orgControl() {
    return this.designationForm.get('orgCode');
  }
  onSumbit() {
    if (this.designationForm.valid) {
      const formData = this.designationForm.value;

      if (this.actionLabel === 'Save') {
        this.designationService.createDesignation(formData).subscribe(
          (response: Array<Designation>) => {
            console.log('POST-ROLE Request successful', response);
            this.router.navigate(['/master/designation']);
            this.designationService.notify('Designation Added successfully..!');
          },
          (error: any) => {
            console.error('POST Request failed', error);
          }
        );
      }
      if (this.actionLabel === 'Update') {
        this.designationService.updateDesignation(formData).subscribe(
          (response: Array<Designation>) => {
            console.log('PUT-ROLE Request successful', response);
            this.designationService.notify('Role Updated successfully..!');
            this.router.navigate(['/master/designation']);
          },
          (error: any) => {
            console.error('PUT Request failed', error);
          }
        );
      }
    }
  }

  getById(id: string) {
    this.designationService
      .searchDesignationById(id)
      .subscribe((response: Designation) => {
        console.log('GET-SEARCH BY ID Request successful', response);
        this.designationForm.patchValue(response);
        console.log(this.designationForm.value);
        this.designation = response;
      });
  }
}
