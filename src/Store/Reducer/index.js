import { createStore, combineReducers } from "redux";
import { registerBooks } from "./registerBooks";


const rootReducer = combineReducers({
    registerBooks,

})


export default function configureStore() {
    const store = createStore(rootReducer);

    return {store}
}