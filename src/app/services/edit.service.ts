import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Task } from './Task';
import { Observable, zip, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BaseEditService, SchedulerModelFields } from '@progress/kendo-angular-scheduler';
import { parseDate } from '@progress/kendo-angular-intl';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { MyEvent } from '../my-event.interface';
const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

const fields: SchedulerModelFields = {
    id: 'TaskID',
    title: 'Title',
    nom: 'Nom',
    prenom: 'Prenom',
    adresse:'Adresse',
    description: 'Description',
    start: 'Start',
    end: 'End',
    isAllDay: 'IsAllDay',
    recurrenceRule: 'RecurrenceRule',
    recurrenceId: 'RecurrenceID',
    recurrenceExceptions: 'RecurrenceException'
};

@Injectable()
export class EditService extends BaseEditService<MyEvent> {
    public loading = false;

    constructor(private http: HttpClient) {
        super(fields);
    }

    public read(): void {
        if (this.data.length) {
            this.source.next(this.data);
            return;
        }

        this.fetch().subscribe(data => {
            this.data = data.map(item => this.readEvent(item));
            console.log(this.data);
            this.source.next(this.data);
        });
    }

    protected save(created: MyEvent[], updated: MyEvent[], deleted: MyEvent[]): void {
        const completed = [];
        console.log(deleted);
        console.log("creation " + created);
        if (deleted.length) {
            completed.push(this.deleteTask(deleted));
        }
        else {
            completed.push(this.createTask(created));
        }
        console.log("completed" + completed);
       zip(...completed).subscribe(() => this.read());
    }
    protected deleteTask(data?: MyEvent[]) {
        return this.http.delete<MyEvent>('http://localhost:3000/MyEvents/'+data[data.length - 1].id).pipe(catchError(this.handleError));                  
         
    }
    protected createTask(data?: MyEvent[]) {
        this.loading = true;
        console.log(data);
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          };
          data[data.length - 1].Title = data[data.length - 1].Nom;
          let isCreated: Boolean;

            if(data[data.length - 1].id == undefined) {
                return this.http.post<MyEvent>('http://localhost:3000/MyEvents',data[data.length - 1], httpOptions).pipe(catchError(this.handleError));                  
            }
            else {
                return  this.http.put<MyEvent>('http://localhost:3000/MyEvents/'+data[data.length - 1].id,data[data.length - 1], httpOptions).pipe(
                    catchError(this.handleError));    
            }
        }
   protected fetch(action: string = '', data?: any): Observable<any[]> {
        this.loading = true;
        console.log(" action " + action);
        return this.http.get<MyEvent[]>('http://localhost:3000/MyEvents')
       .pipe(
            tap(() => this.loading = false)).pipe(catchError(this.handleError));
    }

    private readEvent(item: any): MyEvent {
        return {
            ...item,
            Start: parseDate(item.Start),
            End: parseDate(item.End)
        };
    }

    private serializeModels(events: MyEvent[]): string {
        if (!events) {
            return '';
        }

        const data = events.map(event => ({
             ...event,
             RecurrenceException:
                this.serializeExceptions(event.RecurrenceException)
        }));
        console.log(JSON.stringify(data));
        return `&models=${JSON.stringify(data)}`;
    }
    public handleError(error: HttpErrorResponse | any) {
        let errMsg: string;
    
        if(error.error instanceof ErrorEvent) {
          errMsg = error.error.message;
        }
        else {
          errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
       }
    
       return throwError(errMsg);
      }
    
}
