import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== rePassword) {
      alert("Password and Re-entered password do not match")
      return
    }
    const user = { name: userName, email, password }
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", user)
      console.log(res.data)
      // clear fields
      setUserName("")
      setEmail("")
      setPassword("")
      setRePassword("")
      // ✅ redirect to login page
      navigate("/login")
    } catch (err) {
      console.error(err.response?.data || err.message)
      alert(err.response?.data?.message || "Registration failed")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <form className="flex flex-col gap-4 p-6 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
          <input
            className="border-2 border-black w-full h-10 p-2 focus:outline-none focus:border-blue-500 rounded"
            type="text"
            placeholder="Enter Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="border-2 border-black w-full h-10 p-2 focus:outline-none focus:border-blue-500 rounded"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border-2 border-black w-full h-10 p-2 focus:outline-none focus:border-blue-500 rounded"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="border-2 border-black w-full h-10 p-2 focus:outline-none focus:border-blue-500 rounded"
            type="password"
            placeholder="Re-enter Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
          <button
            className="border-2 border-black w-full h-10 p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
