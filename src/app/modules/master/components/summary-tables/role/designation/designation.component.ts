import { Component } from '@angular/core';
import { Designation } from 'src/app/modules/master/models/designation.model';
import { ColumnsMetadata } from 'src/app/modules/master/models/columnMetaData';
import { DesignationService } from 'src/app/modules/master/services/designation.service';
import { Data, Router } from '@angular/router';
import { ApiResponse } from 'src/app/modules/master/models/response';
import { MatDialog } from '@angular/material/dialog';
import { PopupContentComponent } from '../../../popup-content/popup-content.component';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss'],
})
export class DesignationComponent {
  designationList!: Array<Designation>;

  designationHeaders: { columnsMetadata: Array<ColumnsMetadata> } = {
    columnsMetadata: [],
  };

  data: { event: string; data: {} } = {
    event: '',
    data: Array<Designation>,
  };
  constructor(
    private designationService: DesignationService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getData();
    this.getHeaders();
  }

  getData() {
    this.designationService.getDesignations().subscribe(
      (response: Array<Designation>) => {
        console.log('GET-DESIGNATION Request successful', response);
        this.designationList = response;
      },
      (error: any) => {
        console.error('GET Request failed', error);
      }
    );
  }

  getHeaders() {
    this.designationService.getDesignationHeaders().subscribe(
      (response: { columnsMetadata: Array<ColumnsMetadata> }) => {
        console.log('GET-HEADERS Request successful', response);
        this.designationHeaders = response;
        console.log(this.designationHeaders);
      },
      (error: any) => {
        console.error('GET Request failed', error);
      }
    );
  }

  action(event: Data) {
    let type: string = event['event'];
    switch (type) {
      case 'delete':
        this.designationService
          .deleteDesignation(event['data'].designationId)
          .subscribe(
            (response: ApiResponse) => {
              console.log('DELETE-ROLE Request successful', response);
              this.openPopup('Role deleted successfully!!');
              this.router.navigate(['/master/role']);
            },
            (error: any) => {
              console.error('DELETE-ROLE Request failed', error);
            }
          );

        break;
      case 'add':
        this.router.navigate(['/master/designationForm']);
        break;

      case 'edit':
        let id: string = event['data'].designationId;
        const queryParam = { id: id };
        this.router.navigate(['/master/designationForm'], {
          queryParams: queryParam,
        });
        break;
    }
  }

  openPopup(message: string) {
    this.dialog.open(PopupContentComponent, {
      width: '600px',
      height: '200px',
      data: { message: message },
    });
  }
}
