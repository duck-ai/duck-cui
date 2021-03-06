import ChatItemBuilder from './ChatItemBuilder'

import Scroll from 'react-scroll'
// https://www.npmjs.com/package/react-scroll

// import MarkdownIt from 'markdown-it'
// import Timeout from 'await-timeout'
import _array from 'lodash/array'

export default class CUIContext {
  constructor ({ $CUI, options = {} }) {
    this.$CUI = $CUI

    this.options = {}
    this.options.autoScrollBottom = !!options.autoScrollBottom
  }

  // 设置背景内容
  async setBackgroundContent ({ content }) {
    this.$CUI.setState({ _backgroundLayerContent: content })
  }

  // 添加说话人
  async addSpeaker (speaker) {
    let { _speakers } = this.$CUI.state
    _speakers[speaker.id] = speaker
    this.$CUI.setState({ _speakers })
  }

  getSpeaker (speakerId) {
    // let { _speakers } = this.$CUI.state
    // let _speaker = _speakers[id]
    return {
      speak: async (speakAble) => {
        speakAble.speaker = speakerId
        await this.append(speakAble)
      },
      speakAndThenRemove: async (speakAble, { duration }) => {
        speakAble.speaker = speakerId
        await this.append(speakAble)
        await this.waitFor({ duration })
        await this.removeById(speakAble.id)
      }
    }
  }

  // 添加 AppendAble 到 cui
  async append (appendAble) {
    await this.$CUI._append(appendAble)
    appendAble.$cuic = this
    if (this.options.autoScrollBottom) {
      this._scrollToBottom()
    }
  }

  // 添加 CoverAble 到 cui
  async cover (coverAble) {
    let { coverItems } = this.$CUI.state
    coverItems.push(coverAble)
    this.$CUI.setState({ coverItems })
    coverAble.$cuic = this
    return this
  }

  // 移除指定 id 的 AppendAble 或 CoverAble 节点
  async removeById (id) {
    // AppendAble
    let { appendItems } = this.$CUI.state
    let idx = _array.findLastIndex(appendItems, (x) => {
      return x.id === id
    })
    _array.pullAt(appendItems, idx)
    this.$CUI.setState({ appendItems })

    // CoverAble
    let { coverItems } = this.$CUI.state
    let idy = _array.findLastIndex(coverItems, (x) => {
      return x.id === id
    })
    _array.pullAt(coverItems, idy)
    this.$CUI.setState({ coverItems })
  }

  // 移除最后一个符合条件的 AppendAble 节点
  async removeLast ({ typeName }) {
    console.warn('removeLast 此方法将在 1.0 版本废弃')
    let { appendItems } = this.$CUI.state
    let idx = _array.findLastIndex(appendItems, (x) => {
      if (!typeName) { return true }
      return x.typeName === typeName
    })
    _array.pullAt(appendItems, idx)
    this.$CUI.setState({ appendItems })
  }

  // 移除所有符合条件的 AppendAble 节点
  async removeAll (condition) {
    console.warn('removeAll 此方法将在 1.0 版本废弃')
    let { appendItems } = this.$CUI.state

    if (condition) {
      let { typeName } = condition
      _array.remove(appendItems, (x) => {
        return x.typeName === typeName
      })
    }

    if (!condition) {
      appendItems = []
    }

    this.$CUI.setState({ appendItems })
  }

  // 等待一定的毫秒数
  async waitFor ({ duration }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, duration)
    })
  }

  // 移除一个 CoverAble 节点
  async removeCoverAble ({ typeName }) {
    console.warn('removeCoverAble 此方法将在 1.0 版本废弃')
    let { coverItems } = this.$CUI.state
    let idx = _array.findLastIndex(coverItems, (x) => {
      if (!typeName) { return true }
      return x.typeName === typeName
    })
    _array.pullAt(coverItems, idx)
    this.$CUI.setState({ coverItems })
  }

  _scrollToBottom () {
    Scroll.animateScroll.scrollToBottom({
      containerId: 'MRI-Scroller',
      duration: 100
    })
  }
}