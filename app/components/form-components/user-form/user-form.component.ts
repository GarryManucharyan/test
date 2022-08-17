import { UsersDataService } from 'src/app/sevices/users-data.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/data/user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

type modeType = 'edit' | 'view' | 'create';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {
  
  public pageMode: modeType = 'create';
  public currentUser: User = new User();
  public newUserForm!: FormGroup;
  public isSaveButtonDisabled: boolean = false

  private dataSubscribtion = new Subscription;

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
    this.pageMode = this.activeRoute.snapshot.url[0].path as modeType;
  }

  private initCurrentUser() {
    let idInUrl = +this.activeRoute.snapshot.params["id"];
    let currentUser: User | undefined = this.dataService.usersList.find((user) => {
      return user.id === idInUrl
    })
    if (currentUser) {
      this.currentUser = currentUser;
      this.dataService.currentUser = currentUser
    } else {
      this.dataSubscribtion.add(this.dataService.getUserByIdFromBack(idInUrl).subscribe(user => {
        this.dataService.currentUser = this.userConverter(user);
        this.currentUser = this.dataService.currentUser;
        this.newUserForm.patchValue(this.currentUser);
      }))
    }
  }

  private userConverter(user: { name: string, username: string, id: number }) {
    const convertedUser = this.dataService.convertUser(user);
    return convertedUser;
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
    if (this.pageMode === 'edit' || this.pageMode === 'view') {
      this.newUserForm.patchValue(this.currentUser);
    }
    if (this.pageMode === 'view') {
      this.newUserForm.disable();
    }
  }


  onAddUser(): void {
    this.isSaveButtonDisabled = true;
    this.currentUser = this.newUserForm.value;
    this.currentUser.id = this.dataService.createUniqueId();
    this.dataSubscribtion.add(this.dataService.addUser(this.currentUser).subscribe(res => {
      let convertedUser = this.userConverter(res as { name: string; username: string; id: number; })
      this.dataService.usersList.push(convertedUser as User)
      this.isSaveButtonDisabled = false;
      this.onNavigateToHomePage();
    }));
  }

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
    let currentUserindex = this.dataService.usersList.findIndex((user) => {
      return user.id === this.currentUser.id
    })
    this.dataService.usersList[currentUserindex] = this.currentUser as User;
    this.dataSubscribtion?.add(this.dataService.changeUser(this.currentUser).subscribe(res => {
      this.isSaveButtonDisabled = false;
      this.onNavigateToHomePage();
    }));
  }

  onNavigateToHomePage() {
    this.router.navigate([""]);
  }

  ngOnDestroy() {
    this.dataSubscribtion?.unsubscribe()
  }
}
