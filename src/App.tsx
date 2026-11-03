import { useState } from 'react'
import Checkbox from './components/Checkbox'
import Input from './components/Input'
import Switch from './components/Switch'
import { useTheme } from './Theme'

const teams = [
  { id: 'design', label: 'Design', description: 'Product and visual design' },
  { id: 'engineering', label: 'Engineering', description: 'Development and delivery' },
  { id: 'operations', label: 'Operations', description: 'Planning and coordination' },
]

function CheckboxPreview() {
  const [selected, setSelected] = useState(['design'])
  const allSelected = selected.length === teams.length
  const partiallySelected = selected.length > 0 && !allSelected

  return (
    <section
      aria-labelledby="checkbox-examples-heading"
      className="border-t border-neutral-100 px-6 py-10 sm:px-10 dark:border-neutral-800"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[180px_1fr]">
        <h2 id="checkbox-examples-heading" className="text-lg font-semibold">
          Checkbox
        </h2>
        <div className="grid gap-10 sm:grid-cols-2">
          <fieldset className="flex min-w-0 flex-col gap-6">
            <legend className="mb-6 text-xs font-medium text-neutral-600 dark:text-neutral-200">
              Teams
            </legend>
            <Checkbox
              label="All teams"
              description={`${selected.length} of ${teams.length} selected`}
              checked={allSelected}
              indeterminate={partiallySelected}
              onChange={event => setSelected(event.target.checked ? teams.map(team => team.id) : [])}
              data-testid="all"
            />
            <div className="flex flex-col gap-6 border-t border-neutral-100 pt-6 dark:border-neutral-800">
              {teams.map(team => (
                <Checkbox
                  key={team.id}
                  label={team.label}
                  description={team.description}
                  name="teams"
                  value={team.id}
                  checked={selected.includes(team.id)}
                  onChange={event => setSelected(current => event.target.checked
                    ? [...current, team.id]
                    : current.filter(id => id !== team.id))}
                  data-testid={team.id}
                />
              ))}
            </div>
          </fieldset>
          <fieldset className="flex min-w-0 flex-col gap-6">
            <legend className="mb-6 text-xs font-medium text-neutral-600 dark:text-neutral-200">
              Disabled
            </legend>
            <Checkbox label="Checkbox label" description="Supporting description" disabled data-testid="disabled-unchecked" />
            <Checkbox label="Checkbox label" description="Supporting description" defaultChecked disabled data-testid="disabled-checked" />
            <Checkbox label="Checkbox label" description="Supporting description" indeterminate disabled data-testid="disabled-mixed" />
          </fieldset>
        </div>
      </div>
    </section>
  )
}

function SwitchPreview() {
  return (
    <section
      aria-labelledby="switch-examples-heading"
      className="border-t border-neutral-100 px-6 py-10 sm:px-10 dark:border-neutral-800"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[180px_1fr]">
        <h2 id="switch-examples-heading" className="text-lg font-semibold">
          Switch
        </h2>
        <div className="grid gap-10 sm:grid-cols-2">
          <Switch
            className="place-self-start"
            label="Switch label"
            description="Supporting description"
            name="notifications"
            data-testid="switch-active"
          />
          <fieldset className="flex min-w-0 flex-col gap-6">
            <legend className="mb-6 text-xs font-medium text-neutral-600 dark:text-neutral-200">
              Disabled
            </legend>
            <Switch label="Switch label" description="Supporting description" defaultChecked disabled data-testid="switch-disabled-on" />
            <Switch label="Switch label" description="Supporting description" disabled data-testid="switch-disabled-off" />
          </fieldset>
        </div>
      </div>
    </section>
  )
}

function InputPreview() {
  return (
    <section
      aria-labelledby="input-examples-heading"
      className="border-t border-neutral-100 px-6 py-10 sm:px-10 dark:border-neutral-800"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[180px_1fr]">
        <h2 id="input-examples-heading" className="text-lg font-semibold">
          Input
        </h2>
        <div className="grid gap-10 sm:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-6">
            <Input label="Default" description="Supporting text" placeholder="Text" name="input-default" />
            <Input label="Error" description="Please check the entered value." placeholder="Text" status="error" name="input-error" />
            <Input label="Success" description="The value is valid." placeholder="Text" status="success" name="input-success" />
            <Input label="Read only" description="This value cannot be edited." defaultValue="Read-only value" readOnly />
          </div>
          <div className="flex min-w-0 flex-col gap-6">
            <Input label="Disabled" description="Supporting text" placeholder="Text" disabled />
            <Input label="Disabled error" description="Supporting text" placeholder="Text" status="error" disabled />
            <Input label="Disabled success" description="Supporting text" placeholder="Text" status="success" disabled />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <header className="px-6 py-10 sm:px-10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-medium text-neutral-600 dark:text-neutral-200">mop redesign</p>
            <h1 className="text-4xl font-semibold">Components</h1>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="flex h-10 w-28 shrink-0 cursor-pointer items-center justify-center rounded-md border-1 border-neutral-100 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-300/40 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800"
          >
            {theme === 'dark' ? 'Light theme' : 'Dark theme'}
          </button>
        </div>
      </header>
      <CheckboxPreview />
      <SwitchPreview />
      <InputPreview />
    </main>
  )
}