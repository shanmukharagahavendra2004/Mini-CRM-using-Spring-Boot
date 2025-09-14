import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div className="bg-lime-500 text-white font-bold text-3xl sm:text-4xl p-2 flex flex-col sm:flex-row justify-between items-center">
        <div className="ml-0 sm:ml-5 mb-2 sm:mb-0">
          <h1 className="text-center sm:text-left">CRM Application</h1>
        </div>
        <div className="mr-0 sm:mr-5">
          <div className="flex flex-col sm:flex-row gap-2">
            <Link className="border-2 text-xl sm:text-xl font-normal p-2 w-full sm:w-24 text-center rounded" to="/Register">
              Register
            </Link>
            <Link className="border-2 text-xl sm:text-xl font-normal p-2 w-full sm:w-24 text-center rounded" to="/Login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
