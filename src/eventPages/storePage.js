import Node from '../util/tree-struct/node';

export function storePage(course) {
  // TODO: Verify this can query into an object. eg {id: tree.courseId}
  chrome.storage.local.get(null, function(items) {
    console.log(items);
    console.log(course);

    if (items.hasOwnProperty('data') &&
        items.data.id === course.course.id) {
      // Course exists
      console.log('existing course');
    } else {
      console.log('new course');
      createCourse(course);
    }
  });
}

function createCourse(courseItem) {
  let course = new Node({
    id: courseItem.course.id,
    title: courseItem.course.title
  });

  course.children = courseItem.course.menu;
  console.log('course', course);

  updateContent(course, courseItem.content);
  console.log('create update', course);
  chrome.storage.local.set(course);
}

function updateContent(course, contentPage) {
  let content = new Node({
    id: contentPage.id,
    title: contentPage.title
  });
  content.children = contentPage.children;
  course.updateNode(content, (my, your) => {
    return my.data.id === your.data.id;
  });
  console.log('page update', course);
}





















/* OLD */

function addCourse(c) {
  let course = {};
  course[c.courseId] = {};
  course[c.courseId].children = [];
  course[c.courseId].title = c.courseTitle;
  course[c.courseId].children.push(makeChild(c));

  chrome.storage.local.set(course, () => {
    console.log(`Saved ${c.courseId}.`);
    console.log(course);
  });
}

function updateCourse(items, c) {
  let updateChildIndex = -1;
  if (items[c.courseId].children.some((val, index) => {
    if (val.id === c.id) {
      updateChildIndex = index;
      return true;
    }
    return false;
  })) {
    console.log('Page already exists.\nUpdating page.');
    items[c.courseId].children[updateChildIndex] = makeChild(c);
  } else {
    console.log('New page.\nCreating page.');
    items[c.courseId].children.push(makeChild(c));
  }

  chrome.storage.local.set(items, () => {
    console.log(`Updated ${c.courseId}.`);
    console.log(items);
  });
}

function makeChild(c) {
  return {
    id: c.id,
    title: c.title,
    type: c.type,
    children: c.children
  };
}
