import { UsersDataService } from 'src/app/sevices/users-data.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { User, userResponseModel } from 'src/app/data/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit, OnDestroy {

  public usersList?: User[] = [];

  @Input()
  public columns!: { propName: string, heading: string }[];

  private dataSubscribtions: Subscription[] = [];

  constructor(
    private dataService: UsersDataService,
  ) { }

  ngOnInit(): void {
    this.initUsersList();
  };

  onDeleteUserById(id: number): void {
    this.usersList = this.usersList?.filter((user) => {
      return user.id !== id;
    })
    this.dataSubscribtions.push(this.dataService.delete(id).subscribe(() => {
      console.warn("user", id, "deleted");
    }));
  };

  initUsersList(): void {
    this.dataSubscribtions.push(this.dataService.getUsers().subscribe(users => {
      this.usersList = users.map((user: userResponseModel) => {
        return this.dataService.convertToUserModel(user);
      });
    }));
  };

  ngOnDestroy() {
    this.dataSubscribtions.forEach(subscription => subscription.unsubscribe());
  }
}

