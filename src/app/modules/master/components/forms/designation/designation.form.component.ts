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
import { PopupContentComponent } from '../../popup-content/popup-content.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Designation } from '../../../models/designation.model';

@Component({
  selector: 'designation-role',
  templateUrl: './designation.form.component.html',
  styleUrls: ['./designation.form.component.scss'],
})
export class DesignationFormComponent {
  designationForm!: FormGroup;
  role!: Role;
  submitted = false;
  queryParams?: Params;

  constructor(
    private formBuilder: FormBuilder,
    private designationService: DesignationService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.sample();
  }

  initForm() {
    this.designationForm = this.formBuilder.group({
      designationId: ['', Validators.required],
      designationName: ['', Validators.required],
      designationDesc: ['', Validators.required],
      createdBy: ['Admin'],
    });
  }

  onSumbit() {
    if (this.designationForm.valid) {
      const formData = this.designationForm.value;

      this.designationService.createDesignation(formData).subscribe(
        (response: Array<Designation>) => {
          console.log('POST-ROLE Request successful', response);
          this.openPopup('Designation Added successfully..!');
          this.router.navigate(['/master/designation']);
        },
        (error: any) => {
          console.error('POST Request failed', error);
        }
      );
    }
  }

  openPopup(message: string) {
    this.dialog.open(PopupContentComponent, {
      width: '600px',
      height: '200px',
      data: { message: message },
    });
  }

  sample() {
    this.route.queryParams.subscribe((params) => {
      this.queryParams = params;
      // Do something with the queryParams here
      console.log(this.queryParams['id']);
      this.designationService
        .searchDesignationById(this.queryParams['id'])
        .subscribe((response: Designation) => {
          console.log('GET-SEARCH BY ID Request successful', response);
          this.designationForm.patchValue(response);
        });
    });
  }
}

/*
  
          */
