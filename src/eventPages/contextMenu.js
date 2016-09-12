import { ACTIONS, MENU_ID } from '../util/constants';
import { menu } from '../util/menu';

/* onInstalled Handler */
function onInstalledHandler() {
  console.log('Initializing...');
  buildContextMenus();
}

function buildContextMenus() {
  chrome.contextMenus.create(menu.parsePage);
  chrome.contextMenus.create(menu.clearStorage);
  chrome.contextMenus.create(menu.viewStorage);
}

/* onClicked Handler */
function onClickHandler(info, tab) {
  switch (info.menuItemId) {
    case MENU_ID.parsePage:
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var payload = {
          type: ACTIONS.parseTree
        };

        chrome.tabs.sendMessage(tabs[0].id, payload, handleTree);
      });
      break;
    case MENU_ID.clearStorage:
      chrome.storage.local.clear(() => {
        console.log('Cleared Storage');
      });
      break;
    case MENU_ID.viewStorage:
      chrome.storage.local.get(null, (items) => {
        console.log(items);
      });
      break;
    default:
      console.log('Unhandled Context Menu Item');
      // do nothing
  }
}

function handleTree(tree) {
  console.log(tree);
  const query = tree.courseId;
  chrome.storage.local.get(query, function(items) {
    console.log(items);
    if (items.hasOwnProperty(tree.courseId)) {
      console.log('Course is already saved...Update.');
      updateCourse(items, tree);
    } else {
      console.log('Course is not saved yet...Create.');
      addCourse(tree);
    }
  });
}

function addCourse(c) {
  let course = {};
  course[c.courseId] = {};
  course[c.courseId].children = [];
  course[c.courseId].title = c.courseTitle;
  course[c.courseId].children.push(makeChild(c));

  chrome.storage.local.set(course, () => {
    console.log(`Saved ${c.courseId}.`);
    console.log(course);
  });
}

function updateCourse(items, c) {
  let updateChildIndex = -1;
  if (items[c.courseId].children.some((val, index) => {
    if (val.id === c.id) {
      updateChildIndex = index;
      return true;
    }
    return false;
  })) {
    console.log('Root Child already exists.\nUpdating child.');
    items[c.courseId].children[updateChildIndex] = makeChild(c);
  } else {
    console.log('New Root Child.\nAdding to end.');
    items[c.courseId].children.push(makeChild(c));
  }

  chrome.storage.local.set(items, () => {
    console.log(`Updated ${c.courseId}.`);
    console.log(items);
  });
}

function makeChild(c) {
  return {
    id: c.id,
    title: c.title,
    type: c.type,
    children: c.children
  };
}

function onMessageHandler(request, sender, sendResponse) {
  console.log(request);
  sendResponse({msg: 'received'});
}

/* Attach Listeners */
chrome.runtime.onInstalled.addListener(onInstalledHandler);
chrome.runtime.onMessage.addListener(onMessageHandler);
chrome.contextMenus.onClicked.addListener(onClickHandler);
