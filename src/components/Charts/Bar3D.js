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
		type: 'bar3d',
		width: '100%',
		height: 400,
		dataFormat: 'json',
		dataSource: {
			chart: {
				caption: 'Most Forked',
				yAxisName: 'Forks',
				xAxisName: 'Repos',
				xAxisNameFontSize: '16px',
				yAxisNameFontSize: '16px',
			},
			// dynamic data change
			data,
		},
	};
	return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
