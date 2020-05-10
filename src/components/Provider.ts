import {createElement} from "react";
import ReduxBridgeContext from "./Context";
import {BRIDGE} from "../commom/index";

export  function Provider({store,children,context}:any) {
    const Context=context||ReduxBridgeContext
    BRIDGE.context=Context
    return createElement(Context.Provider,{value:store},children)
}
