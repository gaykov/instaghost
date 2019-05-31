(function() {
  function createSaveButton(imageUrl) {
    const newButton = document.createElement('div');
    newButton.classList.add('ig-saveButton');
    newButton.setAttribute('data-url', imageUrl);

    const saveImageUrl = chrome.runtime.getURL('images/save.svg');
    newButton.innerHTML = `<img class="ig-saveButton__image" src="${saveImageUrl}" />`;

    return newButton;
  }

  function domModificationCallback() {
    if (event.target.nodeName === 'IMG') {
      console.log(event.target.className);
      addSaveButtons();
    }
  }

  function addSaveButtons() {
    const allImagesOnPage = document.querySelectorAll(
      'article>div img:not(.ig-saveButton__image)',
    );

    allImagesOnPage.forEach(element => {
      const imageContainer = element.parentElement;

      if (
        !element.parentElement.classList.contains('instaghost-hasSaveButton')
      ) {
        element.parentElement.classList.add('instaghost-hasSaveButton');

        const button = createSaveButton(element.src);

        element.parentElement.appendChild(button);
      }
    });
  }

  function clickListener(event) {
    if (
      event.target.classList.contains('ig-saveButton') ||
      event.target.classList.contains('ig-saveButton__image')
    ) {
      let target = event.target;
      if (!target.hasAttribute('data-url')) target = event.target.parentElement;

      const imageUrl = target.dataset.url;

      chrome.runtime.sendMessage({ type: 'saveImage', url: imageUrl });
    }
  }

  function init() {
    addSaveButtons();

    document.addEventListener('DOMSubtreeModified', domModificationCallback);
    document.addEventListener('click', clickListener);
  }

  init();
})();
