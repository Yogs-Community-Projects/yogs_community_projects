import { ParentComponent } from 'solid-js'

import { DataContext, useDataHook } from './DataContext'

const DataProvider: ParentComponent = props => {
  const hook = useDataHook()
  return <DataContext.Provider value={hook}>{props.children}</DataContext.Provider>
}

export default DataProvider
