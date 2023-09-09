import React from 'react'

interface ProtectedRouteProps {
    isUserLoggedIn: boolean;
    loadingSpinnerCondition: boolean;
    Component: any;
  }
  

const ProtectedRoute = ({
isUserLoggedIn,
loadingSpinnerCondition,
Component
}:ProtectedRouteProps) => {
  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute