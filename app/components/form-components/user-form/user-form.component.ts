import { UsersDataService } from 'src/app/sevices/users-data.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, Subscription } from 'rxjs';
import { User } from 'src/app/data/user.model';
import { Router } from '@angular/router';

type pageModeType = 'edit' | 'view' | 'create';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {

  public isSaveButtonDisabled: boolean = false;
  public pageMode!: pageModeType;
  public newUserForm!: FormGroup;
  public currentUser!: User;

  private dataSubscribtions = new Subscription;

  constructor(
    private dataService: UsersDataService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initPageMode();
    this.initForm();
    if (this.pageMode !== "create") {
      this.initCurrentUser()
    };
    console.log(this.activeRoute);
  }

  private initPageMode(): void {
    this.pageMode = this.activeRoute.snapshot.data["mode"] as pageModeType;
  }

  private initCurrentUser(): void {
    let userId: number = Number(this.activeRoute.snapshot.params["id"]);

    this.dataService.getUserById(userId)
      .pipe(catchError(err => {
        this.router.navigate(["error404"])
        throw err;
      }))
      .subscribe(user => {
        this.currentUser = this.dataService.convertToUserModel(user);
        this.initFormValue();
      });
  }

  private initForm(): void {
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

  private initFormValue(): void {
    if (this.pageMode === 'edit' || this.pageMode === 'view') {
      this.newUserForm.patchValue(this.currentUser);
    };
    if (this.pageMode === 'view') {
      this.newUserForm.disable();
    };
  };

  onAddUser(): void {
    this.isSaveButtonDisabled = true;
    this.dataSubscribtions.add(
      this.dataService.add(this.newUserForm.value)
        .pipe(catchError(err => {
          this.isSaveButtonDisabled = false
          return err
        })).subscribe(() => {
          this.onNavigateToHomePage();
        }));
  };

  onChangeUserDetails() {
    this.isSaveButtonDisabled = true;
    this.currentUser = {
      id: this.currentUser.id,
      ...this.newUserForm.value
    };

    this.dataSubscribtions?.add(
      this.dataService.changeDetails(this.currentUser)
        .pipe(catchError(err => {
          this.isSaveButtonDisabled = false
          return err;
        })).subscribe(() => {
          this.onNavigateToHomePage();
        }));
  }

  onNavigateToHomePage() {
    this.isSaveButtonDisabled = false;
    this.router.navigate([""]);
  }

  ngOnDestroy() {
    this.dataSubscribtions.unsubscribe();
  }
}
