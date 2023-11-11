import { useContext } from 'solid-js'
import { DataContext } from './DataContext'

export const useData = () => useContext(DataContext)
