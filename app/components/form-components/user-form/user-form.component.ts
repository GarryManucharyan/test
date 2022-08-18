import { UsersDataService } from 'src/app/sevices/users-data.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User, userDataFromBack } from 'src/app/data/user.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

type pageModeType = 'edit' | 'view' | 'create';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {

  public isSaveButtonDisabled: boolean = false;
  public pageMode: pageModeType = 'create';
  public currentUser: User = new User();
  public newUserForm!: FormGroup;

  private dataSubscribtions = new Subscription;

  constructor(
    private dataService: UsersDataService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.activeRoute.snapshot.url[0].path !== "create") this.initCurrentUser();
    this.initPageMode();
    this.initForm();
  }

  private initPageMode() {
    this.pageMode = this.activeRoute.snapshot.url[0].path as pageModeType;
  }

  private initCurrentUser() {
    let idInUrl = +this.activeRoute.snapshot.params["id"];

    this, this.dataSubscribtions.add(this.dataService.getUsersListFromBack().subscribe(users => {
      let userFromBack: userDataFromBack | undefined = users.find((user) => {
        return user.id === idInUrl;
      });

      if (userFromBack) {
        this.currentUser = this.dataService.convertUser(userFromBack);
        this.initFormValue();
      } else this.router.navigate(["error404"])
    }))
  }

  private initForm() {
    this.newUserForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z]+$')
      ]
      ],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z]+$')
      ]
      ],
      userName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]
      ],
    });
  };

  private initFormValue() {
    if (this.pageMode === 'edit' || this.pageMode === 'view') {
      console.log(this.currentUser);
      this.newUserForm.patchValue(this.currentUser);
    };
    if (this.pageMode === 'view') {
      this.newUserForm.disable();
    };
  };

  onAddUser(): void {
    this.isSaveButtonDisabled = true;
    this.currentUser = this.newUserForm.value;
    this.dataSubscribtions.add(this.dataService.addUser(this.currentUser).subscribe(() => {
      this.onNavigateToHomePage();
    }));
  };

  onChangeUserDetails(formValue: { firstName: string; lastName: string, userName: string }) {
    this.isSaveButtonDisabled = true;
    const { firstName, lastName, userName } = formValue;
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
    this.currentUser.userName = userName;
    this.currentUser = {
      id: this.currentUser.id,
      ...this.newUserForm.value
    };

    this.dataSubscribtions?.add(this.dataService.changeUser(this.currentUser).subscribe(() => {
      this.onNavigateToHomePage();
    }));
  }

  onNavigateToHomePage() {
    this.isSaveButtonDisabled = false;
    this.router.navigate([""]);
  }

  ngOnDestroy() {
    this.dataSubscribtions?.unsubscribe();
  }
}
