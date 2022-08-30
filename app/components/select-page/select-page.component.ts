import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsersDataService } from 'src/app/sevices/users-data.service';

@Component({
  selector: 'app-select-page',
  templateUrl: './select-page.component.html',
  styleUrls: ['./select-page.component.scss']
})
export class SelectPageComponent implements OnInit {

  public currentPage: number = 1;

  constructor(private dataService: UsersDataService) { }

  @Output()
  clickedAnyButton = new EventEmitter()

  ngOnInit(): void {
  }

  onChangePage(newPage: number): void {
    this.currentPage = newPage
    this.clickedAnyButton.emit(newPage);
  }

  onChangeBufferSize($event: any) {
    this.dataService.bufferSize = $event.target.value;
    this.clickedAnyButton.emit(this.currentPage)
  }
}
