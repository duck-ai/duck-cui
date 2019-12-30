import React from 'react'

import DemoBox from './components/DemoBox'
import DemoButton from './components/DemoButton'

import adapter from './adapter'
const { Speaks, Appends } = adapter
const { Loading, Text } = Speaks
const { Tip } = Appends

export default class DemoBasic extends React.Component {
  render () {
    return <DemoBox ref={ $node => {
        if ($node) { this.cuic = $node.cuic }
      } } >
      <DemoButton onClick={ async () => {
        await this.demo()
      } }>再走一个</DemoButton>
    </DemoBox>
  }

  async componentDidMount () {
    await this.demo()
  }

  async demo () {
    await this.cuic.removeAll()

    await this.loadingAndSpeak('你好，我是小黄鸭鸭')
    await this.loadingAndSpeak('当你遇到问题想不明白时，可以和我讲讲鸭')
    await this.loadingAndSpeak('虽然我回答不了你的问题，但是讲出来你就更容易自己想清楚鸭')
    await this.loadingAndSpeak('多和小伙伴聊天，不要总是自己闷着工作鸭')
    await this.cuic.append(new Tip({ text: '演示完啦，想再看就点“再走一个”' }))
  }

  async loadingAndSpeak (text) {
    let duck = this.cuic.getSpeaker('duck')
    await duck.speakAndThenRemove(new Loading(), { duration: 500 })
    await duck.speak(new Text({ text }))
  }
}