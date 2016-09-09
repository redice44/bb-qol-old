import { ACTIONS, CONTENT, URL } from '../util/constants';

function parsePage() {
  console.log('Building Tree');

  let contentItems = document.querySelectorAll('#content_listContainer > li');
  let page = [];

  // Have to traverse over the array in this way, because contentItems doesn't
  // have Array.map
  for (let item of contentItems) {
    page.push(parseItem(item));
  }

  console.log(page);
  return page;
}

function parseItem(item) {
  const id = item.id.split(':')[1];
  const title = item.querySelector('.item > h3').innerText;
  let type = CONTENT.item.name;
  let link = item.querySelector('.item > h3 > a');
  if (link) {
    if (link.origin === URL.base) {
      // Internal Blackboard links
      const params = link.search.substr(1).split('&');

      switch (link.pathname) {
        case CONTENT.folder.endPoint:
          type = CONTENT.folder.name;
          break;
        case CONTENT.assignment.endPoint:
          type = CONTENT.assignment.name;
          break;
        case CONTENT.module.endPoint:
          type = CONTENT.module.name;
          break;
        case CONTENT.blankPage.endPoint:
          type = CONTENT.blankPage.name;
          break;
        case CONTENT.lessonPlan.endPoint:
          type = CONTENT.lessonPlan.name;
          break;
        case CONTENT.courseLink.endPoint:
          type = CONTENT.courseLink.name;
          break;
        case CONTENT.assessment.endPoint:
          type = CONTENT.assessment.name;
          break;
        default:
          if (link.pathname.includes(CONTENT.file.endPoint)) {
            // File pathnames are dynamic. Filter on true endpoint
            type = CONTENT.file.name;
          } else {
            type = 'Unknown';
            console.log('Unknown item type.', link,
            'Please open an issue with the link above here:',
            'https://github.com/redice44/bb-qol/issues');
          }
      }
    } else {
      // Weblinks
      type = CONTENT.weblink.name;
    }
  }

  return {
    id: id,
    title: title,
    type: type
  };
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
