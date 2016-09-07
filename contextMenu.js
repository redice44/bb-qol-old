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
  console.log(info);
  console.log(tab);
}

function onMessageHandler(request, sender, sendResponse) {
  console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "Hello!")
      sendResponse({farewell: "goodbye"});
}

/* Attach Listeners */
chrome.runtime.onInstalled.addListener(onInstalledHandler);
chrome.runtime.onMessage.addListener(onMessageHandler);
chrome.contextMenus.onClicked.addListener(onClickHandler);
