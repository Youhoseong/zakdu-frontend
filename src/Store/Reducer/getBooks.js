

const INITIAL_STATE = {

    bookObj: {
       allBook: [],
       workBook: [],
       majorBook: [],
       otherBook: [],
    }
}

export const getBooks = (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case "BOOK_DATA_GET":

            if(action.key === 'allBook') {
                return {
                    bookObj: {
                        ...state.bookObj,
                        allBook: action.payload
                    }
                }
            }
            else if(action.key === 'workBook') {
                console.log('reducer: ' + '워크북');
                return {
                    bookObj: {
                        ...state.bookObj,
                        workBook: action.payload
                    }
                }
            }            
            else if(action.key === 'majorBook') {
                return {
                    bookObj: {
                        ...state.bookObj,
                        majorBook: action.payload
                    }
                }
            }

            else if(action.key === 'otherBook') {
                return {
                    bookObj: {
                        ...state.bookObj,
                        otherBook: action.payload
                    }
                }
            }
           


        default:
            return state;
    }
    
}