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
		type: 'pie3d',
		width: '100%',
		height: 400,
		dataFormat: 'json',
		dataSource: {
			chart: {
				caption: 'Languages',
				theme: 'fusion',
				decimals: 0,
				pieRadius: '50%',
				paletteColors: '#dd5544, #2255dd, #f0db4f',
			},
			// dynamic data change
			data,
		},
	};
	return <ReactFC {...chartConfigs} />;
};

export default ChartComponent;
