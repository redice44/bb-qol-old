import { ACTIONS, MENU_ID } from '../util/constants';
import { menu } from '../util/menu';
import { storePage } from './storePage';
/* onInstalled Handler */
function onInstalledHandler() {
  console.log('Initializing...');
  buildContextMenus();
}

function buildContextMenus() {
  chrome.contextMenus.create(menu.viewCourse);
  chrome.contextMenus.create(menu.parsePage);
  chrome.contextMenus.create(menu.clearStorage);
  chrome.contextMenus.create(menu.viewStorage);
}

/* onClicked Handler */
function onClickHandler(info, tab) {
  switch (info.menuItemId) {
    case MENU_ID.viewCourse:
      viewCourseSelection();
      break;
    case MENU_ID.parsePage:
      parsePageSelection();
      break;
    case MENU_ID.clearStorage:
      clearStorageSelection();
      break;
    case MENU_ID.viewStorage:
      viewStorageSelection();
      break;
    default:
      console.log('Unhandled Context Menu Item');
      // do nothing
  }
}

function viewCourseSelection() {
  sendAction(ACTIONS.viewCourse, () => {});
}

function parsePageSelection() {
  sendAction(ACTIONS.parseTree, storePage);
}

function sendAction(action, cb) {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    var payload = {
      type: action
    };

    chrome.tabs.sendMessage(tabs[0].id, payload, cb);
  });
}

function clearStorageSelection() {
  chrome.storage.local.clear(() => {
    console.log('Cleared Storage');
  });
}

function viewStorageSelection() {
  chrome.storage.local.get(null, (items) => {
    console.log(items);
  });
}

function onMessageHandler(request, sender, sendResponse) {
  console.log(request);
  sendResponse({msg: 'received'});
}

/* Attach Listeners */
chrome.runtime.onInstalled.addListener(onInstalledHandler);
chrome.runtime.onMessage.addListener(onMessageHandler);
chrome.contextMenus.onClicked.addListener(onClickHandler);
