import { useYcFirebase } from './YCFirebaseProvider'

export const useFirestore = () => useYcFirebase().firestore
