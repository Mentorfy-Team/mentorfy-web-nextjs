import { Heatmap, HeatmapConfig } from '@ant-design/plots';

export default ({ data }) => {
  const config = {
    data,
    xField: 'area',
    yField: 'rating',
    colorField: 'value',
    legend: false,
    color: '#afafaf-#38c54a',
    coordinate: {
      type: 'polar',
      cfg: {
        innerRadius: 0.2,
      },
    },
    heatmapStyle: {
      stroke: '#121212',
      opacity: 1,
      lineWidth: 1,
    },
    meta: {
      rating: {
        type: 'cat',
      },
      value: {
        min: 0,
        max: 1,
      },
    },
    xAxis: {
      line: null,
      grid: null,
      tickLine: null,
      label: {
        offset: 20,
        style: {
          fill: '#ffffff',
          fontSize: 12,
          textBaseline: 'top',
        },
      },
    },
    yAxis: {
      top: true,
      line: null,
      grid: null,
      tickLine: null,
      label: {
        offset: 0,
        style: {
          fill: '#ffffff00',
        },
      },
    },
    tooltip: {
      showMarkers: false,
      showTitle: false,
      showContent: false,
      showNil: false,
    },
  } as Partial<HeatmapConfig>;

  return <Heatmap {...(config as any)} />;
};
