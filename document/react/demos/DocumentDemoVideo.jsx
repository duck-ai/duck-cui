import React from 'react'

import DemoBox from './components/DemoBox'
import DemoButton from './components/DemoButton'

import adapter from './adapter'
const { Speaks } = adapter
const { Video, Text } = Speaks

export default class extends React.Component {
  render () {
    return <DemoBox ref={ $node => {
      if ($node) { this.cuic = $node.cuic }
    } } >
  </DemoBox>
}

  async componentDidMount () {
    await this.demo()
  }

  async demo () {
    this.cuic.append(new Text({ text: '这是一个短视频', speaker: 'duck' }))
    this.cuic.append(new Video({ url: 'https://tna-upload.oss-cn-shanghai.aliyuncs.com/vultr-upload/2019-09-22/lans-oob-4.mp4', speaker: 'duck' }))
  }
}