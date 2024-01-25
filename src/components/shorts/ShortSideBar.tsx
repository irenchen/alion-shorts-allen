import React, { PropsWithChildren } from 'react'

import { SHORT_WIDTH } from './shortConfig'

import ThumbsUp from './icons/ThumbsUp'
import ThumbsDown from './icons/ThumbsDown'
import Message from './icons/Message'
import Share from './icons/Share'
import Settings from './icons/Settings'
import ChannelLogo from './icons/ChannelLogo'

type ShortSideBarProps = { id: string }

const ShortSideBar = ({ id }: ShortSideBarProps) => {
  return (
    <div
      id={`sidebar-${id}`}
      style={{
        position: 'absolute',
        left: SHORT_WIDTH,
        bottom: 0,
        minWidth: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: `all .3s .3s ease-in-out`,
      }}
      className="sidebar-hide"
    >
      <IconBox>
        <ThumbsUp />
      </IconBox>
      <TextBox text="5748" />

      <IconBox>
        <ThumbsDown />
      </IconBox>
      <TextBox text="不喜歡" />

      <IconBox>
        <Message />
      </IconBox>
      <TextBox text="52" />

      <IconBox>
        <Share />
      </IconBox>
      <TextBox text="分享" />

      <IconBox>
        <Settings />
      </IconBox>

      <LogoBox
        style={{
          backgroundColor: '#0005',
          borderRadius: 5,
          width: 38,
          height: 38,
          margin: `12px 0 4px 0`,
          cursor: 'default',
        }}
      >
        <ChannelLogo />
      </LogoBox>
    </div>
  )
}

export default ShortSideBar

type IconBoxProps = {
  style?: React.CSSProperties
}

const IconBox = ({ children, style = {} }: PropsWithChildren<IconBoxProps>) => {
  return (
    <div
      style={{
        position: 'relative',
        width: 48,
        height: 48,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0001',
        borderRadius: 24,
        cursor: 'pointer',
        ...style,
      }}
      className="icon-box"
    >
      {children}
    </div>
  )
}

const LogoBox = ({ children, style = {} }: PropsWithChildren<IconBoxProps>) => {
  return (
    <div
      style={{
        position: 'relative',
        width: 48,
        height: 48,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0001',
        borderRadius: 24,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

type TextBoxProps = {
  text: string
  style?: React.CSSProperties
}

const TextBox = ({ text, style = {} }: TextBoxProps) => {
  return (
    <div
      style={{
        height: 20,
        fontSize: '1rem',
        marginTop: 4,
        marginBottom: 16,
        ...style,
      }}
    >
      {text}
    </div>
  )
}
