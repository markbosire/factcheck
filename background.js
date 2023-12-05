chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
      title: 'fact check',
      contexts: ['selection'],
      id: 'contextMenuId'
    });
  });
  
  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === 'contextMenuId') {
     // Example data to be stored
     chrome.storage.sync.set({ "key": info.selectionText })
          
        chrome.action.openPopup();
    }
  });
  