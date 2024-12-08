import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

interface MenuToolbar {
    id: string
    label: string
    icon: string
    show: boolean
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(
        private readonly matSnackBar: MatSnackBar,
    ) { }

    private handleSearch$: EventEmitter<string> = new EventEmitter()
    private handleInputSearch$: EventEmitter<string> = new EventEmitter()
    private loadBarState$ = new EventEmitter<boolean>()
    private loadSpinnerState$ = new EventEmitter<boolean>()
    private changeTitle$ = new EventEmitter<string>()
    private isMainToolbar$ = new EventEmitter<boolean>()
    private backTo$ = new EventEmitter<string>()
    private setMenu$ = new EventEmitter<MenuToolbar[]>()
    private onClickMenu$ = new EventEmitter<string>()
    private showSearch$ = new EventEmitter<void>()

    handleSearch() {
        return this.handleSearch$.asObservable()
    }

    handleClickMenu() {
        return this.onClickMenu$.asObservable()
    }

    getClickMenu() {
        return this.onClickMenu$
    }

    showSearch() {
        this.showSearch$.emit()
    }

    getInputSearch() {
        return this.handleInputSearch$
    }

    handleInputSearch() {
        return this.handleInputSearch$.asObservable()
    }

    getShowSearch() {
        return this.showSearch$
    }

    setMenu(menus: MenuToolbar[]) {
        this.setMenu$.emit(menus)
    }

    getSearch() {
        return this.handleSearch$
    }

    getMenu() {
        return this.setMenu$
    }

    loadBarStart() {
        this.loadBarState$.emit(true)
    }

    loadBarFinish() {
        this.loadBarState$.emit(false)
    }

    getLoadBar() {
        return this.loadBarState$
    }

    loadSpinnerStart() {
        this.loadSpinnerState$.emit(true)
    }

    loadSpinnerFinish() {
        this.loadSpinnerState$.emit(false)
    }

    getLoadSpinner() {
        return this.loadSpinnerState$
    }

    showMessage(message: string) {
        this.matSnackBar.open(message, 'Aceptar', {
            duration: 5000,
        })
    }

    setTitle(title: string) {
        this.changeTitle$.emit(title)
    }

    getTitle() {
        return this.changeTitle$.asObservable()
    }

    getBackTo() {
        return this.backTo$.asObservable()
    }

    backTo(backTo?: string) {
        this.backTo$.emit(backTo)
        this.isMainToolbar$.emit(false)
    }

    getIsBackToolbar() {
        return this.isMainToolbar$.asObservable()
    }

    isMainToolbar() {
        this.isMainToolbar$.emit(true)
    }

}
