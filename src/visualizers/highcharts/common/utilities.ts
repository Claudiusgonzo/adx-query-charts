'use strict';

import { DraftColumnType, IColumn, IRow } from "../../../common/chartModels";

export class HC_Utilities {
    public static getYValue(columns: IColumn[], row: IRow, yAxisIndex: number): number {
        const column = columns[yAxisIndex];
        let originalValue = row[yAxisIndex]; 
        
        // If the y value is undefined - convert to null since Highcharts don't support numeric undefined values
        if(originalValue === undefined) {
            originalValue = null;
        }

        // Highcharts support only numeric y-axis data. If the y-axis isn't a number (can be a string that represents a number "0.005" for example) - convert it to number
        if(typeof originalValue === 'string') {
            if(column.type === DraftColumnType.Decimal) {
                return parseFloat(originalValue);
            } else if (column.type === DraftColumnType.Int) {
                return parseInt(originalValue);
            }

            return Number(originalValue);
        }
        
        return originalValue;  
    }
}