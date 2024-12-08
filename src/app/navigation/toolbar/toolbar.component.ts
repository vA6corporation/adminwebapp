import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NavigationService } from '../navigation.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.sass']
})
export class ToolbarComponent implements OnInit {

    constructor(
        private readonly router: Router,
        private readonly authService: AuthService,
        private readonly navigationService: NavigationService,
        private readonly formBuilder: FormBuilder,
    ) { }

    formGroup: FormGroup = this.formBuilder.group({
        key: null,
    });

    isAuth: boolean = false
    userName: string = 'User'
    title: string = 'Administrador'
    showSearch: boolean = false
    showInputSearch: boolean = false
    isLoadingBar: boolean = false
    isMainToolbar: boolean = true
    showTitle: boolean = true
    private backTo: string = ''

    @Output()
    sidenavToggle = new EventEmitter<void>()

    @ViewChild('inputKey') inputKey!: ElementRef<HTMLInputElement>

    menus: any[] = []
    buttons: any[] = []

    ngOnInit(): void {
        this.navigationService.getTitle().subscribe(title => {
            this.title = title
        })

        this.navigationService.getIsBackToolbar().subscribe(isMainToolbar => {
            this.isMainToolbar = isMainToolbar
        })

        this.navigationService.getBackTo().subscribe(backTo => {
            this.backTo = backTo
        })

        this.authService.getAuthChange().subscribe(authState => {
            this.isAuth = authState
        })

        this.navigationService.getLoadBar().subscribe(loadState => {
            this.isLoadingBar = loadState
        })

        this.navigationService.getShowSearch().subscribe(() => {
            this.showInputSearch = true
            setTimeout(() => {
                this.inputKey.nativeElement.focus()
            })
        })

        this.navigationService.getMenu().subscribe(menus => {
            const filterMenus = []
            const filterButtons = []
            this.showSearch = false
            for (const menu of menus) {
                if (menu.id === 'search') {
                    this.showSearch = true
                    continue
                }
                if (menu.show) {
                    filterButtons.push(menu)
                } else {
                    filterMenus.push(menu)
                }
            }
            this.menus = filterMenus
            this.buttons = filterButtons
        })
    }

    isMobile() {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true
        } else {
            return false
        }
    }

    onClick(id: string) {
        if (id === 'search') {
            this.showSearch = !this.showSearch
        }
        this.navigationService.getClickMenu().emit(id)
    }

    onInput() {
        const { key } = this.formGroup.value
        this.navigationService.getInputSearch().emit(key)
    }

    onBack() {
        if (this.backTo) {
            this.router.navigate([this.backTo])
        } else {
            history.go(-1)
        }
    }

    onSubmit() {
        const { key } = this.formGroup.value
        this.formGroup.reset()
        if (key) {
            this.navigationService.getSearch().emit(key)
        }
    }

    onToggleToolbar(state: boolean) {
        this.isMainToolbar = state
    }

    onToggleSidenav(): void {
        this.sidenavToggle.emit()
    }

    onToggleSearch() {
        if (this.showSearch) {
            setTimeout(() => {
                this.inputKey?.nativeElement.focus()
            })
            if (this.isMobile()) {
                this.showTitle = false
            } else {
                this.showTitle = true
            }
        } else {
            this.showTitle = true
        }
        if (!this.showInputSearch) {
            this.showTitle = true
        }
    }

    onLogout(): void {
        this.authService.logout()
        this.router.navigate(['/login'])
    }
}
