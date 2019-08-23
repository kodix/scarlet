import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;

    primaryColor: string;

    activeDevices: [string];

    breakpoints: {
      mobile: number;
      tablet: number;
      laptop: number;
      desktop: number;
    };

    mq: {
      mobile(): string;
      tablet(): string;
      laptop(): string;
      desktop(): string;
    };
  }
}
