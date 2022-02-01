import {ACTIONS} from "./App";

export default function OperandBtn({dispatch,operation}){
    return <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION ,payload: { operation }})}>{operation}</button>
}