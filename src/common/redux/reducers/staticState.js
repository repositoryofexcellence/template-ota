const initialState = {
    startDate:"2018-05-19",
    endDate:"2018-05-20",
    childAges:[[15],[13]],
    adultNum:2,
    childNum:2,
    location:""
};

export function staticState(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}