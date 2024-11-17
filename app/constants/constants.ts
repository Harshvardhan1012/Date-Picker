import { RRule, Frequency } from "rrule";
import { RecurrenceOptions, RuleOptions } from "../types/type";


export const calculateRecurringDates = ({
    freq,
    interval,
    startDate,
    byweekday = [],
    endOption,
    occurrences = 10,
    endDate,
    bymonthday = [],
    bymonth = []
}: RecurrenceOptions): Date[] => {

    const ruleOptions: RuleOptions = {
        freq: Number(freq),
        interval,
        dtstart: startDate,
        byweekday,
        bymonthday,
        bymonth
    };
    
    if (freq === Frequency.WEEKLY && byweekday) {
        ruleOptions.byweekday = byweekday;
    } else if (freq === Frequency.MONTHLY && bymonthday) {
        ruleOptions.bymonthday = bymonthday;
    }
    if (freq === Frequency.YEARLY && bymonth) {
        ruleOptions.bymonth = bymonth;
        ruleOptions.bymonthday = bymonthday;
    }

    if (endOption === "afterOccurrences") {
        ruleOptions.count = occurrences; // Stop after X occurrences
    } else if (endOption === "onDate" && endDate) {
        ruleOptions.until = new Date(endDate.setHours(23, 59, 59, 999)); // End of the selected day
    }
    
    const rule = new RRule(ruleOptions);
    return rule.all(); // Generate all recurrence dates
};


export const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const weekDayMap = {
    Sun: RRule.SU,
    Mon: RRule.MO,
    Tue: RRule.TU,
    Wed: RRule.WE,
    Thu: RRule.TH,
    Fri: RRule.FR,
    Sat: RRule.SA,
};

export const months = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
};


export const FrequencySelect = {
    2: "WEEKLY",
    1: "MONTHLY",
    0: "YEARLY",
    3: "DAILY",
}