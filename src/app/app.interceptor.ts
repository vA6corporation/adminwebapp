import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable } from "rxjs";

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(
        private readonly router: Router,
    ) { }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401 || err.status === 403) {
            this.router.navigate(['/login'])
        }
        throw err
    }

    intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
        return handler.handle(req).pipe(catchError(err => this.handleAuthError(err)))
    }

}