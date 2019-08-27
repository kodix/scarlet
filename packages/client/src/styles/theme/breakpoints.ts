export type Breakpoint = {
  breakPoint: number;
  gutter: string;
  containerPadding: string;
  colCount: number;
};

export const breakpoints: { [breakpoint: string]: Breakpoint } = {
  mobile: {
    breakPoint: 0,
    gutter: '10px',
    containerPadding: '20px',
    colCount: 12,
  },
  tablet: {
    breakPoint: 768,
    gutter: '20px',
    containerPadding: '40px',
    colCount: 12,
  },
  laptop: {
    breakPoint: 1024,
    gutter: '30px',
    containerPadding: '60px',
    colCount: 12,
  },
  desktop: {
    breakPoint: 1440,
    gutter: '24px',
    containerPadding: '108px',
    colCount: 12,
  },
};
