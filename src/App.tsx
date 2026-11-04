import { useState } from 'react'
import Alert from './components/Alert'
import type { AlertTone } from './components/Alert'
import Avatar, { AvatarGroup } from './components/Avatar'
import Badge from './components/Badge'
import Button from './components/Button'
import Calendar from './components/Calendar'
import type { DateRange } from 'react-day-picker'
import Card from './components/Card'
import Checkbox from './components/Checkbox'
import {
  DropdownMenu,
  DropdownMenuButton,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './components/DropdownMenu'
import IconButton from './components/IconButton'
import Input from './components/Input'
import Sidebar, { SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarItem, SidebarProfile } from './components/Sidebar'
import Skeleton from './components/Skeleton'
import Spinner from './components/Spinner'
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

const alertExamples: { tone: AlertTone; title: string; description: string }[] = [
  { tone: 'info', title: 'Information', description: 'There is a new update available.' },
  { tone: 'success', title: 'Success', description: 'Your changes have been saved.' },
  { tone: 'warning', title: 'Warning', description: 'Please review your settings.' },
  { tone: 'error', title: 'Error', description: 'Something went wrong. Please try again.' },
]

function AlertPreview() {
  const [dismissed, setDismissed] = useState<AlertTone[]>([])

  return (
    <section
      aria-labelledby="alert-examples-heading"
      className="border-t border-neutral-100 px-6 py-10 sm:px-10 dark:border-neutral-800"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[180px_1fr]">
        <h2 id="alert-examples-heading" className="text-lg font-semibold">Alert</h2>
        <div className="flex min-w-0 flex-col items-start gap-6">
          {alertExamples.filter(example => !dismissed.includes(example.tone)).map(example => (
            <Alert
              key={example.tone}
              {...example}
              dismissLabel={`Dismiss ${example.tone} alert`}
              onDismiss={() => setDismissed(current => [...current, example.tone])}
            />
          ))}
          {dismissed.length > 0 && (
            <button
              type="button"
              onClick={() => setDismissed([])}
              className="cursor-pointer text-sm font-semibold text-brand-700 underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-300/40 dark:text-brand-500"
            >
              Restore alerts
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

function BadgePreview() {
  const [dismissed, setDismissed] = useState(false)

  return (
    <section
      aria-labelledby="badge-examples-heading"
      className="border-t border-neutral-100 px-6 py-10 sm:px-10 dark:border-neutral-800"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[180px_1fr]">
        <h2 id="badge-examples-heading" className="text-lg font-semibold">Badge</h2>
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-xs font-medium text-neutral-600 dark:text-neutral-200">Sizes</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Badge size="small">Small</Badge>
              <Badge>Default</Badge>
              <Badge size="large">Large</Badge>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-xs font-medium text-neutral-600 dark:text-neutral-200">Content</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone="secondary">Text</Badge>
              <Badge tone="secondary" icon={
                <>
                  <img src={`${import.meta.env.BASE_URL}badge-check-light.svg`} alt="" width="12" height="12" className="dark:hidden" />
                  <img src={`${import.meta.env.BASE_URL}badge-check-dark.svg`} alt="" width="12" height="12" className="hidden dark:block" />
                </>
              }>Icon</Badge>
              <Badge tone="secondary" dot>Dot</Badge>
              {dismissed ? (
                <button type="button" onClick={() => setDismissed(false)} className="cursor-pointer text-xs font-semibold text-brand-700 underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-300/40 dark:text-brand-500">Restore badge</button>
              ) : (
                <Badge tone="secondary" onDismiss={() => setDismissed(true)}>Dismissible</Badge>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-xs font-medium text-neutral-600 dark:text-neutral-200">Tones</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Default</Badge>
              <Badge tone="secondary">Secondary</Badge>
              <Badge tone="outline">Outline</Badge>
              <Badge tone="destructive">Destructive</Badge>
              <Badge tone="success">Success</Badge>
              <Badge tone="warning">Warning</Badge>
              <Badge tone="info">Info</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ButtonPreview() {
  const [clicks, setClicks] = useState(0)

  return (
    <section
      aria-labelledby="button-examples-heading"
      className="border-t border-neutral-100 px-6 py-10 sm:px-10 dark:border-neutral-800"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[180px_1fr]">
        <h2 id="button-examples-heading" className="text-lg font-semibold">Button</h2>
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-xs font-medium text-neutral-600 dark:text-neutral-200">Sizes</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="small">Small</Button>
              <Button onClick={() => setClicks(current => current + 1)}>Default</Button>
              <Button size="large">Large</Button>
              <Button size="icon" aria-label="Download" title="Download">
                <img src={`${import.meta.env.BASE_URL}button-icon.svg`} alt="" width="16" height="16" />
              </Button>
            </div>
            <span className="text-xs text-neutral-600 dark:text-neutral-200" aria-live="polite">{clicks > 0 && `Activated: ${clicks}`}</span>
          </div>
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-xs font-medium text-neutral-600 dark:text-neutral-200">Variants</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-xs font-medium text-neutral-600 dark:text-neutral-200">Content and states</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                leadingIcon={<img src={`${import.meta.env.BASE_URL}button-leading.svg`} alt="" width="16" height="16" />}
                trailingIcon={<img src={`${import.meta.env.BASE_URL}button-trailing.svg`} alt="" width="16" height="16" />}
              >With icons</Button>
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function IconButtonPreview() {
  const [clicks, setClicks] = useState(0)
  const icon = (
    <>
      <img src={`${import.meta.env.BASE_URL}icon-button-download-light.svg`} alt="" className="dark:hidden" />
      <img src={`${import.meta.env.BASE_URL}icon-button-download-dark.svg`} alt="" className="hidden dark:block" />
    </>
  )

  return (
    <section
      aria-labelledby="icon-button-examples-heading"
      className="border-t border-neutral-100 px-6 py-10 sm:px-10 dark:border-neutral-800"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[180px_1fr]">
        <h2 id="icon-button-examples-heading" className="text-lg font-semibold">Icon Button</h2>
        <div className="flex min-w-0 flex-wrap gap-10">
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-xs font-medium text-neutral-600 dark:text-neutral-200">Sizes</h3>
            <div className="flex items-center gap-3">
              <IconButton variant="outline" size="small" aria-label="Download, small" onClick={() => setClicks(current => current + 1)}>{icon}</IconButton>
              <IconButton variant="outline" aria-label="Download, medium" onClick={() => setClicks(current => current + 1)}>{icon}</IconButton>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-xs font-medium text-neutral-600 dark:text-neutral-200">States</h3>
            <div className="flex items-center gap-3">
              <IconButton aria-label="Download" onClick={() => setClicks(current => current + 1)}>{icon}</IconButton>
              <IconButton aria-label="Download unavailable" disabled>{icon}</IconButton>
            </div>
          </div>
          <span className="self-end text-xs text-neutral-600 dark:text-neutral-200" aria-live="polite">{clicks > 0 && `Activated: ${clicks}`}</span>
        </div>
      </div>
    </section>
  )
}

function CardPreview() {
  const [selection, setSelection] = useState('')

  return (
    <section
      aria-labelledby="card-examples-heading"
      className="border-t border-neutral-100 px-6 py-10 sm:px-10 dark:border-neutral-800"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[180px_1fr]">
        <h2 id="card-examples-heading" className="text-lg font-semibold">Card</h2>
        <div className="flex min-w-0 flex-col items-start gap-4">
          <div className="grid w-full min-w-0 gap-6 sm:grid-cols-2">
            <Card
              title="Workspace overview"
              description="A clear summary of your team's day."
              footer={
                <>
                  <Button onClick={() => setSelection('Accepted')}>Accept</Button>
                  <Button variant="ghost" onClick={() => setSelection('Rejected')}>Reject</Button>
                </>
              }
            >
              <p className="min-h-18">Three requests are ready for review. Your team can respond today.</p>
            </Card>
            <Card
              variant="borderless"
              title="Team schedule"
              description="Upcoming activity."
              headerAction={<Button variant="ghost" size="small" onClick={() => setSelection('Schedule opened')}>View</Button>}
            >
              <p>The next team meeting is scheduled for tomorrow.</p>
            </Card>
          </div>
          <span className="text-sm text-neutral-600 dark:text-neutral-200" aria-live="polite">{selection}</span>
        </div>
      </div>
    </section>
  )
}

function AvatarPreview() {
  const members = [
    { name: 'Alex Morgan', src: `${import.meta.env.BASE_URL}avatar-group-1.png` },
    { name: 'Jamie Lee', src: `${import.meta.env.BASE_URL}avatar-group-2.png` },
    { name: 'Taylor Green', src: `${import.meta.env.BASE_URL}avatar-group-3.png` },
  ]

  return (
    <section
      aria-labelledby="avatar-examples-heading"
      className="border-t border-neutral-100 px-6 py-10 sm:px-10 dark:border-neutral-800"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[180px_1fr]">
        <h2 id="avatar-examples-heading" className="text-lg font-semibold">Avatar</h2>
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex flex-col items-start gap-4">
            <h3 className="text-xs font-medium text-neutral-600 dark:text-neutral-200">Sizes</h3>
            <div className="flex flex-wrap items-center gap-3">
              {(['xs', 'small', 'default', 'large', 'xl'] as const).map(size => (
                <Avatar key={size} size={size} name="Alex Morgan" />
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-10">
            <div className="flex flex-col items-start gap-4">
              <h3 className="text-xs font-medium text-neutral-600 dark:text-neutral-200">Photo and status</h3>
              <Avatar name="Alex Morgan" src={`${import.meta.env.BASE_URL}avatar-photo.png`} showStatus />
            </div>
            <div className="flex flex-col items-start gap-4">
              <h3 className="text-xs font-medium text-neutral-600 dark:text-neutral-200">Group</h3>
              <AvatarGroup items={members} total={8} aria-label="Team members" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CalendarPreview() {
  const [selected, setSelected] = useState<Date | undefined>(new Date(2026, 0, 9))
  const [range, setRange] = useState<DateRange | undefined>({ from: new Date(2026, 0, 9), to: new Date(2026, 0, 15) })

  return (
    <section
      aria-labelledby="calendar-examples-heading"
      className="border-t border-neutral-100 px-6 py-10 sm:px-10 dark:border-neutral-800"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[180px_1fr]">
        <h2 id="calendar-examples-heading" className="text-lg font-semibold">Calendar</h2>
        <div className="flex min-w-0 flex-wrap items-start gap-6">
          <div className="flex max-w-full min-w-0 flex-col items-start gap-4">
            <h3 className="text-xs font-medium text-neutral-600 dark:text-neutral-200">Single date</h3>
            <Calendar mode="single" selected={selected} onSelect={setSelected} defaultMonth={new Date(2026, 0)} today={new Date(2026, 0, 7)} disabled={{ before: new Date(2026, 0, 7) }} aria-label="Select a date" />
          </div>
          <div className="flex max-w-full min-w-0 flex-col items-start gap-4">
            <h3 className="text-xs font-medium text-neutral-600 dark:text-neutral-200">Date range</h3>
            <Calendar mode="range" selected={range} onSelect={setRange} defaultMonth={new Date(2026, 0)} today={new Date(2026, 0, 7)} disabled={{ before: new Date(2026, 0, 7) }} excludeDisabled emptySummary="Select a date range" aria-label="Select a date range" />
          </div>
        </div>
      </div>
    </section>
  )
}

function SkeletonPreview() {
  return (
    <section
      aria-labelledby="skeleton-examples-heading"
      className="border-t border-neutral-100 px-6 py-10 sm:px-10 dark:border-neutral-800"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[180px_1fr]">
        <h2 id="skeleton-examples-heading" className="text-lg font-semibold">Skeleton</h2>
        <div className="grid min-w-0 gap-10 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-[260px_240px_56px]">
          {(['line', 'block', 'circle'] as const).map(shape => (
            <div key={shape} className="flex min-w-0 flex-col items-start gap-6">
              <h3 className="text-xs font-medium text-neutral-600 capitalize dark:text-neutral-200">{shape}</h3>
              <Skeleton shape={shape} size="small" />
              <Skeleton shape={shape} size="default" />
              <Skeleton shape={shape} size="large" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SpinnerPreview() {
  return (
    <section
      aria-labelledby="spinner-examples-heading"
      className="border-t border-neutral-100 px-6 py-10 sm:px-10 dark:border-neutral-800"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[180px_1fr]">
        <h2 id="spinner-examples-heading" className="text-lg font-semibold">Spinner</h2>
        <div className="flex flex-wrap gap-10">
          {(['primary', 'black', 'white'] as const).map(variant => (
            <div key={variant} className="flex flex-col items-start gap-4">
              <h3 className="text-xs font-medium text-neutral-600 capitalize dark:text-neutral-200">{variant}</h3>
              <div className={`flex h-12 w-20 items-center justify-center rounded-md ${variant === 'white' ? 'bg-neutral-900' : 'bg-neutral-50'}`}>
                <Spinner variant={variant} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DropdownMenuPreview() {
  const [selected, setSelected] = useState('')

  return (
    <section
      aria-labelledby="dropdown-menu-examples-heading"
      className="border-t border-neutral-100 px-6 py-10 sm:px-10 dark:border-neutral-800"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[180px_1fr]">
        <h2 id="dropdown-menu-examples-heading" className="text-lg font-semibold">Dropdown menu</h2>
        <div className="flex flex-col items-start gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger><button type="button">Open menu</button></DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                <DropdownMenuLabel>User</DropdownMenuLabel>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Profile</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Multiple layers</DropdownMenuLabel>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                          <DropdownMenuButton onSelect={() => setSelected('Mail')}>Mail</DropdownMenuButton>
                          <DropdownMenuButton onSelect={() => setSelected('Teams')}>Teams</DropdownMenuButton>
                        </DropdownMenuSubContent>
                      </DropdownMenuSub>
                      <DropdownMenuButton onSelect={() => setSelected('Another action')}>Another action</DropdownMenuButton>
                    </DropdownMenuGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuButton onSelect={() => setSelected('Bookings')}>Bookings</DropdownMenuButton>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuButton onSelect={() => setSelected('Actions')}>Actions</DropdownMenuButton>
                <DropdownMenuButton variant="danger" onSelect={() => setSelected('Suspend')}>Suspend</DropdownMenuButton>
                <DropdownMenuButton variant="danger" onSelect={() => setSelected('Delete')}>Delete</DropdownMenuButton>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="text-sm text-neutral-600 dark:text-neutral-300" aria-live="polite">{selected && `Selected: ${selected}`}</span>
        </div>
      </div>
    </section>
  )
}

function SidebarPreview() {
  const [selected, setSelected] = useState('Přehled')
  const [expanded, setExpanded] = useState(true)
  const navigationIcon = <span className="size-3.5 rounded-full bg-current" />

  return (
    <section
      aria-labelledby="sidebar-examples-heading"
      className="border-t border-neutral-100 px-6 py-10 sm:px-10 dark:border-neutral-800"
    >
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[180px_1fr]">
        <h2 id="sidebar-examples-heading" className="text-lg font-semibold">Sidebar</h2>
        <Sidebar
          className="ring-1 ring-neutral-100 dark:ring-neutral-800"
          header={<SidebarHeader logo={<img src={`${import.meta.env.BASE_URL}sidebar-logo.png`} alt="" width="20" height="20" />}>MOP</SidebarHeader>}
          footer={
            <>
              <SidebarItem active={selected === 'Oznámení'} onClick={() => setSelected('Oznámení')} icon={
                <>
                  <img src={`${import.meta.env.BASE_URL}sidebar-bell-light.svg`} alt="" width="20" height="20" className="dark:hidden" />
                  <img src={`${import.meta.env.BASE_URL}sidebar-bell-dark.svg`} alt="" width="20" height="20" className="hidden dark:block" />
                </>
              }>Oznámení</SidebarItem>
              <SidebarItem active={selected === 'Nastavení'} onClick={() => setSelected('Nastavení')} icon={
                <span className="relative flex size-6 items-center justify-center">
                  <img src={`${import.meta.env.BASE_URL}sidebar-settings-light.svg`} alt="" width="20" height="20" className="dark:hidden" />
                  <img src={`${import.meta.env.BASE_URL}sidebar-settings-dark-overlay.svg`} alt="" width="24" height="24" className="absolute inset-0 hidden dark:block" />
                  <img src={`${import.meta.env.BASE_URL}sidebar-settings-dark.svg`} alt="" width="20" height="20" className="hidden dark:block" />
                </span>
              }>Nastavení</SidebarItem>
            </>
          }
          profile={
            <SidebarProfile name="John Doe" initials="AM" action={
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button type="button" aria-label="Profil John Doe" className="flex size-6 shrink-0 items-center justify-center rounded-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-300/40">
                    <img src={`${import.meta.env.BASE_URL}sidebar-dots-light.svg`} alt="" width="24" height="24" className="dark:hidden" />
                    <img src={`${import.meta.env.BASE_URL}sidebar-dots-dark.svg`} alt="" width="24" height="24" className="hidden dark:block" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuButton onSelect={() => setSelected('Profil')}>Profil</DropdownMenuButton>
                  <DropdownMenuButton onSelect={() => setSelected('Odhlásit se')}>Odhlásit se</DropdownMenuButton>
                </DropdownMenuContent>
              </DropdownMenu>
            } />
          }
        >
          <SidebarGroup>
            <SidebarGroupLabel>Navigace</SidebarGroupLabel>
            <SidebarItem icon={navigationIcon} active={selected === 'Přehled'} onClick={() => setSelected('Přehled')}>Přehled</SidebarItem>
            <SidebarItem icon={navigationIcon} expanded={expanded} onClick={() => setExpanded(current => !current)} aria-controls="sidebar-preview-reservations">Rezervace</SidebarItem>
            <div id="sidebar-preview-reservations" hidden={!expanded} className={expanded ? 'flex flex-col gap-1' : ''}>
              <SidebarItem icon={navigationIcon} nested active={selected === 'Všechny rezervace'} onClick={() => setSelected('Všechny rezervace')}>Všechny rezervace</SidebarItem>
              <SidebarItem icon={navigationIcon} nested active={selected === 'Nadcházející'} onClick={() => setSelected('Nadcházející')} badge="3">Nadcházející</SidebarItem>
            </div>
            <SidebarItem icon={navigationIcon} disabled>Archiv</SidebarItem>
          </SidebarGroup>
        </Sidebar>
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
          <div>
            
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="flex h-10 w-28 shrink-0 cursor-pointer items-center justify-center rounded-md border-1 border-neutral-100 bg-white text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-blue-300/40 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800"
          >
            {theme === 'dark' ? 'Light theme' : 'Dark theme'}
          </button>
          <span className="mr-4 text-warning-800 px-2 py-1 rounded">Try me ↑</span>
          </div>
        </div>
      </header>
      <CheckboxPreview />
      <SwitchPreview />
      <InputPreview />
      <AlertPreview />
      <BadgePreview />
      <ButtonPreview />
      <IconButtonPreview />
      <CardPreview />
      <AvatarPreview />
      <CalendarPreview />
      <SkeletonPreview />
      <SpinnerPreview />
      <DropdownMenuPreview />
      <SidebarPreview />
    </main>
  )
}