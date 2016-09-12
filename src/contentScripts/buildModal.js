export function buildModal(course) {
  console.log(course);
  let modal = createModal();
  let contentContainer = createContentContainer();
  let courseTitle = createCourseTitle(course.title);
  let closeButton = createCloseButton();
  let items = createItemsList(course.children);

  contentContainer.appendChild(courseTitle);
  contentContainer.appendChild(closeButton);
  contentContainer.appendChild(items);
  modal.appendChild(contentContainer);
  document.body.appendChild(modal);
}

function createItemsList(children) {
  let list = document.createElement('ul');

  for (let c of children) {
    let listItem = document.createElement('li');
    let title = document.createElement('p');
    title.innerText = `[${c.type}] ${c.title}`;
    listItem.appendChild(title);

    if (c.hasOwnProperty('children')) {
      listItem.appendChild(createItemsList(c.children));
    }
    list.appendChild(listItem);
  }

  return list;
}

function createCloseButton() {
  let closeButton = document.createElement('button');
  closeButton.addEventListener('click', handleClose);
  closeButton.innerText = 'x';
  closeButton.className = 'BB-QoL-close';

  return closeButton;
}

function createCourseTitle(title) {
  let courseTitle = document.createElement('h1');
  courseTitle.innerText = title;

  return courseTitle;
}

function createContentContainer() {
  let contentContainer = document.createElement('div');
  contentContainer.id = 'BB-QoL-content-container';

  return contentContainer;
}

function createModal() {
  let modal = document.createElement('div');
  modal.id = 'BB-QoL-overlay';

  return modal;
}

function handleClose() {
  let overlay = document.querySelector('#BB-QoL-overlay');
  overlay.removeEventListener('click', handleClose, false);
  overlay.parentNode.removeChild(overlay);
}
