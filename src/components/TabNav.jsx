import { cn } from '../lib/utils'

const TABS = [
  { id: 'generate', label: 'Generate Estimate' },
  { id: 'lab', label: 'Prompt Lab' },
]

export default function TabNav({ active, onChange }) {
  return (
    <nav
      className="flex items-end gap-0 px-6"
      style={{ backgroundColor: 'var(--navy)' }}
      role="tablist"
    >
      {TABS.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative px-5 py-3.5 text-sm font-heading font-medium cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
              isActive
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200'
            )}
            style={{ minHeight: 44 }}
          >
            {tab.label}
            {isActive && (
              <span
                className="absolute bottom-0 left-5 right-5 h-0.5 rounded-t"
                style={{ backgroundColor: 'var(--cta)' }}
              />
            )}
          </button>
        )
      })}
    </nav>
  )
}
