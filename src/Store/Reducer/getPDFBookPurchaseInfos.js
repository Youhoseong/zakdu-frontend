

const INITIAL_STATE = {

    purchaseDto: {
        purchasePageList: [],
        pageCount: 0
    }
}

export const getPDFBookPurchaseInfos = (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case "BOOK_PURCHASE_GET":
            if(action.key === "purchasePageList") {
                return {
                    purchaseDto: {
                        ...state.purchaseDto,
                        purchasePageList: action.payload
                    }
                }
            }
            else if(action.key === "pageCount") {
                return {
                    purchaseDto: {
                        ...state.purchaseDto,
                        pageCount: action.payload
                    }
                }
            }

        default:
            return state;
    }
    
}