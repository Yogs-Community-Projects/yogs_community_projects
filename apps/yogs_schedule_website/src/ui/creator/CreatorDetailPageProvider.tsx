import { createContext, ParentComponent, useContext } from 'solid-js'
import Color from 'colorjs.io'
import { CreatorData } from '@ycapp/model'
import { generateHexColorPallet } from '@ycapp/common'

interface CreatorDataContextProps {
  creator: CreatorData
}

const CreatorDataContext = createContext<CreatorDataContextProps>()
export const CreatorDetailProvider: ParentComponent<CreatorDataContextProps> = props => {
  return (
    <CreatorDataContext.Provider
      value={{
        creator: props.creator,
      }}
    >
      {props.children}
    </CreatorDataContext.Provider>
  )
}
export const useCreator = () => useContext(CreatorDataContext)!.creator

export const useStyle = () => useCreator().style
export const useLinks = () => useCreator().links

export const useCreatorRelations = () => useCreator().creator.relations

const primaryColorString = () => {
  const style = useStyle()
  return '#' + style.primaryColor.substring(2) + style.primaryColor.substring(0, 2)
}
const accentColorString = () => {
  const style = useStyle()
  return '#' + style.accentColor.substring(2) + style.accentColor.substring(0, 2)
}
export const usePrimary = () => new Color(primaryColorString())
export const useAccent = () => new Color(accentColorString())
export const usePrimaryPallet = () => generateHexColorPallet(usePrimary())
export const useAccentPallet = () => generateHexColorPallet(useAccent())
