import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  constructor() { }

  public tableData: { propName: string, heading: string }[] = [
    { propName: 'firstName', heading: 'First Name' },
    { propName: 'lastName', heading: 'Last Name' },
    // { propName: 'userName', heading: 'Username' },
    // { propName: 'id', heading: 'ID' }
  ]

  ngOnInit(): void {
  }

}
