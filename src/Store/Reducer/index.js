import { createStore, combineReducers } from "redux";
import { registerBooks } from "./registerBooks";
import { getBooks } from "./getBooks";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
    registerBooks,
    getBooks,
    userReducer,
})


export default function configureStore() {
    const store = createStore(rootReducer);

    return {store}
}