require('../stylesheets/overlay.scss');

import { ACTIONS, BB_SELECTOR, CONTENT, URL } from '../util/constants';
import { buildModal } from './buildModal';

// Parses the current page in the course.
function parseCoursePage() {
  let page = {};
  page.course = getCourseInfo();
  page.content = getCourseContent();
  console.log(page);

  return page;
}

function getCourseContent() {
  let content = {};
  // jscs: disable requireCamelCaseOrUpperCaseIdentifiers
  content.id = getUrlParams(document.URL).content_id;
  // jscs: enable requireCamelCaseOrUpperCaseIdentifiers
  content.title = document
    .querySelector(BB_SELECTOR.contentPageTitle).innerText;
  content.children = getContentItems(
    document.querySelectorAll(BB_SELECTOR.contentArray)
  );

  return content;
}

function getContentItems(contentItems) {
  let content = [];
  // Have to traverse over the array in this way, because contentItems doesn't
  // have Array.map
  for (let item of contentItems) {
    content.push(parseItem(item));
  }

  return content;
}

// TODO: Store content of the item depending on type.
function parseItem(item) {
  let child = {};

  child = Object.assign({},
    analyzeLinkType(item.querySelector(BB_SELECTOR.itemLink)));
  child.id = item.id.split(':')[1];
  child.title = item.querySelector(BB_SELECTOR.itemTitle).innerText;

  return child;
}

function getCourseInfo() {
  let course = {};
  // jscs: disable requireCamelCaseOrUpperCaseIdentifiers
  course.id = getUrlParams(document.URL).course_id;
  // jscs: enable requireCamelCaseOrUpperCaseIdentifiers
  course.title = getCourseTitle();
  course.menu = getCourseMenu(
    document.querySelectorAll(BB_SELECTOR.courseMenu)
  );

  return course;
}

function getCourseMenu(menuItems) {
  let menu = [];

  for (let item of menuItems) {
    menu.push(getMenuItem(item));
  }

  return menu;
}

function getMenuItem(item) {
  let link = item.querySelector('a');
  let params = getUrlParams(link.href);
  let child = Object.assign({}, analyzeLinkType(link), getId(params));
  child.title = link.innerText;

  return child;
}

function getId(params) {
  // jscs: disable requireCamelCaseOrUpperCaseIdentifiers
  if (params.hasOwnProperty('content_id')) {
    return {id: params.course_id};
  } else {
    // TODO: Probably want to distinguish between tools and content IDs.
    return {id: params.tool_id};
  }
  // jscs: enable requireCamelCaseOrUpperCaseIdentifiers
}

function analyzeLinkType(link) {
  let child = {};

  if (link) {
    if (link.origin === URL.base) {
      // Internal Blackboard links
      const params = link.search.substr(1).split('&');

      switch (link.pathname) {
        case CONTENT.folder.endPoint:
          child.type = CONTENT.folder.name;
          break;
        case CONTENT.assignment.endPoint:
          child.type = CONTENT.assignment.name;
          break;
        case CONTENT.module.endPoint:
          child.type = CONTENT.module.name;
          break;
        case CONTENT.blankPage.endPoint:
          child.type = CONTENT.blankPage.name;
          break;
        case CONTENT.lessonPlan.endPoint:
          child.type = CONTENT.lessonPlan.name;
          break;
        case CONTENT.courseLink.endPoint:
          child.type = CONTENT.courseLink.name;
          break;
        case CONTENT.assessment.endPoint:
          child.type = CONTENT.assessment.name;
          break;
        default:
          if (link.pathname.includes(CONTENT.file.endPoint)) {
            // File pathnames are dynamic. Filter on true endpoint
            child.type = CONTENT.file.name;
          } else {
            child.type = 'Unknown';
            console.log('Unknown item type.', link,
            'Please open an issue with the link above here:',
            'https://github.com/redice44/bb-qol/issues');
          }
      }
    } else {
      // Weblinks
      child.type = CONTENT.weblink.name;
    }
  } else {
    // Item
    child.type = CONTENT.item.name;
  }

  return child;
}

function getCourseTitle() {
  return document.querySelector(BB_SELECTOR.courseTitle).innerText;
}

function getUrlParams(url) {
  let urlParams = url.split('?')[1].split('&');
  let result = {};

  for (let p of urlParams) {
    let pair = p.split('=');

    result[pair[0]] = pair[1];
  }

  return result;
}

function onMessageHandler(payload, sender, sendResponse) {
  if (!sender.tab) {
    switch (payload.type) {
      case ACTIONS.parseTree:
        console.log('Requested to parse the page.');
        sendResponse(parseCoursePage());
        break;
      case ACTIONS.viewCourse:
        console.log('Requested to view course overview.');
        showOverview();
        break;
      default:
        console.log('Unknown action');
    }
  }
}

chrome.runtime.onMessage.addListener(onMessageHandler);

/* OLD CODE */

function showOverview() {
  let id = '';
  let params = document.URL.split('?')[1].split('&');
  for (let p of params) {
    let pair = p.split('=');

    switch (pair[0]) {
      case 'course_id':
        id = pair[1];
        break;
      default:
        // do nothing
    }
  }

  chrome.storage.local.get(id, (items) => {
    buildModal(items[id]);
  });
}
