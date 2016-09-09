import { ACTIONS } from '../util/constants';
import { menu } from '../util/menu';

/* onInstalled Handler */
function onInstalledHandler() {
  console.log('Initializing...');
  buildContextMenus();
}

function buildContextMenus() {
  chrome.contextMenus.create(menu.parseTree);
}

/* onClicked Handler */
function onClickHandler(info, tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var payload = {
      type: ACTIONS.parseTree
    };

    chrome.tabs.sendMessage(tabs[0].id, payload, handleTree);
  });
}

function handleTree(tree) {
  console.log(tree);
}

function onMessageHandler(request, sender, sendResponse) {
  console.log(request);
  sendResponse({msg: 'received'});
}

/* Attach Listeners */
chrome.runtime.onInstalled.addListener(onInstalledHandler);
chrome.runtime.onMessage.addListener(onMessageHandler);
chrome.contextMenus.onClicked.addListener(onClickHandler);
