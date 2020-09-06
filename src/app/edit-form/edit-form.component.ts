import { Component, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { EditMode } from '@progress/kendo-angular-scheduler';

@Component({
    selector: 'scheduler-edit-form',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './edit-form.component.html',
  	styleUrls: ['./edit-form.component.scss']
})
    
export class SchedulerEditFormComponent {

	@Input() public isNew = false;

    @Input() public editMode: EditMode;

    @Input() public set event(ev: any) {
        if (ev !== undefined) {
            this.editForm.reset(ev);
            this.active = true;
        }
    }

    @Output() public cancel: EventEmitter<any> = new EventEmitter();

    @Output() public save: EventEmitter<any> = new EventEmitter();

    public active = false;

    public editForm = new FormGroup({
        'Title': new FormControl('', Validators.required),
        'Nom': new FormControl('', Validators.required),
        'Prenom': new FormControl('', Validators.required),
        'Adresse': new FormControl('', Validators.required),
        
        'Start': new FormControl('', Validators.required),
        'End': new FormControl('', Validators.required),
        'IsAllDay': new FormControl(false),
        'RecurrenceRule': new FormControl(),
        'RecurrenceID': new FormControl()
    });

    public get isEditingSeries(): boolean {
        return this.editMode === EditMode.Series;
    }

    constructor(public formBuilder: FormBuilder) {}

    public onSave(e: MouseEvent): void {
        e.preventDefault();
        this.active = false;

        this.save.emit(this.editForm.value);
    }

    public onCancel(e: MouseEvent): void {
        e.preventDefault();
        this.active = false;

        this.cancel.emit();
    }
}
