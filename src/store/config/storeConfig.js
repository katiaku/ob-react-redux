import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from '../reducers/rootReducer';
import { watcherSaga } from '../sagas/sagas';

// createStore is deprecated. Should be using the configureStore method of the @reduxjs/toolkit package

export const createAppStore = () => {
    let store = createStore(rootReducer, composeWithDevTools());
    return store;
}

export const createAppAsyncStore = () => {

    const sagaMiddleware = createSagaMiddleware();

    let store = createStore(
        rootReducer,
        compose(
            applyMiddleware(sagaMiddleware), 
            composeWithDevTools()
        )
        );
    
    // Init the Watcher Saga
    sagaMiddleware.run(watcherSaga);

    return store;
}