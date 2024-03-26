import { zonedTimeToUtc, formatInTimeZone } from 'date-fns-tz';

export interface DateForRegion {
    startDate: Date;
    endDate: Date;
    region: string;
}

export interface DateRange {
    start: Date;
    end: Date;
}

export function getDateForRegion({ startDate, endDate, region }: DateForRegion): DateRange {
    console.log({ startDate, endDate });

    try {
        const targetTimeZone = region;
        const adjustedStartDate = zonedTimeToUtc(startDate, targetTimeZone);
        const adjustedEndDate = zonedTimeToUtc(endDate, targetTimeZone);

        return {
            start: new Date(formatInTimeZone(adjustedStartDate, targetTimeZone, 'yyyy-MM-dd HH:mm:ss zzz')),
            end: new Date(formatInTimeZone(adjustedEndDate, targetTimeZone, 'yyyy-MM-dd HH:mm:ss zzz'))
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            start: new Date('Invalid Date'),
            end: new Date('Invalid Date')
        };
    }
}

export function getTimezoneForRegion(region: string): string | null {
    try {
        const regionMap: { [key: string]: string } = {
            '': 'Australia/Sydney',
            'Default_Catalog': 'Australia/Sydney',
            'Au-Site': 'Australia/Sydney',
            'Nz-Site': 'Pacific/Auckland',
            'Uk-Site': 'Europe/London'
        };

        const timezone = regionMap[region];
        return timezone || null;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
