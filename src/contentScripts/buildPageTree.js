import { ACTIONS } from '../util/constants';

function buildTree() {
  console.log('Building Tree');
  let items = document.querySelectorAll('#content_listContainer > li').length;
  return items;
}

function onMessageHandler(payload, sender, sendResponse) {
  if (!sender.tab) {
    switch (payload.type) {
      case ACTIONS.parseTree:
        console.log('Requested to build the page tree.');
        sendResponse(buildTree());
        break;
      default:
        console.log('Unknown action');
    }
  }
}

chrome.runtime.onMessage.addListener(onMessageHandler);
