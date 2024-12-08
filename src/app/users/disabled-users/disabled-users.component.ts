import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';
import { BusinessModel } from 'src/app/businesses/business.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { UserModel } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-disabled-users',
  templateUrl: './disabled-users.component.html',
  styleUrls: ['./disabled-users.component.sass']
})
export class DisabledUsersComponent implements OnInit {

  constructor( 
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly navigationService: NavigationService,
  ) { }

  public displayedColumns: string[] = [ 'name', 'email', 'assignedOffice', 'actions' ];
  public dataSource: UserModel[] = [];
  public length: number = 0;
  public pageSize: number = 10;
  public pageSizeOptions: number[] = [10, 30, 50];
  public pageIndex: number = 0;
  private business: BusinessModel = this.authService.getBusiness();

  handlePageEvent(event: PageEvent): void {
    // this.usersService.getDisabledUsers().subscribe(users => {
    //   this.dataSource = users;
    // });
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Usuarios');
    if (this.business.groupId) {
      this.usersService.getDisabledUsersByGroup(this.business.groupId).subscribe(users => {
        this.dataSource = users;
      });      
    } else {
      this.usersService.getDisabledUsers().subscribe(users => {
        console.log(users);
        this.dataSource = users;
      });
    }
  }

}
