import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-wrapper',
  templateUrl: './table-wrapper.component.html',
  styleUrls: ['./table-wrapper.component.scss']
})
export class TableWrapperComponent implements OnInit {

  constructor() { }

  public tableData: { propName: string, heading: string }[] = [
    { propName: 'firstName', heading: 'First Name' },
    { propName: 'lastName', heading: 'Last Name' },
    { propName: 'userName', heading: 'Username' },
    { propName: 'id', heading: 'ID' }
  ]

  ngOnInit(): void {
  }

}
