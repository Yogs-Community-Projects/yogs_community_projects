import { createContext, ParentComponent, useContext } from 'solid-js'

export enum Env {
  mobile,
  desktop,
}
const EnvContext = createContext<Env>()

export const EnvProvider: ParentComponent<{ env: Env }> = props => {
  return <EnvContext.Provider value={props.env}>{props.children}</EnvContext.Provider>
}
export const useEnv = () => useContext(EnvContext)!
