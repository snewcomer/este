import { takeEvery, takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import courseApi from '../api/mockCourseApi';
import authorApi from '../api/mockAuthorApi';
import { LOAD_COURSES_SUCCESS, LOAD_COURSES, LOAD_AUTHORS,
  LOAD_AUTHORS_SUCCESS, SAVE_COURSE, SAVE_COURSE_SUCCESS, SAVE_COURSE_FAILED,
  BEGIN_AJAX_CALL, AJAX_CALL_ERROR, REDIRECT
} from '../actions/types';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* loadCourses(action) {
   try {
      //put({type: BEGIN_AJAX_CALL});
      const courses = yield call(courseApi.getAllCourses);
      yield put({type: LOAD_COURSES_SUCCESS, courses: courses});
   } catch (e) {
      throw(e);
      //yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}
