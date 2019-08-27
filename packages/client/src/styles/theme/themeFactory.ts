import { getProps, getSizes, findDevices, getMedia } from './utils';
import { breakpoints } from './breakpoints';

const skodaTheme = (widthDiff: number = 0, parentWidth: number, stylesOverride: object = {}) => {
  const adjustedSizes = getSizes(breakpoints, widthDiff);
  return {
    name: 'skoda',

    primaryColor: '#ff2400',

    activeDevices: findDevices(parentWidth, getProps(breakpoints, 'breakPoint')),

    breakpoints: getProps(adjustedSizes, 'breakPoint'),

    mq: getMedia(getProps(adjustedSizes, 'breakPoint')),

    ...stylesOverride,
  };
};

export default skodaTheme;
