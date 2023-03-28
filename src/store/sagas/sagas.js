import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { API_CALL_REQUEST } from '../actions/asyncActions';


// SAGA Watcher
// Listens to API_CALL_REQUEST actions
export function* watcherSaga(){
    yield takeLatest(API_CALL_REQUEST, workerSaga)
}

// WORKER SAGA
// Is called from watcher Saga, does the Login and Dispaches an action
export function* workerSaga(action){
    try {
        const response = yield call(fetchHttp(action.payload.request))
        const token = response.data.token;
        yield put({
            type: action.payload.okAction, // API_CALL_SUCCESS
            payload: {
                token: token
            }
        });
    } catch (error) {
        yield put({
            type: action.payload.failAction, // API_CALL_FAILURE
            payload: {
                error: error
            }
        });
    }
}

function fetchHttp(request){
    return function(){
        return(axios(request))
    }
}