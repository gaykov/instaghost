const secretStoriesCheckbox = document.getElementById('secretStoriesCheckbox');
const saveButtonCheckbox = document.getElementById('saveButtonChechbox');

function init() {
  chrome.storage.sync.get(['secretMode', 'saveButton'], function(result) {
    secretStoriesCheckbox.checked = !!result.secretMode;
    saveButtonChechbox.checked = !!result.saveButton;
  });

  secretStoriesCheckbox.addEventListener('change', function() {
    chrome.storage.sync.set({
      secretMode: !!this.checked,
    });
  });

  saveButtonCheckbox.addEventListener('change', function() {
    chrome.storage.sync.set({
      saveButton: !!this.checked,
    });
  });
}

init();
