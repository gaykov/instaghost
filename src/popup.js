const secretStoriesCheckbox = document.getElementById('secretStoriesCheckbox');

function init() {
  chrome.storage.sync.get(['secretMode'], function(result) {
    secretStoriesCheckbox.checked = !!result.secretMode;
  });

  secretStoriesCheckbox.addEventListener('change', function() {
    chrome.storage.sync.set({
      secretMode: !!this.checked,
    });

    console.log(typeof switchSecretStoryMode);
  });
}

init();
