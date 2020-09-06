import { Component, OnInit } from '@angular/core';
import { EditService } from '../services/edit.service';
import { filter } from 'rxjs/operators';

import { sampleData, displayDate } from '../services/events-utc';

import { 
	EditMode,
	CrudOperation,
	EventClickEvent,
  RemoveEvent,
  SlotClickEvent,
  SchedulerEvent 
} from '@progress/kendo-angular-scheduler';

import '@progress/kendo-date-math/tz/regions/Europe';
import '@progress/kendo-date-math/tz/regions/NorthAmerica';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.scss']
})
export class DevisComponent implements OnInit {

public selectedDate: Date = displayDate;
public events: SchedulerEvent[] = sampleData;
public editedEvent: any;
public editMode: EditMode;
public isNew: boolean;

    constructor(public editService: EditService) { }

    public ngOnInit(): void {
        this.editService.read();
    }

    public slotDblClickHandler({ start, end, isAllDay }: SlotClickEvent): void {
        this.isNew = true;

        this.editMode = EditMode.Series;

        this.editedEvent = {
            Start: start,
            End: end,
            IsAllDay: isAllDay
        };
    }

    public eventDblClickHandler({ sender, event }: EventClickEvent): void {
        this.isNew = false;

        let dataItem = event.dataItem;

        if (this.editService.isRecurring(dataItem)) {
            sender.openRecurringConfirmationDialog(CrudOperation.Edit)
                  // The dialog will emit `undefined` on cancel
                  .pipe(filter(editMode => editMode !== undefined))
                  .subscribe((editMode: EditMode) => {
                      if (editMode === EditMode.Series) {
                        dataItem = this.editService.findRecurrenceMaster(dataItem);
                      }

                      this.editMode = editMode;
                      this.editedEvent = dataItem;
                  });
        } else {
            this.editMode = EditMode.Series;
            this.editedEvent = dataItem;
        }
    }

    public saveHandler(formValue: any): void {
        if (this.isNew) {
            this.editService.create(formValue);
        } else {
            this.handleUpdate(this.editedEvent, formValue, this.editMode);
        }
    }

    public removeHandler({ sender, dataItem }: RemoveEvent): void {
        if (this.editService.isRecurring(dataItem)) {
            sender.openRecurringConfirmationDialog(CrudOperation.Remove)
                  // result will be undefined if the Dialog was closed
                  .pipe(filter(editMode => editMode !== undefined))
                  .subscribe((editMode) => {
                      this.handleRemove(dataItem, editMode);
                  });
        } else {
            sender.openRemoveConfirmationDialog().subscribe((shouldRemove) => {
                if (shouldRemove) {
                    this.editService.remove(dataItem);
                }
            });
        }
    }

    public cancelHandler(): void {
        this.editedEvent = undefined;
    }

    private handleUpdate(item: any, value: any, mode: EditMode): void {
        const service = this.editService;
        if (mode === EditMode.Occurrence) {
            if (service.isException(item)) {
                service.update(item, value);
            } else {
                service.createException(item, value);
            }
        } else {
            // Item is not recurring or we're editing the entire series
            service.update(item, value);
        }
    }

    private handleRemove(item: any, mode: EditMode): void {
        const service = this.editService;
        if (mode === EditMode.Series) {
            service.removeSeries(item);
        } else if (mode === EditMode.Occurrence) {
            if (service.isException(item)) {
                service.remove(item);
            } else {
                service.removeOccurrence(item);
            }
        } else {
            service.remove(item);
        }
    }
}



