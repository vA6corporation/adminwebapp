import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogAddBusinessesComponent } from '../dialog-add-businesses/dialog-add-businesses.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from '../../navigation/navigation.service';
import { BusinessesService } from '../../businesses/businesses.service';
import { UsersService } from '../../users/users.service';
import { BusinessModel } from '../../businesses/business.model';
import { UserModel } from '../../users/user.model';
import { GroupModel } from '../../businesses/group.model';

@Component({
    selector: 'app-edit-groups',
    templateUrl: './edit-groups.component.html',
    styleUrls: ['./edit-groups.component.sass'],
    standalone: false
})
export class EditGroupsComponent {

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

    ngOnInit(): void {
        this.navigationService.setTitle('Editar grupo')
        this.navigationService.backTo()

        this.groupId = this.activatedRoute.snapshot.params['groupId']
        this.fetchData()
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
