import { useReducer } from "react";
import DigitBtn from './Digit';
import OperandBtn from "./Operation";
import '../src/styles.css';

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  REMOVE_DIGIT: "remove-digit",
  CLEAR: "clear",
  EVALUATE: "evaluate",
  CHOOSE_OPERATION: "choose-operation",
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === 0 && state.currentOperand === 0) {
        return state
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousNumber == null) {
        return state
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }

      if (state.previousNumber == null) {
        return {
          ...state,
          operation: payload.operation,
          previousNumber: state.currentOperand,
          currentOperand: null,
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      }
      return {
        ...state,
        previousNumber: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }
    case ACTIONS.REMOVE_DIGIT:
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      }

    case ACTIONS.CLEAR:
      return {}



    case ACTIONS.EVALUATE:
      if (state.operation === null || state.currentOperand === null || state.previousNumber === null) {
        return state
      }
      return {
        ...state,
        previousNumber: null,
        operation: null,
        currentOperand: evaluate(state)
      }

  }
}
function evaluate({ currentOperand, previousNumber, operation }) {
  const prev = parseFloat(previousNumber)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return ""
  let computation: ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
  }
  return computation.toString()

}
function App() {
  const [{ currentOperand, previousNumber, operation }, dispatch] = useReducer(
    reducer,
    {}
  )


  return (
    <>
      <nav className='nav-bar'>
        <div>
          <h3>React Calculator</h3>
        </div>
      </nav>
      <div className="calculator-grid">
        <div className="output">
          <div className="previous-number">{previousNumber}{operation}</div>
          <div className="current-number">{currentOperand}</div>
        </div>
        <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
        <button onClick={() => dispatch({ type: ACTIONS.REMOVE_DIGIT })}>DEL</button>
        <OperandBtn operation="÷" dispatch={dispatch} />
        <DigitBtn digit="1" dispatch={dispatch} />
        <DigitBtn digit="2" dispatch={dispatch} />
        <DigitBtn digit="3" dispatch={dispatch} />
        <OperandBtn operation="*" dispatch={dispatch} />
        <DigitBtn digit="4" dispatch={dispatch} />
        <DigitBtn digit="5" dispatch={dispatch} />
        <DigitBtn digit="6" dispatch={dispatch} />
        <OperandBtn operation="+" dispatch={dispatch} />
        <DigitBtn digit="7" dispatch={dispatch} />
        <DigitBtn digit="8" dispatch={dispatch} />
        <DigitBtn digit="9" dispatch={dispatch} />
        <OperandBtn operation="-" dispatch={dispatch} />
        <DigitBtn digit="." dispatch={dispatch} />
        <DigitBtn digit="0" dispatch={dispatch} />
        <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
      </div>
      <footer className="footer">
        <p className="prr">Made by Matias Valdez using React Hooks and Css</p>
      <div className="link"></div>
      </footer>
    </>);
}

export default App;
