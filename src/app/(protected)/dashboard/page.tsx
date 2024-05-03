"use client"

import { useCurrentUserContext } from "@/components/providers/current-user/user-context"

const DashboardPage = () => {
  const { state } = useCurrentUserContext()
  const currentUser = state

  return (
    <div>
      <p>Current user: {currentUser?.id}</p>
    </div>
  )
}

export default DashboardPage