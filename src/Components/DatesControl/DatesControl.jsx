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

  // хук добавляет крайние даты в requestModel как рабочие
  // на случай, если даты в RangePicker не поменяются
  useEffect(() => {
    setRangeStart(start)
    setRangeEnd(end)
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
      console.log('moment1', rangeStart._d)
      console.log('moment2', rangeEnd._d)
      console.log('onCalendarChange')
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
