function init() {
  console.log('Initializing...');
}

chrome.runtime.onInstalled.addListener(init);
