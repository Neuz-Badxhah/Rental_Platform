import React from "react"
import { Link } from "react-router-dom"
import Button from "@/components/common/Button"

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Page Not Found</p>
      <Link to="/"><Button>Go to Home</Button></Link>
    </div>
  )
}

export default NotFound
