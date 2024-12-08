import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpService } from '../http.service';
import { WorkerModel } from './worker.model';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  private workers$: Subject<WorkerModel[]> = new Subject();
  private workers: WorkerModel[]|null = null;

  getWorkersByPage(pageIndex: number, pageSize: number) {
    return this.httpService.get(`workers/byPage/${pageIndex}/${pageSize}`);
  }

  getWorkerById(workerId: string): Observable<WorkerModel> {
    return this.httpService.get(`workers/byId/${workerId}`);
  }

  getWorkersCount() {
    return this.httpService.get('workers/count');
  }

  clearWorkers() {
    this.workers = null;
  }

  create(worker: WorkerModel): Observable<WorkerModel> {
    return this.httpService.post('workers', { worker });
  }

  update(worker: WorkerModel, workerId: string): Observable<void> {
    return this.httpService.put(`workers/${workerId}`, { worker });
  }

  delete(workerId: string): Observable<void> {
    return this.httpService.delete(`workers/${workerId}`);
  }

  handleWorkers(): Observable<WorkerModel[]> {
    if (this.workers === null) {
      this.loadWorkers();
    } else {
      setTimeout(() => {
        this.workers$.next(this.workers || []);
      });
    }
    return this.workers$.asObservable();
  }

  loadWorkers() {
    this.httpService.get('workers').subscribe(workers => {
      this.workers = workers;
      this.workers$.next(this.workers || []);
    });
  }
  
}
