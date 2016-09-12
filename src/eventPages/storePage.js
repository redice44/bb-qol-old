export function storePage(tree) {
  const query = tree.courseId;
  chrome.storage.local.get(query, function(items) {
    if (items.hasOwnProperty(tree.courseId)) {
      console.log('Updating course.');
      updateCourse(items, tree);
    } else {
      console.log('Creating new course.');
      addCourse(tree);
    }
  });
}

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
