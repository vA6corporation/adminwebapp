import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BusinessModel } from 'src/app/businesses/business.model';
import { BusinessesService } from 'src/app/businesses/businesses.service';
import { NavigationService } from 'src/app/navigation/navigation.service';
import { DialogAddBusinessesComponent } from '../dialog-add-businesses/dialog-add-businesses.component';
import { UserModel } from 'src/app/users/user.model';
import { UsersService } from 'src/app/users/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupModel } from 'src/app/businesses/group.model';

@Component({
    selector: 'app-edit-groups',
    templateUrl: './edit-groups.component.html',
    styleUrls: ['./edit-groups.component.sass']
})
export class EditGroupsComponent implements OnInit {

    constructor(
        private readonly navigationService: NavigationService,
        private readonly businessesService: BusinessesService,
        private readonly usersService: UsersService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly formBuilder: FormBuilder,
        private readonly matDialog: MatDialog,
    ) { }

    private groupId: string = ''
    formGroup: FormGroup = this.formBuilder.group({
        userId: ['', Validators.required]
    })
    businesses: BusinessModel[] = []
    activeUsers: UserModel[] = []
    users: UserModel[] = []
    group: GroupModel | null = null
    // userIds: string[] = []

    ngOnInit(): void {
        this.navigationService.setTitle('Editar grupo')
        this.navigationService.backTo()

        this.activatedRoute.params.subscribe(params => {
            this.groupId = params.groupId
            this.fetchData()
        })
    }

    fetchData() { 
        this.usersService.getUsersByGroup(this.groupId).subscribe(users => {
            this.users = users
        })

        this.businessesService.getGroup(this.groupId).subscribe(group => {
            this.activeUsers = group.users
            this.group = group
            console.log(this.group)
        })
        
        this.businessesService.getBusinessesByGroup(this.groupId).subscribe(businesses => {
            this.businesses = businesses
        })
    }

    onAddUser() {
        if (this.formGroup.valid && this.group) {
            const { userId } = this.formGroup.value
            console.log(userId)
            this.group.userIds.push(userId)
            this.navigationService.loadBarStart()
            this.businessesService.updateGroupData(this.groupId, this.group).subscribe(() => {
                this.navigationService.loadBarFinish()
                this.fetchData()
            })
        }
    }

    onAddBusiness() {
        const dialogRef = this.matDialog.open(DialogAddBusinessesComponent, {
            width: '600px',
            position: { top: '20px' },
        })

        dialogRef.afterClosed().subscribe(business => {
            if (business) {
                this.navigationService.loadBarStart()
                this.businessesService.updateGroup(business._id, this.groupId).subscribe(() => {
                    this.navigationService.loadBarFinish()
                    this.fetchData()
                })
            }
        })
    }

}
