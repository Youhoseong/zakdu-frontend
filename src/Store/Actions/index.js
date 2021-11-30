


export const registerBook = (key, value) => ({
    type: "BOOK_DATA_ADD",
    key: key,
    payload: value
});

export const getBook = (key, value) => ({
    type: "BOOK_DATA_GET",
    key: key,
    payload: value
});

export const getPDFBookPurchaseInfo = (key, value ) =>({
    type: 'BOOK_PURCHASE_GET',
    key: key,
    payload: value
});