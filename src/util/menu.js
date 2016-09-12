import { MENU_ID, URL } from './constants';

export const menu = {
  parsePage: {
    id: MENU_ID.parsePage,
    title: 'Parse Page',
    contexts: ['page'],
    documentUrlPatterns: [`${URL.base}${URL.contentEndPoint}*`]
  },
  clearStorage: {
    id: MENU_ID.clearStorage,
    title: 'Clear Local Storage',
    contexts: ['page'],
    documentUrlPatterns: [`${URL.base}${URL.contentEndPoint}*`]
  },
  viewStorage: {
    id: MENU_ID.viewStorage,
    title: 'View Local Storage',
    contexts: ['page'],
    documentUrlPatterns: [`${URL.base}${URL.contentEndPoint}*`]
  }
};
