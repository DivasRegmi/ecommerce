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
          {
            id: 'Forgot Password',
            title: 'Forgot Password',
            type: 'item',
            url: '/pages/auth/forgot-password',
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
  {
    id: 'Documentation',
    title: 'DOCUMENTATION',
    type: 'group',
    children: [
      // {
      //   id: "Material UI Components",
      //   title: "Material UI Components",
      //   type: "collapse",
      //   icon: "layers",
      //   children: [...MaterialUIComponentsNavigation]
      // },
      {
        id: 'Oftadeh - React Admin',
        title: 'Oftadeh - React Admin',
        type: 'link',
        icon: 'link',
        url: 'https://github.com/mohammadoftadeh/oftadeh-react-admin',
        exact: true,
      },
    ],
  },
  // {
  //   id: "dashboard",
  //   title: "Dashboard",
  //   type: "item",
  //   icon: "dashboard",
  //   url: "/",
  //   exact: true
  // },
  // {
  //   id: "pages",
  //   title: "Pages",
  //   type: "group",
  //   icon: "pages",
  //   children: [
  //     {
  //       id: "all pages",
  //       title: "Pages",
  //       type: "collapse",
  //       icon: "stars",
  //       badge: {
  //         title: "new",
  //         bg: "#525E8A",
  //         fg: "#FFFFFF"
  //       },
  //       children: [
  //         {
  //           id: "about",
  //           title: "About",
  //           type: "item",
  //           icon: "info",
  //           url: "/pages/about",
  //           exact: true
  //         },
  //         {
  //           id: "contact",
  //           title: "Contact",
  //           type: "item",
  //           icon: "group",
  //           url: "/pages/contact",
  //           exact: true
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: "divider-1",
  //   type: "divider"
  // },
  // {
  //   id: "oftadeh-github",
  //   title: "Oftadeh Github",
  //   type: "link",
  //   icon: "link",
  //   url: "https://github.com/mohammadoftadeh",
  //   target: "_blank",
  //   badge: {
  //     title: "git",
  //     bg: "green",
  //     fg: "#FFFFFF"
  //   }
  // }
];

export default navigationConfig;
