import { css } from '@emotion/core'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import posed from 'react-pose'

export const globalStyles = css`
  body {
    ${tw`overflow-y-hidden`};
  }
`

export const Shade = styled(
  posed.div({
    init: {
      position: 'fixed',
    },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  })
)`
  ${tw`pin flex h-full w-full items-center justify-center z-10`};
  overscroll-behavior: contain;
  background-color: rgba(0, 0, 0, 0.5);
`
