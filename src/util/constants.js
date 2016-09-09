export const URL = {
  base: 'https://fiu.blackboard.com',
  contentPage: '/webapps/blackboard/content/listContentEditable.jsp'
};

export const ACTIONS = {
  parseTree: 'ACTION_PARSE_PAGE_TREE'
};

export const MENU_ID = {
  parseTree: 'PARSE_TREE'
};

export const CONTENT = {
  item: {
    name: 'Item'
  },
  folder: {
    name: 'Content Folder',
    endPoint: URL.contentPage
  },
  weblink: {
    name: 'External Weblink'
  }
};
