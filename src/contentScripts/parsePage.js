import { ACTIONS, BB_SELECTOR, CONTENT, URL } from '../util/constants';

function parsePage() {
  console.log('Parsing Page');

  let contentItems = document.querySelectorAll(BB_SELECTOR.contentArray);
  let page = {};
  let params = document.URL.split('?')[1].split('&');
  page.children = [];

  for (let p of params) {
    let pair = p.split('=');

    switch (pair[0]) {
      case 'content_id':
        page.id = pair[1];
        break;
      case 'course_id':
        page.courseId = pair[1];
        break;
      default:
        // do nothing
    }
  }

  page.title = document.querySelector('#pageTitleText').innerText;
  page.type = CONTENT.folder.name;
  page.courseTitle = document.querySelector('#courseMenuPalette_paletteTitleHeading > div > h3:first-child > a').innerText;

  // Have to traverse over the array in this way, because contentItems doesn't
  // have Array.map
  for (let item of contentItems) {
    page.children.push(parseItem(item));
  }

  console.log(page);
  return page;
}

function parseItem(item) {
  let child = {};
  child.id = item.id.split(':')[1];
  child.title = item.querySelector(BB_SELECTOR.itemTitle).innerText;

  let link = item.querySelector(BB_SELECTOR.itemLink);

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

  console.log(child);
  return child;
}

function onMessageHandler(payload, sender, sendResponse) {
  if (!sender.tab) {
    switch (payload.type) {
      case ACTIONS.parseTree:
        console.log('Requested to build the page tree.');
        sendResponse(parsePage());
        break;
      default:
        console.log('Unknown action');
    }
  }
}

chrome.runtime.onMessage.addListener(onMessageHandler);
