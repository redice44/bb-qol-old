export const URL = {
  base: 'https://fiu.blackboard.com',
  contentEndPoint: '/webapps/blackboard/content/listContentEditable.jsp',
  assignmentEndPoint: '/webapps/assignment/uploadAssignment',
  moduleEndPoint: '/webapps/blackboard/content/launchLink.jsp',
  blankPageEndPoint: '/webapps/blackboard/execute/content/blankPage',
  lessonPlanEndPoint: '/webapps/blackboard/execute/manageLessonPlan',
  courseLinkEndPoint: '/webapps/blackboard/content/launchLink.jsp',
  fileEndPoint: '/bbcswebdav',
  assessmentEndPoint: '/webapps/blackboard/content/launchAssessment.jsp'
};

export const ACTIONS = {
  getCourseId: 'ACTION_GET_COURSE_ID',
  viewCourse: 'ACTION_VIEW_COURSE_OVERVIEW',
  parseTree: 'ACTION_PARSE_PAGE_TREE'
};

export const MENU_ID = {
  viewCourse: 'VIEW_COURSE_OVERVIEW',
  parsePage: 'PARSE_PAGE',
  clearStorage: 'CLEAR_LOCAL_STORAGE',
  viewStorage: 'VIEW_LOCAL_STORAGE'
};

export const BB_SELECTOR = {
  content: '#content_listContainer',
  contentArray: '#content_listContainer > li',
  itemTitle: '.item > h3',
  itemLink: '.item > h3 > a',
  courseTitle: '#courseMenuPalette_paletteTitleHeading > div > h3:first-child > a',
  rootItemTitle: '#pageTitleText'
};

export const CONTENT = {
  item: {
    name: 'Item'
  },
  folder: {
    name: 'Content Folder',
    endPoint: URL.contentEndPoint
  },
  assignment: {
    name: 'Assignment',
    endPoint: URL.assignmentEndPoint
  },
  module: {
    name: 'Module Page',
    endPoint: URL.moduleEndPoint
  },
  blankPage: {
    name: 'Blank Page',
    endPoint: URL.blankPageEndPoint
  },
  lessonPlan: {
    name: 'Lesson Plan',
    endPoint: URL.lessonPlanEndPoint
  },
  courseLink: {
    name: 'Course Link',
    endPoint: URL.courseLinkEndPoint
  },
  file: {
    name: 'File',
    endPoint: URL.fileEndPoint
  },
  assessment: {
    name: 'Assessment',
    endPoint: URL.assessmentEndPoint
  },
  weblink: {
    name: 'External Weblink'
  }
};
