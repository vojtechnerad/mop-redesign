import type { ButtonHTMLAttributes } from 'react'
import { DayPicker } from 'react-day-picker'
import type { DayPickerProps } from 'react-day-picker'
import { useTheme } from '../Theme'
import Dropdown from './Dropdown'
import IconButton from './IconButton'
import './Calendar.css'

export type CalendarProps = DayPickerProps & {
  theme?: 'light' | 'dark'
  showSummary?: boolean
  emptySummary?: string
}

function NavigationButton({ direction, children: _children, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { direction: 'left' | 'right' }) {
  return (
    <IconButton {...props} aria-label={props['aria-label'] ?? (direction === 'left' ? 'Previous month' : 'Next month')} size="small" variant="outline" className={`mop-calendar-nav-button ${className}`}>
      <img src={`${import.meta.env.BASE_URL}calendar-${direction}-light.svg`} alt="" className="mop-calendar-light-asset" />
      <img src={`${import.meta.env.BASE_URL}calendar-${direction}-dark.svg`} alt="" className="mop-calendar-dark-asset" />
    </IconButton>
  )
}

function PreviousMonthButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <NavigationButton {...props} direction="left" />
}

function NextMonthButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <NavigationButton {...props} direction="right" />
}

export default function Calendar({ theme: themeOverride, showSummary = true, emptySummary = 'Select a date', className = '', classNames, components, formatters, footer, ...props }: CalendarProps) {
  const { theme: globalTheme } = useTheme()
  const theme = themeOverride ?? globalTheme
  const selected = 'selected' in props ? props.selected : undefined
  const dateFormat = new Intl.DateTimeFormat(props.locale?.code ?? 'en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const formatDate = (date: Date) => dateFormat.format(date).replaceAll('/', '. ')
  const summary = selected instanceof Date
    ? formatDate(selected)
    : Array.isArray(selected)
      ? selected.map(formatDate).join(', ')
      : selected?.from
        ? `${formatDate(selected.from)}${selected.to ? ` - ${formatDate(selected.to)}` : ' - ...'}`
        : emptySummary

  return (
    <Dropdown theme={theme} className="mop-calendar" data-calendar-theme={theme} style={{ width: (props.numberOfMonths ?? 1) * 332 + ((props.numberOfMonths ?? 1) - 1) * 24 + 28 }}>
      <DayPicker
        showOutsideDays
        weekStartsOn={1}
        {...props}
        className={`mop-calendar-picker ${className}`}
        classNames={{
          months: 'mop-calendar-months',
          month: 'mop-calendar-month',
          nav: 'mop-calendar-nav',
          month_caption: 'mop-calendar-caption',
          caption_label: 'mop-calendar-caption-label',
          month_grid: 'mop-calendar-grid',
          weekdays: 'mop-calendar-weekdays',
          weekday: 'mop-calendar-weekday',
          weeks: 'mop-calendar-weeks',
          week: 'mop-calendar-week',
          day: 'mop-calendar-day',
          day_button: 'mop-calendar-day-button',
          selected: 'mop-calendar-selected',
          today: 'mop-calendar-today',
          disabled: 'mop-calendar-disabled',
          outside: 'mop-calendar-outside',
          hidden: 'mop-calendar-hidden',
          range_start: 'mop-calendar-range-start',
          range_middle: 'mop-calendar-range-middle',
          range_end: 'mop-calendar-range-end',
          ...classNames,
        }}
        components={{ PreviousMonthButton, NextMonthButton, ...components }}
        formatters={{ formatWeekdayName: date => new Intl.DateTimeFormat(props.locale?.code ?? 'en', { weekday: 'short' }).format(date).toLocaleUpperCase(), ...formatters }}
        footer={footer ?? (showSummary ? (
          <div className="mop-calendar-summary">
            <img src={`${import.meta.env.BASE_URL}calendar-summary-${theme}.svg`} alt="" />
            <span>{summary}</span>
          </div>
        ) : undefined)}
      />
    </Dropdown>
  )
}