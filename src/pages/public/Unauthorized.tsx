import React from "react"
import { Link } from "react-router-dom"
import Button from "@/components/common/Button"

const Unauthorized: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <h1 className="text-5xl font-bold mb-4">403</h1>
      <p className="text-xl mb-6">You are not authorized to view this page.</p>
      <Link to="/"><Button>Go to Home</Button></Link>
    </div>
  )
}

export default Unauthorized
