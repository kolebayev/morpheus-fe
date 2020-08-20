import React, { useState, useEffect } from 'react'
import { Radio } from 'antd'
import { useStoreState, useStoreActions } from 'easy-peasy'
import './UserControl.scss'

export default function UserControl(props) {
  const { controlsSize } = props
  const users = useStoreState((state) => state.entry.controls.users)
  const setUserFilteredBy = useStoreActions(
    (actions) => actions.request.setUserFilteredBy
  )
  const [selectedUser, setSelectedUser] = useState(users[0])

  // хук добавляет юзера в requestModel как рабочего
  // на случай, если стоит дефолтный юзер
  useEffect(() => {
    setUserFilteredBy(users[0])
  }, [users, setUserFilteredBy])

  return (
    <div className="UserControl control">
      <div className="control_top-label">Участник чата</div>
      <Radio.Group
        size={controlsSize}
        options={users.map((user) => {
          return { label: user, value: user }
        })}
        onChange={(e) => {
          setSelectedUser(e.target.value)
          setUserFilteredBy(e.target.value)
        }}
        value={selectedUser}
        optionType="button"
      />
    </div>
  )
}
