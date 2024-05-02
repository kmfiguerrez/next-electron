import React, { createContext, useContext, useReducer } from "react"

enum Role {
  ADMIN,
  USER
}

type TUser = {
  id: string
  name?: string
  email: string
  image?: string
  role: Role
  position: string
}

type TUserState = TUser | null

type TCurrentUserContext = {
  state: TUserState
  dispatch: React.Dispatch<TAction>
}


// Define user context.
const CurrentUserContext = createContext<TCurrentUserContext | null>(null)


// Context provider.
const initialState: TUserState = null

const CurrentUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userState, dispatch] = useReducer(userReducer, initialState);

  return (
    <CurrentUserContext.Provider value={{state: userState, dispatch: dispatch}}>
        {children}
    </CurrentUserContext.Provider>
  )
}

export default CurrentUserProvider


// Reducer function
type TsignInAction = {
  type: "signIn"
  payload: {user: TUser}
}

type TsignOutAction = {
  type: "signOut"
}

type TAction = TsignInAction | TsignOutAction

const userReducer = (userState: TUserState, action: TAction): TUserState => {
  switch (action.type) {
    case "signIn": {
      return action.payload.user
    }
    case "signOut": {
      return null
    }
    default:
      console.log("Something went wrong")
      throw new Error("Unknown action")
  }
}


// Custom hooks
export const useCurrentUserContext = () => {
  const context = useContext(CurrentUserContext)

  // Custom hooks can only be used inside the providers.
  if (!context) {
    throw new Error("useCurrentUserContext must be used inside CurrentUserProvider")
  }

  return context
}