import React, { useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'

import { orderPizza } from '../redux/actions/pizzaActions'
import { orderBurger } from '../redux/actions/burgerActions'

import '../ReduxApp.module.css'

// const PizzaUI = (props) => {
//   console.log(props);

//   return (
//     <div className='d-flex flex-column justify-centent-center align-items-center m-auto'>
//         <h1 className='text-bold'>Pizza Shop</h1>
//         <p>Click the below button to order the Pizza</p>
//         <button 
//             className='m-0 p-2 btn btn-primary'
//             onClick={props.orderPizza}
//         >
//             Order Now
//         </button>
//         <h3 className='text-bold mt-3'>No.of Pizza Base available - {props.pizzaBase}</h3>
//     </div>
//   )
// }

// const mapStateToProps = (state) => {
//   return {
//     pizzaBase: state.pizzaBase
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     orderPizza: () => dispatch(orderPizza())
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(PizzaUI)


const PizzaUI = () => {
  const [quantity, setQuantity] = useState({
    pizzaOrder: 0,
    burgerOrder: 0
  });

  // To get the access of the state object
  const pizzaState = useSelector(state => state.pizza); 
  const burgerState = useSelector(state => state.burger);

  const dispatch = useDispatch(); // To access the redux dispatch references

  return (
    <div className='d-flex flex-column justify-centent-center align-items-center'>
      <div className='d-flex flex-column justify-centent-center align-items-center m-2 p-3 border rounded shadow'>
        <h1 className='text-bold'>Pizza Shop</h1>
        <p>Click the below button to order the Pizza</p>
        <div className='d-flex justify-content-center align-items-center gap-3'>
          <input 
            type='text'
            name='orders'
            placeholder='Enter Quantity'
            className='form-control'
            onChange={(e) => setQuantity({
              ...quantity,
              pizzaOrder: e.target.value
            })}
          />
          <button 
              className='m-1 p-2 btn btn-primary'
              onClick={() => dispatch(orderPizza(quantity.pizzaOrder))}
          >
              Order Now
          </button>
        </div>
        <h3 className='text-bold mt-3'>No.of Pizza Base available - {pizzaState.pizzaBase}</h3>
      </div>
      <div className='d-flex flex-column justify-centent-center align-items-center m-2 p-3 border rounded shadow'>
        <h1 className='text-bold'>Burger Shop</h1>
        <p>Click the below button to order the Burger</p>
        <div className='d-flex justify-content-center align-items-center gap-3'>
          <input 
            type='text'
            name='orders'
            id='orders'
            placeholder='Enter Quantity'
            className='form-control'
            onChange={(e) => setQuantity({
              ...quantity,
              burgerOrder: e.target.value
            })}
          />
          <button 
              className='m-1 p-2 btn btn-primary'
              onClick={() => dispatch(orderBurger(quantity.burgerOrder))}
          >
              Order Now
          </button>
        </div>
        <h3 className='text-bold mt-3'>No.of Burger Base available - {burgerState.burgerBase}</h3>
      </div>
    </div>
  )
}

export default PizzaUI;