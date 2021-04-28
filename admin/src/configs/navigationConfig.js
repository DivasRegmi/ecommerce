// import { MaterialUIComponentsNavigation } from "../pages/documentation/material-ui-components/MaterialUIComponentsNavigation";

const navigationConfig = [
  {
    id: 'Main',
    title: 'MAIN',
    type: 'group',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: 'apps',
        url: '/',
        exact: true,
      },
      {
        id: 'product',
        title: 'Product',
        type: 'collapse',
        icon: 'local_mall',
        badge: {
          title: '4',
          bg: '#525E8A',
          fg: '#FFFFFF',
        },
        children: [
          {
            id: 'all products',
            title: 'All Products',
            type: 'item',
            url: '/pages/products',
            exact: true,
          },
          {
            id: 'add product',
            title: 'Add Product',
            type: 'item',
            url: '/pages/products/add-product',
            exact: true,
          },
          {
            id: 'categories',
            title: 'Categories',
            type: 'item',
            url: '/pages/products/categories',
            exact: true,
          },
          {
            id: 'sub-categories',
            title: 'Sub-Categories',
            type: 'item',
            url: '/pages/products/sub-categories',
            exact: true,
          },
        ],
      },
      {
        id: 'calendar',
        title: 'Calendar',
        type: 'item',
        icon: 'event',
        url: '/pages/calendar',
        exact: true,
      },
    ],
  },
  {
    id: 'Pages',
    title: 'Pages',
    type: 'group',
    children: [
      {
        id: 'Authentication',
        title: 'Authentication',
        type: 'collapse',
        icon: 'lock',
        children: [
          {
            id: 'Login',
            title: 'Login',
            type: 'item',
            url: '/pages/auth/login',
            exact: true,
          },
          {
            id: 'Register',
            title: 'Register',
            type: 'item',
            url: '/pages/auth/register',
            exact: true,
          },
        ],
      },
      {
        id: 'About',
        title: 'About',
        type: 'item',
        icon: 'description',
        url: '/pages/about',
        exact: true,
      },
      {
        id: 'Errors',
        title: 'Errors',
        type: 'collapse',
        icon: 'warning',
        badge: {
          title: 'new',
          bg: '#513E8A',
          fg: '#FFFFFF',
        },
        children: [
          {
            id: '404',
            title: '404',
            type: 'item',
            url: '/pages/errors/error-404',
            exact: true,
          },
          {
            id: '500',
            title: '500',
            type: 'item',
            url: '/pages/errors/error-500',
            exact: true,
          },
        ],
      },
    ],
  },
  {
    id: 'divider-1',
    type: 'divider',
  },
];

export default navigationConfig;
