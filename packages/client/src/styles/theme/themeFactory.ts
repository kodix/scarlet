import { getProps, getSizes, findDevices, getMedia } from './utils';
import sizes from './breakpoints';

const skodaTheme = (widthDiff: number = 0, parentWidth: number, stylesOverride: any = {}) => {
  const adjustedSizes = getSizes(sizes, widthDiff);
  return {
    name: 'skoda',

    primaryColor: '#ff2400',

    activeDevices: findDevices(parentWidth, getProps(sizes, 'breakPoint')),

    breakpoints: getProps(adjustedSizes, 'breakPoint'),

    mq: getMedia(getProps(adjustedSizes, 'breakPoint')),

    ...stylesOverride,
  };
};

export default skodaTheme;
