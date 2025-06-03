import { Menu, Send } from "lucide-react"
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
    <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center cursor-pointer" 
                onClick={() => {    
                    navigate("/")
                }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">PayWallet</span>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => {
                    navigate("/signin")
                }}
              >Sign In</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => {
                    navigate("/signup")
                }}
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-2 pt-4">
                  <button className="text-gray-600 hover:text-gray-900 text-left"
                    onClick={() => {
                        navigate("/signin")
                    }}
                  >Sign In</button>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
                    onClick={() => {
                        navigate("/signup")
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
    </header>
    )
}