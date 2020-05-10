import {useContext} from 'react'
import {BRIDGE} from "../commom/index";

export function useDispatch() {
    const store = useContext(BRIDGE.context)
    return store.dispatch
}
