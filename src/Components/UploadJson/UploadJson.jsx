import React from 'react'
import { Upload, Button, message } from 'antd'
import JsonIcon from '../../Icons/JsonIcon'
import './UploadJson.scss'
import { useStoreActions } from 'easy-peasy'

export default function UploadJson({ type }) {
  const { Dragger } = Upload
  const setChat = useStoreActions((actions) => actions.entry.setDataFromJson)
  const props = {
    accept: '.json',
    showUploadList: false,
    multiple: false,
    transformFile(file) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onprogress = () => {
          console.log('reading')
        }
        reader.onloadend = () => {
          let data = JSON.parse(reader.result)
          if (('messages' in data) & (data.messages.length !== 0)) {
            setChat(data)
          } else {
            message.error('Ошибка в json файле')
          }
        }
        reader.onerror = () => {
          console.log(reader.error)
          message.error('Ошибка чтения json файла')
        }
      })
    },
  }

  const button = (
    <div className="upload_button">
      <Upload {...props}>
        <Button>Загрузить другой файл</Button>
      </Upload>
    </div>
  )

  const area = (
    <Dragger {...props}>
      <div className="ant-upload-drag-icon">
        <JsonIcon />
      </div>
      <div className="ant-upload-text">
        Кликни по зоне <br />
        или перетащи в неё json файл
      </div>
    </Dragger>
  )

  return {
    button,
    area,
  }[type]
}
