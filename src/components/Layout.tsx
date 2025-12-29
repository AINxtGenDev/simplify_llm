import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Sigma, Brain, Layers, Github } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

const navItems = [
  { path: '/', label: 'Start', icon: Home },
  { path: '/softmax', label: 'Softmax', icon: Sigma },
  { path: '/attention', label: 'Attention', icon: Brain },
  { path: '/transformer', label: 'Transformer', icon: Layers },
]

export function Layout({ children }: LayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="font-bold text-xl gradient-text hidden sm:block">
                Simplify LLM
              </span>
            </Link>

            <div className="flex items-center gap-1 sm:gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      relative px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                      ${isActive
                        ? 'text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-pink-600/50 rounded-xl"
                        transition={{ type: 'spring', duration: 0.5 }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      <Icon size={18} />
                      <span className="hidden sm:inline">{item.label}</span>
                    </span>
                  </Link>
                )
              })}

              <a
                href="https://github.com/AINxtGenDev/simplify_llm"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 p-2 text-white/60 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-20 pb-12">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="glass-card border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/60 text-sm">
            Simplify LLM - Interaktive Erklärung von Large Language Models
          </p>
          <p className="text-white/40 text-xs mt-2">
            Basierend auf dem Paper "Attention is All You Need" (Vaswani et al., 2017)
          </p>
        </div>
      </footer>
    </div>
  )
}
