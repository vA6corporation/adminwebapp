import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MaterialModule } from '../../material.module';
import { NavigationService } from '../../navigation/navigation.service';
import { UserModel } from '../user.model';

@Component({
    selector: 'app-users',
    imports: [MaterialModule, RouterModule, CommonModule],
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.sass'],
})
export class UsersComponent {

    constructor(
        private readonly authService: AuthService,
        private readonly navigationService: NavigationService,
    ) { }

    displayedColumns: string[] = ['name', 'email', 'assignedOffice', 'actions']
    dataSource: UserModel[] = []
    length: number = 0
    pageSize: number = 10
    pageSizeOptions: number[] = [10, 30, 50]
    pageIndex: number = 0

    handlePageEvent(event: PageEvent): void {
        // this.usersService.getUsersByPage(event.pageIndex + 1, event.pageSize).subscribe(users => {
        //   this.dataSource = users
        // })
    }

    ngOnInit(): void {
        this.navigationService.setTitle('Usuarios')
        this.navigationService.setMenu([
            { id: 'excel_simple', label: 'Exportar excel', icon: 'file_download', show: false },
        ])
    }
}
