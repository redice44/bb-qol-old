import { MENU_ID, URL } from './constants';

export const menu = {
  parseTree: {
    id: MENU_ID.parseTree,
    title: 'Parse Page',
    contexts: ['page'],
    documentUrlPatterns: [`${URL.base}${URL.contentPage}*`]
  }
};
