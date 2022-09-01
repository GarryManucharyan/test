import { PaginatorComponent } from '../paginator/paginator.component';
import { UsersDataService } from 'src/app/sevices/users-data.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { User } from 'src/app/data/user.model';
import { ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit, OnDestroy {

  @ViewChild(PaginatorComponent)
  private paginator!: PaginatorComponent

  public usersList: User[] = [];

  @Input()
  public columns!: { propName: string, heading: string }[];
  public currentPage: number = 1;

  private dataSubscribtions: Subscription[] = [];

  constructor(private dataService: UsersDataService,) { }

  ngOnInit(): void {
    this.initUsersList(this.currentPage);
  };

  onDeleteUserById(id: number): void {
    this.usersList = this.usersList?.filter((user) => {
      return user.id !== id;
    })
    this.dataSubscribtions.push(this.dataService.delete(id).subscribe(() => {
      console.warn("user", id, "deleted");
      this.initUsersList(this.paginator.currentPage, this.paginator.pageCount)
    }),
    );
  };

  initUsersList(currentPage: number, pageCount: number = 10): void {
    this.dataSubscribtions.push(this.dataService.getUsers(currentPage, pageCount).subscribe(users => {
      this.usersList = users
    }));
  }

  onPageChange(pageInitData: { pageNumber: number, pageCount: number }) {
    this.currentPage = pageInitData.pageNumber;
    this.initUsersList(pageInitData.pageNumber, pageInitData.pageCount);
  }


  ngOnDestroy() {
    this.dataSubscribtions.forEach(subscription => subscription.unsubscribe());
  }
}

