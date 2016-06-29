import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';

class confirmPage extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      //in use manage course form he recommends changing this
      game: Object.assign({}, this.props.game),
      errors: {},
      saving: false
    };

    this.updateGameState = this.updateGameState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if ( this.props.course.id != nextProps.course.id) {
      // handles refresh, runs anytime it thinks props might have chagned
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({course: course});
  }

  saveCourse(event){
    event.preventDefault();
    this.setState({saving: true});
    //if error here persists, refer to dispatch create andupdate -- Fix was to add bind of this context
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });

  }

  redirect() {
    this.setState({saving: false});
    toastr.success('Course saved');
    this.context.router.push('/courses');
  }

  render(){
    return (
      <CourseForm
        allAuthors={this.props.authors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        course={this.state.course}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  if (course.length) return course[0];
  return null;
}

// one day inspect ownProps
function mapStateToProps(state, ownProps){
  const courseId = ownProps.params.id;
  let course = {id:'', watchHref:'', title:'', authorId:'', length:'', category:''};

  if (courseId && state.courses.length > 0){
    course = getCourseById(state.courses, courseId);
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {

  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
