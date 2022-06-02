import { combineReducers } from "redux";

import { photoReducer } from "./photo";
import { uploadReducer } from "./upload";
import { commentReducer } from "./comment";

export const rootReducer = combineReducers({
  photo: photoReducer,
  upload: uploadReducer,
  comment: commentReducer,
})