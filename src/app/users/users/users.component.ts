import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UsersService } from '../users.service';
import { UserModel } from '../user.model';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { AuthService } from 'src/app/auth/auth.service';
import { formatDate } from '@angular/common';
// import { buildExcel } from 'src/app/xlsx';
import { BusinessModel } from 'src/app/businesses/business.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {

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
    // this.usersService.getUsersByPage(event.pageIndex + 1, event.pageSize).subscribe(users => {
    //   this.dataSource = users;
    // });
  }

  ngOnInit(): void {
    this.navigationService.setTitle('Usuarios');
    this.navigationService.setMenu([
      { id: 'excel_simple', label: 'Exportar excel', icon: 'file_download', show: false },
    ])

    this.navigationService.handlerClickMenu().subscribe(id => {
      switch (id) {
        case 'excel_simple':
          this.navigationService.loadSpinnerFinish();
          const wscols = [ 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20 ];
          let body = [];
          body.push([
            'NOMBRE',
            'EMAIL',
            'SUCURSAL'
          ]);
          for (const user of this.dataSource) {
            body.push([
              user.name,
              user.email,
              user.assignedOffice ? user.assignedOffice.name.toUpperCase() : 'TODAS'
            ]);
          }
          const name = `USUARIOS`;
          buildExcel(body, name, wscols, [], []);
          break;
      
        default:
          break;
      }
    });

    if (this.business.groupId) {
      this.usersService.getActiveUsersByGroup(this.business.groupId).subscribe(users => {
        console.log(users);
        this.dataSource = users;
      });      
    } else {
      this.usersService.getActiveUsers().subscribe(users => {
        console.log(users);
        this.dataSource = users;
      });
    }
  }
}
