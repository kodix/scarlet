import RouteComponent from '../components/DefaultRouteComponent';
import AnotherRouteComponent from '../components/AnotherRouteComponent';

export default [
  {
    label: 'home',
    name: 'home',
    path: '/',
    RouteComponent,
  },
  {
    label: 'route1',
    name: 'route1',
    path: '/route1',
    RouteComponent: AnotherRouteComponent,
  },
  {
    label: 'route2',
    name: 'route2',
    path: '/route2',
    RouteComponent,
  },
];
