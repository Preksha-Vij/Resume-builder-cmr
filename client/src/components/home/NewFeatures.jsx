// src/components/home/NewFeatures.jsx
import React from 'react'
import { Sparkle, Monitor, Download } from 'lucide-react'

const features = [
  {
    title: "Instant AI Generation",
    desc: "Generate beautiful portfolios instantly using smart AI tech.",
    icon: <Sparkle className="h-8 w-8 text-cyan-400" />
  },
  {
    title: "ATS-Optimized Templates",
    desc: "Built to pass automated resume screeners—100% job ready.",
    icon: <Monitor className="h-8 w-8 text-purple-400" />
  },
  {
    title: "Realtime Preview",
    desc: "Live update and preview your edits before downloading.",
    icon: <Download className="h-8 w-8 text-blue-400" />
  }
]

const NewFeatures = () => (
  <section className="max-w-5xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-3 gap-9">
    {features.map(({ title, desc, icon }, i) => (
      <div key={i}
        className="rounded-2xl bg-white bg-opacity-80 backdrop-blur-md shadow-2xl p-8 flex flex-col items-center text-center transition hover:scale-105 hover:shadow-cyan-200/40">
        <div className="mb-5">{icon}</div>
        <h3 className="text-2xl font-bold text-cyan-600 mb-2 bg-clip-text">{title}</h3>
        <p className="text-gray-700">{desc}</p>
      </div>
    ))}
  </section>
)
export default NewFeatures
