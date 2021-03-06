import { routerReducer, LOCATION_CHANGE } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import login from 'modules/app/login/reducer';
import productCategories from 'modules/product-categories/reducer';
import products from 'modules/products/list/reducer';

const initialState = {
  location: null,
};

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return Object.assign({}, state, {
        location: action.payload
      });
    default:
      return state
  }
}

export default combineReducers({
  app: appReducer,
  auth: login,
  form: formReducer,
  routing: routerReducer,
  productCategories,
  products
});
