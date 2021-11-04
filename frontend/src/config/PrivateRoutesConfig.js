import { Roles } from 'config'

// Components
import {
 Module1,
 Module2,
 Module3,
 ModuleN,
 ModuleNChild1,
 ModuleNChild2,
 ModuleNChild3,
 Dashboard,
 Profile,
} from 'components';

// TODO:
/*
* 1. Make title optional
* 2. Make title multi type support ie: (string, node, react element)
* */

export default [
 {
  component: Module1,
  path: '/',
  title: 'Module - 1',
  exact: true,
 },
 {
  component: Module2,
  path: '/module-2',
  title: 'Module - 2',
 },
 {
  component: Module3,
  path: '/module-3',
  title: 'Module - 3',
 },
 {
  component: ModuleN,
  path: '/module-n',
  title: 'Module - N',
  permission: [
   Roles.SUPER_ADMIN,
   Roles.ADMIN,
   Roles.MANAGER
  ],
  children: [
   {
    component: ModuleNChild1,
    path: '/child-1',
    title: 'Child - 1',
   },
   {
    component: ModuleNChild2,
    path: '/child-2',
    title: 'Child - 2',
   },
   {
    component: ModuleNChild3,
    path: '/child-3',
    title: 'Child - 3',
    permission: [
     Roles.SUPER_ADMIN,
     Roles.ADMIN
    ]
   }
  ]
 },
 {
  component: Dashboard,
  path: '/dashboard',
  title: 'Dashboard',
  permission: [
   Roles.SUPER_ADMIN,
   Roles.ADMIN,
  ],
 },
 {
  component: Profile,
  path: '/profile',
  title: 'Profile',
  permission: [
   Roles.SUPER_ADMIN,
   Roles.ADMIN,
   Roles.MANAGER,
   Roles.CUSTOMER
  ],
 },
]