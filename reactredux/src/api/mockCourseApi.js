import delay from './delay';
import * as ppongApi from './ppongApi';

//var newPostKey = firebase.database().ref().child('posts').push().key;
//console.log(getDinos());
//console.log("Aasd");
//console.log("Aasd");

function asdf (){
  return new Promise ((resolve, reject ) => {
    resolve(Object.assign([], firebase.database().ref("dinosaurs/").on('child_added', function(data){
      //console.log(data);
  return data;
})));
});
}
//console.log(asdf());
// = [];


// CRITICAL THIS IS THE FUNCTION THAT WORKS
function getDinos() {
  return new Promise((resolve,  reject) => {
    firebase.database().ref("dinosaurs/").on('value', function (data) {
      //console.log(data.val());
      let v = [];
      //console.log(data.val().getKeys()) //.map((element) => {
     //   v.push(data.val()[element]);
      //});
      /*for (var key in data.val())
      {
        v.push(data.val()[key]);
      }*/
      resolve(v);

    }.bind(this));

  });
}


//var y = {};
// var z = firebase.database().ref("dinosaurs/").on('value', function (data) {
  //console.log(data.val());
//  return data.val();

//});

//onsole.log(z);
function getAllDinos() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Object.assign([], courses));
    }, delay);
  });
}
//firebase.database().ref("courses/").push({
  //name: "dinomon",
  //age: 52
//});

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const courses = [
  {
    id: "react-flux-building-applications",
    title: "Building Applications in React and Flux",
    watchHref: "http://www.pluralsight.com/courses/react-flux-building-applications",
    authorId: "cory-house",
    length: "5:08",
    category: "JavaScript"
  },
  {
    id: "clean-code",
    title: "Clean Code: Writing Code for Humans",
    watchHref: "http://www.pluralsight.com/courses/writing-clean-code-humans",
    authorId: "cory-house",
    length: "3:10",
    category: "Software Practices"
  },
  {
    id: "architecture",
    title: "Architecting Applications for the Real World",
    watchHref: "http://www.pluralsight.com/courses/architecting-applications-dotnet",
    authorId: "cory-house",
    length: "2:52",
    category: "Software Architecture"
  },
  {
    id: "career-reboot-for-developer-mind",
    title: "Becoming an Outlier: Reprogramming the Developer Mind",
    watchHref: "http://www.pluralsight.com/courses/career-reboot-for-developer-mind",
    authorId: "cory-house",
    length: "2:30",
    category: "Career"
  },
  {
    id: "web-components-shadow-dom",
    title: "Web Component Fundamentals",
    watchHref: "http://www.pluralsight.com/courses/web-components-shadow-dom",
    authorId: "cory-house",
    length: "5:10",
    category: "HTML5"
  }
];
//console.log(courses);
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (course) => {
  return replaceAll(course.title, ' ', '-');
};

class CourseApi {
  /*static getAllCourses() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], courses));
      }, delay);
    });
  }*/

  static getAllCourses() {

    return new Promise((resolve,  reject) => {
    firebase.database().ref("courses/").on('value', function (data) {
      //console.log(data.val());
      let v = [];
      for (var key in data.val())
      {
        v.push(data.val()[key]);
      }
      resolve(v);

    }.bind(this));

  });
}

  /*static saveCourse(course) {
    course = Object.assign({}, course); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minCourseTitleLength = 1;
        if (course.title.length < minCourseTitleLength) {
          reject(`Title must be at least ${minCourseTitleLength} characters.`);
        }

        if (course.id) {
          const existingCourseIndex = courses.findIndex(a => a.id == course.id);
          courses.splice(existingCourseIndex, 1, course);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          course.id = generateId(course);
          course.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
          courses.push(course);
        }

        resolve(course);
      }, delay);
    });
  }*/

  static saveCourse(course) {
    course = Object.assign({}, course); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {

        // Simulate server-side validation
        const minCourseTitleLength = 1;
        if (course.title.length < minCourseTitleLength) {
          reject(`Title must be at least ${minCourseTitleLength} characters.`);
        }

        if (course.id) {
          //update
          firebase.database().ref("courses").orderByChild("id").on("child_added", function(snapshot) {
            console.log(snapshot);
            if(snapshot.val().id === course.id) {
              let x = {};
              x[snapshot.getKey()] = course;
              firebase.database().ref("courses").update(x);
            }
          }); //.update(course);
          const existingCourseIndex = courses.findIndex(a => a.id == course.id);

          courses.splice(existingCourseIndex, 1, course);

        } else {
          // add
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          course.id = generateId(course);
          course.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
          firebase.database().ref("courses/").push(course);
          courses.push(course);
        }

        resolve(course);
      });
  }

  static deleteCourse(courseId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfCourseToDelete = courses.findIndex(course => {
          course.courseId == courseId;
        });
        courses.splice(indexOfCourseToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default CourseApi;

//courses.forEach((element, index, array ) => {
//  console.log(firebase.database().ref("dinos/").push({test: "dino"}).getKey());
//});
//firebase.database().ref("courses/").push({
//name: "dinomon",
//age: 52
//});




