
export interface MyEvent {
    id?: string;
    TaskID?: number;
    OwnerID?: number;
    Title?: string;
    Nom?: string;
    Prenom?: string;
    Adresse?: string;
    
    Demande?: string;
    Start?: Date;
    End?: Date;

    IsAllDay?: boolean;
    RecurrenceException?: any;
    RecurrenceID?: number;
    RecurrenceRule?: string;
}
