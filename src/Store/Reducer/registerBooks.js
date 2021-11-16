

const INITIAL_STATE = {

    bookRegisterObj: {
        bookFile: "",
        bookPDFTocStartPage: "",
        bookPDFTocEndPage: "",
        bookPDFRowCount: "",
        bookCategory: "",
        bookCover: "",
        bookName: "",
        bookAuthor: "",
        bookPublisher: "",
        bookPubDate: new Date(),
        bookIntro: "",
        bookPrice: "",
        bookRealFirstTocPage: 1,
        bookTocResult: "",
        bookMarkExist: false
    }
}

export const registerBooks = (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case "BOOK_DATA_ADD":
            console.log('어라라');
            if(action.key== "bookFile") {
                return {
                    bookRegisterObj: {
                        ...state.bookRegisterObj,
                        bookFile: action.payload
                    }
                }
            }
            else if(action.key == "bookPDFTocStartPage") {
                return {
                    bookRegisterObj: {
                        ...state.bookRegisterObj,
                        bookPDFTocStartPage: action.payload
                    }
                }
            }
            else if(action.key == "bookPDFTocEndPage") {
                return {
                    bookRegisterObj: {
                        ...state.bookRegisterObj,
                        bookPDFTocEndPage: action.payload
                    }
                }
            }
            else if(action.key == "bookPDFRowCount") {
                return {
                    bookRegisterObj: {
                        ...state.bookRegisterObj,
                        bookPDFRowCount: action.payload
                    }
                }
            }

            else if(action.key == "bookCategory") {
                return {
                    bookRegisterObj: {
                        ...state.bookRegisterObj,
                        bookCategory: action.payload
                    }
                }
            }
            else if(action.key == "bookCover") {
                return {
                    bookRegisterObj: {
                        ...state.bookRegisterObj,
                        bookCover: action.payload
                    }
                }
            }
            else if(action.key == "bookName") {
                return {
                    bookRegisterObj: {
                        ...state.bookRegisterObj,
                        bookName: action.payload
                    }
                }
            }
            else if(action.key == "bookAuthor") {
                return {
                    bookRegisterObj: {
                        ...state.bookRegisterObj,
                        bookAuthor: action.payload
                    }
                }
            }
            else if(action.key == "bookPublisher") {
                return {
                    bookRegisterObj: {
                        ...state.bookRegisterObj,
                        bookPublisher: action.payload
                    }
                }
            }
            else if(action.key == "bookPubDate") {
                return {
                    bookRegisterObj: {
                        ...state.bookRegisterObj,
                        bookPubDate: action.payload
                    }
                }
            }
            else if(action.key == "bookIntro") {
                return {
                    bookRegisterObj: {
                        ...state.bookRegisterObj,
                        bookIntro: action.payload
                    }
                }
            }
            else if(action.key == "bookPrice") {
                return {
                    bookRegisterObj: {
                        ...state.bookRegisterObj,
                        bookPrice: action.payload
                    }
                }
            }
            else if(action.key == "bookPageDiff") {
                return {
                    bookRegisterObj: {
                        ...state.bookRegisterObj,
                        bookPageDiff: action.payload
                    }
                }
            }
            else if(action.key == "bookTocResult") {
                return {
                    bookRegisterObj: {
                        ...state.bookRegisterObj,
                        bookTocResult: action.payload
                    }
                }
            }
            else if(action.key == "bookMarkExist") {
                return {
                    bookRegisterObj: {
                        ...state.bookRegisterObj,
                        bookMarkExist: action.payload
                    }
                }
            }



        default:
            return state;
    }
    
}