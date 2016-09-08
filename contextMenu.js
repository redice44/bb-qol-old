/* onInstalled Handler */
function onInstalledHandler() {
  console.log('Initializing...');
  buildContextMenus();
}

function buildContextMenus() {
  var props = {
    id: 'heading',
    title: 'Look ma!',
    contexts: ['page'],
    documentUrlPatterns: ['https://fiu.blackboard.com/*'],
  };

  chrome.contextMenus.create(props);
}

/* onClicked Handler */
function onClickHandler(info, tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "Hello!"}, function(response) {
      console.log(response.farewell);
    });
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
