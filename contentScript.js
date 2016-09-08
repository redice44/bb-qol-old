var items = document.querySelectorAll('#content_listContainer > li').length;

chrome.runtime.sendMessage({ item: items }, function (response) {
  console.log(response);
});

function onMessageHandler(request, sender, sendResponse) {
  console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "Hello!")
      sendResponse({farewell: "goodbye"});
}

chrome.runtime.onMessage.addListener(onMessageHandler);
