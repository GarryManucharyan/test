import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { UsersDataService } from 'src/app/sevices/users-data.service';
import { User, userResponseModel } from 'src/app/data/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit, OnDestroy, OnChanges {


  public usersLimit: number = this.dataService.bufferSize;
  public usersList: User[] = [];

  @Input()
  public columns!: { propName: string, heading: string }[];
  public currentPage: number = 1;

  private dataSubscribtions: Subscription[] = [];

  constructor(
    private dataService: UsersDataService,
  ) { }

  ngOnInit(): void {
    this.initUsersList(this.currentPage);
  };

  onDeleteUserById(id: number): void {
    this.usersList = this.usersList?.filter((user) => {
      return user.id !== id;
    })
    this.dataSubscribtions.push(this.dataService.delete(id).subscribe(() => {
      console.warn("user", id, "deleted");
    }),
      this.dataService.getUsers().subscribe(users => {
        this.dataService.isAbleAddUser = users.length < this.dataService.maxUsersCount;
      }));      //   all users list getted just for correct working of "add-user-guard"  
  };

  initUsersList(currentPage?: number): void {
    this.usersLimit = this.dataService.bufferSize
    this.dataSubscribtions.push(this.dataService.getUsers(currentPage, this.usersLimit).subscribe(users => {
      this.usersList = users.map((user: userResponseModel) => {
        return this.dataService.convertToUserModel(user);
      });
    }));
  };

  initCurrentPage(pageNum: number) {
    this.currentPage = pageNum,
      this.initUsersList(pageNum)
  }

  ngOnChanges() {
    // TODO:
    this.initUsersList(this.currentPage)
  }

  ngOnDestroy() {
    this.dataSubscribtions.forEach(subscription => subscription.unsubscribe());
  }
}

