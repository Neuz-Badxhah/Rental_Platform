import React from "react"
import { Link } from "react-router-dom"
import Button from "@/components/common/Button"

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <h1 className="text-5xl font-bold mb-4">Welcome to RentalPlatform</h1>
      <p className="text-xl mb-8">Find the perfect rental property or list your property with us.</p>
      
      <div className="flex gap-4">
        <Link to="/login"><Button>Login</Button></Link>
        <Link to="/register"><Button>Register</Button></Link>
      </div>
    </div>
  )
}

export default LandingPage
