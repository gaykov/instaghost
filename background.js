function blockRequest(details) {
  console.log('Blocked: ', details);
  return {
    cancel: true,
  };
}

console.log('blocking');

try {
  chrome.webRequest.onBeforeRequest.addListener(
    function() {
      return { cancel: true };
    },
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
