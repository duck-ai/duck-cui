import React from 'react'

import DemoBox from './components/DemoBox'
import DemoButton from './components/DemoButton'

import adapter from './adapter'
const { Speaks, Appends, Covers } = adapter
const { Loading, Text } = Speaks
const { Choices } = Covers

export default class extends React.Component {
  render () {
    return <DemoBox ref={ $node => {
        if ($node) { this.cuic = $node.cuic }
      } } >
      {/* <DemoButton onClick={ async () => {
        await this.demo()
      } }>再走一个</DemoButton> */}
    </DemoBox>
  }

  async componentDidMount () {
    await this.demo()
  }

  async demo () {
    await this.cuic.append(new Text({ text: '你喜欢什么水果鸭？', speaker: 'duck' }))

    let items = [
      { label: '西瓜', id: 1 },
      { label: '苹果', id: 2 },
      { label: '橘子', id: 3 },
      { label: '樱桃', id: 4 },
      { label: '芒果', id: 5 },
      { label: '哈密瓜', id: 6 },
      { label: '猕猴桃', id: 7 },
    ]

    let cs = new Choices({ items })
    cs.on('select', async x => {
      await this.cuic.append(new Text({ text: x.label, speaker: 'slime' }))
    })
    await this.cuic.cover(cs)
  }
}