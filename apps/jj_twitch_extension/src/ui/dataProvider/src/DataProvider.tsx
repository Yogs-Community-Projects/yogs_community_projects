import { ParentComponent } from 'solid-js'

import { DataContext, useDataHook } from './DataContext'
import { Firestore } from 'firebase/firestore'

const DataProvider: ParentComponent<{ db: Firestore }> = props => {
  const hook = useDataHook(props.db)
  return <DataContext.Provider value={hook}>{props.children}</DataContext.Provider>
}

export default DataProvider
