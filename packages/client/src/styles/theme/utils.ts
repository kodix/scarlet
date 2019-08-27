import { css } from 'styled-components';
import { Breakpoint } from './breakpoints';

export const getMedia = (sizes: Breakpoint[]) =>
  Object.keys(sizes).reduce((acc: any, label: any) => {
    acc[label] = (first: any, ...rest: [any]) => css`
      @media (min-width: ${sizes[label]}px) {
        ${css(first, ...rest)}
      }
    `;
    return acc;
  }, {});

const getProps = (sizes: any, prop: any) => {
  const tempObj: any = {};
  Object.keys(sizes).forEach((size: string) => {
    tempObj[size] = sizes[size][prop];
  });
  return tempObj;
};

const getSizes = (sizes: Breakpoint[], widthDiff: number | string = 0) => {
  const tempSizes = JSON.parse(JSON.stringify(sizes));
  const keys = Object.keys(tempSizes);
  keys.forEach((key: string) => {
    tempSizes[key].breakPoint += widthDiff;
  });
  return tempSizes;
};

const findDevices = (parentWidth: number | string, sizes: any) => {
  const breakpoints = Object.keys(sizes);
  const devices: any = [];
  breakpoints.forEach((curr) => {
    const breakpointSize = sizes[curr];
    if (parentWidth >= Math.abs(breakpointSize)) {
      devices.push(curr);
    }
  });

  return devices;
};

export { getProps, getSizes, findDevices };
