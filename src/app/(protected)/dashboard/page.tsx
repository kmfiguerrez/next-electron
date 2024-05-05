"use client"

import { useCurrentUserContext } from "@/components/providers/current-user/user-context"

const DashboardPage = () => {
  const { state } = useCurrentUserContext()
  const currentUser = JSON.stringify(state)

  return (
    <div>
      <p>Current user: {currentUser}</p>
    </div>
  )
}

export default DashboardPage