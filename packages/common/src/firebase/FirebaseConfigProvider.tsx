import { createContext, ParentComponent, useContext } from 'solid-js'
import { FirebaseOptions } from '@firebase/app'

interface FirebaseConfigProps {
  config?: FirebaseOptions
}

const YcFirebaseConfigContext = createContext<FirebaseOptions | undefined>()

export const YcFirebaseConfigProvider: ParentComponent<FirebaseConfigProps> = props => {
  return <YcFirebaseConfigContext.Provider value={props.config}>{props.children}</YcFirebaseConfigContext.Provider>
}
export const useFirebaseConfig = () => useContext(YcFirebaseConfigContext)!
