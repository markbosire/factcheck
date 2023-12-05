chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      if (request.message === "copy") {
          let selectedText = window.getSelection().toString();
          navigator.clipboard.writeText(selectedText)
              .then(() => {
                  sendResponse({result: "success"});
              })
              .catch(err => {
                  sendResponse({result: "error", message: err});
              });
      }
      // This return statement is needed to keep the message channel open for the asynchronous response
      return true;
  }
);

