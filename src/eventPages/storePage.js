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

  console.log(courseItem);
  course.children = courseItem.course.menu;

  updateContent(course, courseItem.content);
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
}
