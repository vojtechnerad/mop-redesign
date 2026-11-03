import { useState } from 'react'
import Checkbox from './components/Checkbox'

const teams = [
  { id: 'design', label: 'Design', description: 'Product and visual design' },
  { id: 'engineering', label: 'Engineering', description: 'Development and delivery' },
  { id: 'operations', label: 'Operations', description: 'Planning and coordination' },
]

function CheckboxPreview({ theme }: { theme: 'light' | 'dark' }) {
  const [selected, setSelected] = useState(['design'])
  const allSelected = selected.length === teams.length
  const partiallySelected = selected.length > 0 && !allSelected
  const isDark = theme === 'dark'

  return (
    <section
      aria-labelledby={`${theme}-heading`}
      className={`border-t px-6 py-10 sm:px-10 ${isDark ? 'border-neutral-800 bg-neutral-950 text-neutral-50' : 'border-neutral-100 bg-white text-neutral-900'}`}
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[180px_1fr]">
        <h2 id={`${theme}-heading`} className="text-lg font-semibold">
          {isDark ? 'Dark theme' : 'Light theme'}
        </h2>
        <div className="grid gap-10 sm:grid-cols-2">
          <fieldset className="flex min-w-0 flex-col gap-6">
            <legend className={`mb-6 text-xs font-medium ${isDark ? 'text-neutral-200' : 'text-neutral-600'}`}>
              Teams
            </legend>
            <Checkbox
              label="All teams"
              description={`${selected.length} of ${teams.length} selected`}
              checked={allSelected}
              indeterminate={partiallySelected}
              onChange={event => setSelected(event.target.checked ? teams.map(team => team.id) : [])}
              theme={theme}
              data-testid={`${theme}-all`}
            />
            <div className={`flex flex-col gap-6 border-t pt-6 ${isDark ? 'border-neutral-800' : 'border-neutral-100'}`}>
              {teams.map(team => (
                <Checkbox
                  key={team.id}
                  label={team.label}
                  description={team.description}
                  name={`${theme}-teams`}
                  value={team.id}
                  checked={selected.includes(team.id)}
                  onChange={event => setSelected(current => event.target.checked
                    ? [...current, team.id]
                    : current.filter(id => id !== team.id))}
                  theme={theme}
                  data-testid={`${theme}-${team.id}`}
                />
              ))}
            </div>
          </fieldset>
          <fieldset className="flex min-w-0 flex-col gap-6">
            <legend className={`mb-6 text-xs font-medium ${isDark ? 'text-neutral-200' : 'text-neutral-600'}`}>
              Disabled
            </legend>
            <Checkbox label="Checkbox label" description="Supporting description" disabled theme={theme} data-testid={`${theme}-disabled-unchecked`} />
            <Checkbox label="Checkbox label" description="Supporting description" defaultChecked disabled theme={theme} data-testid={`${theme}-disabled-checked`} />
            <Checkbox label="Checkbox label" description="Supporting description" indeterminate disabled theme={theme} data-testid={`${theme}-disabled-mixed`} />
          </fieldset>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <header className="px-6 py-10 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 text-xs font-medium text-neutral-600">mop redesign</p>
          <h1 className="text-4xl font-semibold">Checkbox</h1>
        </div>
      </header>
      <CheckboxPreview theme="light" />
      <CheckboxPreview theme="dark" />
    </main>
  )
}