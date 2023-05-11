'use client'

import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file

import React from 'react'
import type { Range, RangeKeyDict } from 'react-date-range'
import { DateRange } from 'react-date-range'

interface CalendarProps {
  value: Range
  onChange: (value: RangeKeyDict) => void
  disabledDates?: Date[]
}

const Calendar: React.FC<CalendarProps> = ({
  onChange,
  value,
  disabledDates,
}) => (
  <DateRange
    rangeColors={['#262626']}
    ranges={[value]}
    date={new Date()}
    onChange={onChange}
    direction="vertical"
    showDateDisplay={false}
    minDate={new Date()}
    disabledDates={disabledDates}
  />
)

export default Calendar
