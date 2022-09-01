import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {
  public currentPage: number = 1;
  public pageCount: number = 10;
  public isNextBtnDisabled: boolean = false;

  @Input()
  public currentListLength!: number;

  constructor() { }

  @Output()
  pageChange = new EventEmitter();

  ngOnChanges() {
    this.isNextBtnDisabled = this.currentListLength < this.pageCount
  }

  onChangePage(newPage: number): void {
    this.currentPage = newPage;
    this.pageChange.emit({
      pageNumber: this.currentPage,
      pageCount: this.pageCount
    });
  }

  onChangepageCount(event: any) {
    this.pageCount = event.target.value;
    this.currentPage = 1;
    this.pageChange.emit({
      pageNumber: this.currentPage,
      pageCount: this.pageCount
    });
  }
}
