import {createContext, PropsWithChildren, useContext} from "react";
import {RootStore} from "@src/app/stores/rootStore";

const defaultValue = new RootStore()
const RootContext = createContext(defaultValue)

export const useRootContext = () => useContext(RootContext)

export const RootProvider = (p: PropsWithChildren) => {
    return (
        <RootContext.Provider value={defaultValue}>
            {p.children}
        </RootContext.Provider>
    );
};