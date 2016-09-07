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

/* Attach Listeners */
chrome.runtime.onInstalled.addListener(onInstalledHandler);
chrome.contextMenus.onClicked.addListener(onClickHandler);
