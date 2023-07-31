import { Component, EventEmitter, Output } from '@angular/core';
import { Role } from '../../../../models/role.model';
import { RoleService } from '../../../../services/role.service';
import { ColumnsMetadata } from '../../../../models/columnMetaData';
import { Data, Router } from '@angular/router';
import { PopupContentComponent } from '../../../popup-content/popup-content.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiResponse } from 'src/app/modules/master/models/response';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent {
  roleMetaData: { content: Array<Role>; totalElements: number } = {
    content: [],
    totalElements: 0,
  };
  roleHeaders: { columnsMetadata: Array<ColumnsMetadata> } = {
    columnsMetadata: [],
  };

  role!: Role;
  @Output() sendDataEvnt = new EventEmitter<number>();

  constructor(
    private roleService: RoleService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //this.getData();
    this.getHeaders();
    let params = new HttpParams();
    params = params.set('page', 0);
    params = params.set('size', 10);
    this.searchFunction(params);
  }

  getHeaders() {
    this.roleService.getRolesHeaders().subscribe(
      (response: { columnsMetadata: Array<ColumnsMetadata> }) => {
        console.log('GET-HEADERS Request successful', response);
        this.roleHeaders = response;
        console.log(this.roleHeaders);
      },
      (error: any) => {
        console.error('GET Request failed', error);
      }
    );
  }

  action(event: Data) {
    let type: string = event['event'];
    let id: string = event['data'].roleId;
    const queryParam = { id: id };
    switch (type) {
      case 'delete':
        this.roleService.deleteRole(event['data'].roleId).subscribe(
          (response: ApiResponse) => {
            console.log('DELETE-ROLE Request successful', response);
            this.openPopup('Role Deleted successfully..');
            this.router.navigate(['/master/role']);
          },
          (error: any) => {
            console.error('DELETE-ROLE Request failed', error);
          }
        );
        break;
      case 'add':
        this.router.navigate(['/master/roleForm']);
        break;

      case 'edit':
        this.router.navigate(['/master/roleForm'], { queryParams: queryParam });
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

  searchFunction(event: HttpParams) {
    this.roleService
      .search(event)
      .subscribe((data: { content: Array<Role>; totalElements: number }) => {
        console.log(data.content);
        console.log(data.totalElements);
        this.roleMetaData = data;
      });
  }
}
