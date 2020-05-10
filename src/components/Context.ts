import {createContext} from "react";
const ReduxBridgeContext = createContext(null)
// @ts-ignore
if (process.env.NODE_ENV !== 'production') {
    ReduxBridgeContext.displayName = 'ReduxBridge'
}

export default ReduxBridgeContext
