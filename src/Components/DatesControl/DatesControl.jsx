import React, { useEffect } from 'react'
import './DatesControl.scss'
import { DatePicker } from 'antd'
import moment from 'moment'
import 'moment/locale/ru'
import locale from 'antd/es/date-picker/locale/ru_RU'
import { useStoreState, useStoreActions } from 'easy-peasy'

export default function DateControl(props) {
  const { RangePicker } = DatePicker
  const { controlsSize } = props
  const dateFormat = 'DD/MM/YYYY'
  const start = useStoreState((state) => state.entry.controls.dates.startDate)
  const end = useStoreState((state) => state.entry.controls.dates.endDate)
  const setRangeStart = useStoreActions(
    (actions) => actions.request.setRangeStart
  )
  const setRangeEnd = useStoreActions((actions) => actions.request.setRangeEnd)
  const setRangeDateAsString = (date) => {
    return moment(date).format(dateFormat)
  }

  // хук добавляет крайние даты в requestModel как рабочие
  // на случай, если даты в RangePicker не поменяются юзером
  // то есть при обновлении стейта после загрузки очередного jsonа
  useEffect(() => {
    setRangeStart(setRangeDateAsString(start))
    setRangeEnd(setRangeDateAsString(end))
  }, [start, end, setRangeStart, setRangeEnd])

  const rangePickerProps = {
    disabledDate(current) {
      return current && !moment(current).isBetween(start, end)
    },
    defaultValue: [
      moment(moment(start), dateFormat),
      moment(moment(end), dateFormat),
    ],
    format: dateFormat,
    locale,
    allowClear: false,
    autoFocus: false,
    size: controlsSize === 'default' ? 'middle' : 'large',
    onCalendarChange([rangeStart, rangeEnd]) {
      setRangeStart(setRangeDateAsString(rangeStart))
      setRangeEnd(setRangeDateAsString(rangeEnd))
    },
    separator: '|',
  }

  return (
    <>
      <div className="control_top-label">Период</div>
      <RangePicker {...rangePickerProps} />
    </>
  )
}
