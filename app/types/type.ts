import { Weekday } from "rrule";

export interface RecurrenceOptions {
    freq: number; 
    interval: number; 
    startDate: Date; 
    byweekday?: Weekday[]; 
    endOption: "afterOccurrences" | "onDate"; 
    occurrences?: number; 
    endDate?: Date; 
    bymonth?: number[]; 
    bymonthday?: number[]; 
}

export interface RuleOptions {
    freq: number;
    interval: number;
    byweekday: Weekday[];
    dtstart: Date;
    count?: number;
    until?: Date;
    bymonth?: number[];
    bymonthday: number[];
}

export interface InputFieldProps {
    label: string;
    value: string | number;
    onChange: (value: string | number) => void;
    type?: string;
    min?: number;
    className?: string;
}


export interface SelectedDays {
    Weekly: string,
    Monthly: string,
    Yearly: string
    Daily: string
}

export interface RadioDateInputProps {
    label: string;
    radioValue: string;
    checkedValue: string;
    onRadioChange: (value: string) => void;
    dateValue: string | null;
    onDateChange: (value: Date) => void;
    disabled: boolean;
  }

export type EndOption = "afterOccurrences" | "onDate";