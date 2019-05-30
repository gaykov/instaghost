function blockRequest(details) {
  return {
    cancel: true,
  };
}

function switchSecretStoryMode(enable = true) {
  // If we want to enable blocking and there's no blocker currently set
  if (enable && !chrome.webRequest.onBeforeRequest.hasListener(blockRequest)) {
    try {
      // Setting the listener that will block all the request to
      // the instagram seen endpoint
      chrome.webRequest.onBeforeRequest.addListener(
        blockRequest,
        {
          urls: [
            '*://*.instagram.com/stories/reel/seen',
            '*://instagram.com/stories/reel/seen',
          ],
        },
        ['blocking'],
      );
    } catch (e) {
      console.error(e);
    }
    // If we're disabling blocking and already have a listener
  } else if (chrome.webRequest.onBeforeRequest.hasListener(blockRequest)) {
    // Remove the blobking listener
    chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
  }
}

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({
    secretMode: true,
  });

  switchSecretStoryMode(true);

  chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (var key in changes) {
      if (key === 'secretMode') {
        switchSecretStoryMode(!!changes.secretMode.newValue);
      }
    }
  });
});
