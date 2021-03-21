import React from 'react';

// react component render
import ReactFC from 'react-fusioncharts';

// library
import FusionCharts from 'fusioncharts';

// import chart type
import Charts from 'fusioncharts/fusioncharts.charts';

// theme
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const ChartComponent = ({ data }) => {
	const chartConfigs = {
		type: 'column3d',
		width: 600,
		height: 400,
		dataFormat: 'json',
		dataSource: {
			chart: {
				caption: 'Countries With Most Oil Reserves [2017-18]',
				subCaption: 'In MMbbl = One Million barrels',
				xAxisName: 'Country',
				yAxisName: 'Reserves (MMbbl)',
				numberSuffix: '%',
				theme: 'fusion',
			},
			// dynamic data change
			data,
		},
	};
	return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
