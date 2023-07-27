import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnsMetadata } from 'src/app/modules/master/models/columnMetaData';
import { Pagination } from 'src/app/modules/master/models/pageable';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
})
export class DatatableComponent implements OnInit {
  @Input() dataSource!: Array<Object>;
  @Input() headers!: Array<ColumnsMetadata>;
  @Output() buttonFunction: EventEmitter<Object> = new EventEmitter();
  @Output() paginationParams: EventEmitter<HttpParams> = new EventEmitter();
  selectedValue!: Object;
  searchTerm!: string;
  pagination: Pagination = { pageSize: 10, pageNumber: 0 };
  constructor() {}

  ngOnInit(): void {
    this.searchFunction();
  }

  getValue(rowObj: any, mappedBy: String) {
    const myArray = mappedBy.split('.');

    let value = rowObj[myArray[0]];

    if (value != null) {
      for (let i = 1; i < myArray.length; i++) {
        value = value[myArray[i]];
      }
    } else {
      value = '';
    }
    return value;
  }

  searchFunction() {
    console.log('ready to emit');
    this.pagination.serchingParmeter = this.searchTerm;
    this.setHttpParams();
  }
  radioButtonEvent(rowData: Object) {
    this.selectedValue = rowData;
    console.log(this.selectedValue.valueOf());
  }

  buttonEvent(event: string) {
    let data = { event: event, data: {} };
    switch (event) {
      case 'add':
        return this.buttonFunction.emit(data);
        break;
      case 'edit':
        data.data = this.selectedValue;
        return this.buttonFunction.emit(data);
        break;
      case 'delete':
        data.data = this.selectedValue;
        return this.buttonFunction.emit(data);
        break;
    }
  }

  setHttpParams() {
    let params = new HttpParams();
    params = params.set('page', this.pagination.pageNumber);
    params = params.set('size', this.pagination.pageSize);
    this.pagination.sortKey
      ? (params = params.set('sort', this.pagination.sortKey!))
      : true;
    this.pagination.sortType
      ? (params = params.set('sort', this.pagination.sortType!))
      : true;
    this.pagination.serchingParmeter
      ? (params = params.set('search', this.pagination.serchingParmeter!))
      : true;

    this.paginationParams.emit(params);
  }
}
