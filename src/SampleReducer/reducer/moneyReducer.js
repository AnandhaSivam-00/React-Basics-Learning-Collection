export const moneyReducer = (state, action) => {
    if(action.type === 'DEPOSIT') {
        return {money: state.money + 100}
    }
    else if(action.type === 'WITHDRAW') {
        return {money: state.money - 50}
    }
    else {
        return state;
    }
}