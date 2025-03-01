import React, { useReducer } from 'react'
import { moneyReducer } from './reducer/moneyReducer';

const Wallet = () => {
    const initialState = {money: 200};
    const [state, dispatch] = useReducer(moneyReducer, initialState);

  return (
    <div>
        <h2>Current Wallet State</h2>
        <h4><i>$ {state.money}</i></h4>
        <div>
            <button onClick={() => dispatch({type: 'DEPOSIT'})}>Deposit</button>
            <button onClick={() => dispatch({type: 'WITHDRAW'})}>Withdraw</button>
        </div>
    </div>
  )
}

export default Wallet