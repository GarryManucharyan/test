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
    this.dataSubscribtions.push(this.dataService.deleteUser(id).subscribe(() => {
      console.log("user", id, "deleted");
    }));
  }

  initUsersList() {
    this.dataSubscribtions.push(this.dataService.getUsersListFromBack()
      .subscribe(users => {
        this.usersList = users.map((user: any) => {
          return this.dataService.convertUser(user);
        });
      })
    )
  }

  ngOnDestroy() {
    this.dataSubscribtions.forEach((subscription) => {         // used as demonstrative method of unsubscribing
      subscription.unsubscribe();
    });
  }
}

