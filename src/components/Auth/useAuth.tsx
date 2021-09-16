import Firebase from 'firebase'
import { FC, createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import firebase from '../../Firebase'

type AuthContextProps = {
  currentUser: Firebase.User | null | undefined
}

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined })

const AuthProvider: FC = ({ children }) => {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<Firebase.User | null | undefined>(undefined)

  useEffect(() => {
    // ログイン状態が変化するとfirebaseのauthメソッドを呼び出す
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      if (user == null) router.push('/')
    })
  }, [])

  /* 下階層のコンポーネントをラップする */
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const { currentUser } = useContext(AuthContext)

  return [currentUser]
}

export { useAuth, AuthContext, AuthProvider }
