import React from 'react'
import PropTypes from 'prop-types'
import { Upload, Button, Icon } from 'antd'
import { pick } from '../util'
import {
  keep,
  createFormItem,
  SIZES,
  COMMON_FORM_ITEM_STATE_TYPES,
  createFormItemDefaultState,
} from '../common'

const LIST_TYPES = ['text', 'picture']

export const getDefaultState = () => ({
  ...createFormItemDefaultState(),
  name: '',
  defaultFileList: [],
  fileList: [],
  action: '',
  data: undefined,
  headers: undefined,
  showUploadList: true,
  multiple: false,
  accept: '',
  listType: 'text',
  text: '选择文件',
  size: SIZES[0],
  disabled: false,
})

export const stateTypes = {
  ...COMMON_FORM_ITEM_STATE_TYPES,
  name: PropTypes.string,
  defaultFileList: PropTypes.array,
  fileList: PropTypes.array,
  action: PropTypes.string,
  data: PropTypes.object,
  headers: PropTypes.object,
  showUploadList: PropTypes.bool,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
  text: PropTypes.string,
  listType: PropTypes.oneOf(LIST_TYPES),
  size: PropTypes.oneOf(SIZES),
  disabled: PropTypes.bool,
}

export const defaultListeners = {
  onChange({ state }, { fileList }) {
    return {
      ...state,
      fileList,
    }
  },
  onPreview({ state }, file) {
    window.open(file.url)
    return state
  },
  onRemove: keep,
}

export const defaultIntercepters = { beforeUpload: undefined }

export function render({ state, listeners, intercepters: finalIntercepters }) {
  const uploadProps = pick(state, ['name', 'defaultFileList', 'action', 'data', 'headers', 'showUploadList', 'multiple', 'accept', 'listType', 'fileList'])

  return createFormItem(
    state,
    <Upload {...uploadProps} {...listeners} {...finalIntercepters}>
      <Button>
        <Icon type="upload" />
        {state.text}
      </Button>
    </Upload>
  )
}
