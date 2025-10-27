import React from 'react'
import { Link } from 'react-router-dom'

const NewHero = () => (
  <section className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-cyan-200 to-purple-200 p-8">
    {/* Glassy Navbar */}
    <nav className="absolute top-8 left-0 right-0 mx-auto max-w-5xl flex items-center justify-between px-6 py-4 rounded-2xl bg-white bg-opacity-50 backdrop-blur-md shadow-lg z-10">
      <span className="text-2xl font-bold text-cyan-700 tracking-tight">ResumeAI</span>
      <div className="flex gap-6 text-lg">
        <Link to="/" className="hover:text-cyan-600 transition">Home</Link>
        <Link to="/dashboard" className="hover:text-purple-600 transition">Dashboard</Link>
        <Link to="/features" className="hover:text-blue-600 transition">Features</Link>
        <Link to="/contact" className="hover:text-cyan-700 transition">Contact</Link>
      </div>
      <Link to="/login" className="bg-gradient-to-r from-cyan-400 to-purple-400 text-white px-6 py-2 rounded-xl shadow hover:scale-105 transition font-semibold">Login</Link>
    </nav>

    {/* Hero Content */}
    <div className="w-full max-w-3xl text-center mt-28 mb-16 px-4 py-12 rounded-3xl bg-white bg-opacity-70 shadow-xl backdrop-blur-lg border border-cyan-100 border-opacity-40">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 mb-4 drop-shadow-lg">Build Stunning Resumes with AI</h1>
      <p className="text-xl text-gray-700 mb-7">Create, edit, and download professional portfolios in a snap.<br />ATS-optimized. Free forever.</p>
      <div className="flex flex-col md:flex-row gap-5 justify-center mt-9">
        <Link to="/dashboard" className="px-7 py-3 font-bold rounded-lg bg-gradient-to-r from-cyan-400 to-purple-400 text-white shadow hover:scale-105 transition">Get Started</Link>
        <Link to="/demo" className="px-7 py-3 font-bold rounded-lg bg-white bg-opacity-80 text-cyan-600 shadow hover:bg-opacity-100 hover:scale-105 transition">Try Demo</Link>
      </div>
    </div>

    {/* Trusted logos bar */}
    <div className="flex gap-9 bg-white bg-opacity-60 rounded-xl px-8 py-3 shadow-lg mt-4 backdrop-blur-sm">
      <img src="https://saasly.prebuiltui.com/assets/companies-logo/instagram.svg" alt="Instagram" className="h-7 opacity-80" />
      <img src="https://saasly.prebuiltui.com/assets/companies-logo/framer.svg" alt="Framer" className="h-7 opacity-80" />
      <img src="https://saasly.prebuiltui.com/assets/companies-logo/microsoft.svg" alt="Microsoft" className="h-7 opacity-80" />
      <img src="https://saasly.prebuiltui.com/assets/companies-logo/walmart.svg" alt="Walmart" className="h-7 opacity-80" />
    </div>
  </section>
)
export default NewHero