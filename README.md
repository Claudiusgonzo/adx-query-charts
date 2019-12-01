# This package is a work in process. Please DO NOT USE it yet

# query-data-to-chart-private
[![Build Status](https://travis-ci.org/microsoft/adx-query-charts.svg?branch=master)](https://travis-ci.org/microsoft/adx-query-charts)&nbsp;&nbsp;&nbsp;&nbsp;[![npm version](https://badge.fury.io/js/adx-query-charts.svg)](https://badge.fury.io/js/adx-query-charts)

Draw charts from Azure Data Explorer queries

## Installation 
npm install adx-query-charts

## Dependencies 
Make sure to install the following packages before using the adx-query-charts library:
1. [moment](https://www.npmjs.com/package/moment): `npm i moment`
2. [lodash](https://www.npmjs.com/package/lodash): `npm i lodash`
3. [highcharts](https://www.npmjs.com/package/highcharts): `npm i highcharts`

## Usage
```typescript
import * as Charts from 'adx-query-charts';

const highchartsVisualizer = new Charts.HighchartsVisualizer();
const chartHelper = chartHelper = new Charts.KustoChartHelper('chart-elem-id', highchartsVisualizer);
const chartOptions: Charts.IChartOptions = {
    chartType: Charts.ChartType.Column,
    columnsSelection: {
        xAxis: { name: 'timestamp', type: Charts.DraftColumnType.DateTime },
        yAxes: [{ name: 'requestCount', type: Charts.DraftColumnType.Int }]
    }
};

// Draw the chart - the chart will be drawn inside an element with 'chart-elem-id' id
chartHelper.draw(queryResultData, chartOptions);
```
## API
### IChartOptions
| Option name:           | Type:              | Details:                                                         | Default value:  |
| -------------------    |--------------------| ---------------------------------------------                    | ----------------|
| chartType              | ChartType          | Mandatory. <br>The type of the chart to draw                     |                 |
| columnsSelection       | IAxesInfo<IColumn> | The columns selection for the Axes and the split-by of the chart | If not provided, default columns will be selected. <br>See: getDefaultSelection method|
| maxUniqueXValues | number | The maximum number of the unique X-axis values.<br>The chart will show the biggest values, and the rest will be aggregated to a separate data point.| 100 |
| exceedMaxDataPointLabel| string | The label of the data point that contains the aggregated value of all the X-axis values that exceed the 'maxUniqueXValues'.| 'OTHER' |
| aggregationType| AggregationType | Multiple rows with the same values for the X-axis and the split-by will be aggregated using a function of this type.<br>For example, assume we get the following query result data:<br>['2016-08-02T10:00:00Z', 'Chrome 51.0', 15], ['2016-08-02T10:00:00Z', 'Internet Explorer 9.0', 4]<br>When drawing a chart with columnsSelection = { xAxis: timestamp, yAxes: count_ }, and aggregationType = AggregationType.Sum we need to aggregate the values of the same timestamp value and return one row with ["2016-08-02T10:00:00Z", 19] |AggregationType.Sum|
| utcOffset              | number          | The desired offset from UTC for date values. Used to handle timezone.<br>The offset will be added to the original date from the query results data.|0 |

## Test
Unit tests are written using [Jest](https://jestjs.io/).

```sh
Run tests: npm run test
```

# Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.