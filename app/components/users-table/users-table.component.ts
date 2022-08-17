import { UsersDataService } from 'src/app/sevices/users-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/data/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit, OnDestroy {

  public usersList?: User[] = [];

  private dataSubscribtions: Subscription[] = [];

  constructor(
    private dataService: UsersDataService,
  ) { }

  ngOnInit(): void {
    this.initUsersList();
  }

  onDeleteUserById(id: number): void {
    this.usersList = this.usersList?.filter((user) => {
      return user.id !== id;
    })
    this.dataSubscribtions.push(this.dataService.deleteUser(id).subscribe(res => {
      console.log("user", id, "deleted", res);
    }));
  }

  onShowUserDetails(user: User) {
    this.dataService.currentUser = user;
  }

  initUsersList() {
    if (!this.dataService.usersList.length || this.dataService.usersList.length === 1) {
      let addedUser: User | undefined = undefined;    // used for correct initializing of usersList after refreshing the "create-form" page
      if (this.dataService.usersList.length === 1) {
        addedUser = this.dataService.usersList[0];
      }

      this.dataSubscribtions.push(this.dataService.getUsersListFromBack()
        .subscribe(users => {
          this.dataService.usersList = users.map((user: any) => {
            return this.dataService.convertUser(user);
          });
          if (addedUser) this.dataService.usersList.push(addedUser)
          this.usersList = this.dataService.usersList;
        })
      )
    }
    this.usersList = this.dataService.usersList;
  }

  ngOnDestroy() {
    this.dataSubscribtions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}

