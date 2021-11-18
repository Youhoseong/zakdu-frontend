import { createStore, combineReducers } from "redux";
import { registerBooks } from "./registerBooks";
import { getBooks } from "./getBooks";

const rootReducer = combineReducers({
    registerBooks,
    getBooks,
})


export default function configureStore() {
    const store = createStore(rootReducer);

    return {store}
}