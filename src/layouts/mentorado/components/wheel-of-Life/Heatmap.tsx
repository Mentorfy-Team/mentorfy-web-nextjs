import { Heatmap, HeatmapConfig } from '@ant-design/plots';

export default ({ data, width, height }) => {
  const config = {
    width,
    height,
    autoFit: true,
    data,
    xField: 'area',
    yField: 'rating',
    colorField: 'value',
    legend: false,
    color: '#242424cc2-#8e992d-#38c54a',
    coordinate: {
      type: 'polar',
      cfg: {
        innerRadius: 0.1,
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
        min: 1,
        max: 10,
      },
    },
    label: {
      style: {
        fill: '#fff',
        fontSize: 14,
        fontWeight: 700,
        opacity: 1,
      },
      rotate: 0,
      autoRotate: false,
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
      top: false,
      line: null,
      grid: null,
      tickLine: null,
      label: {
        formatter(text) {
          return parseInt(text) + 1;
        },
        offset: 0,
        style: {
          fill: '#fff',
          fontSize: 14,
          fontWeight: 700,
        },
      },
    },
    // pattern: {
    //   type: 'dot',
    //   cfg: {
    //     size: 1,
    //     style: {
    //       fill: '#ffffff55',
    //     },
    //   },
    // },
    state: {
      active: {
        animate: { duration: 100, easing: 'easeLinear' },
        style: {
          lineWidth: 2,
          stroke: '#bbb937',
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
