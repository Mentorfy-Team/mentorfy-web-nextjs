type ratio = '16/10' | '10/16' | '16/9' | '9/16' | '4/3' | '3/4';

const RatioSize = (type: 'w' | 'h', size: number, ratio: ratio = '16/10') => {
  const widthWide = 900;
  const heightWide = 1366;

  const width = 960;
  const height = 1280;

  if (ratio === '16/10')
    return type === 'w' ? (size * widthWide) / 10 : (size * heightWide) / 10;

  if (ratio === '10/16')
    return type === 'h' ? (size * widthWide) / 10 : (size * heightWide) / 10;

  if (ratio === '4/3')
    return type === 'w' ? (size * width) / 10 : (size * height) / 10;

  if (ratio === '3/4')
    return type === 'h' ? (size * width) / 10 : (size * height) / 10;
};

export default RatioSize;
