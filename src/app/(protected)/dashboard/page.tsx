"use client"

import { useRouter } from 'next/navigation'

import { useCurrentUserContext } from "@/components/providers/current-user/user-context"

import { Button } from "@/components/ui/button"



const DashboardPage = () => {
  const router = useRouter()

  const { state, dispatch } = useCurrentUserContext()
  const currentUser = JSON.stringify(state)

  return (
    <div>
      <p>Current user: {currentUser}</p>
      <Button onClick={() => {
        dispatch({
          type: "signOut"
        })

        router.push("/login")
      }}>
        Logout
      </Button>
    </div>
  )
}

export default DashboardPage