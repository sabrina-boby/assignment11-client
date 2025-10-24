import React from 'react'
import { NavLink } from 'react-router'

const ErrorPage = () => {
  return (
    <div>
      <div className="bg-base-200 ">
        <div className="w-[1200px] mx-auto text-center py-20">
          <div className="bg-white px-30 py-20 rounded-2xl">
            <h2 className="text-3xl font-bold">Page Not Found</h2>
            
            <NavLink to="/" className="btn btn-primary mt-10">
              Go to Home page
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
