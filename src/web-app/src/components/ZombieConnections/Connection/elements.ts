import { css } from '@emotion/core'
import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import posed from 'react-pose'

export const Root = styled('div')`
  ${tw`py-3 px-4`};
`

export const OnlineStatus = styled('div')`
  ${tw`inline-flex`};
`

export const OnlineIndicator = styled(
  posed.div({
    init: {
      scale: 1,
      boxShadow: '0px 0px 0px rgba(0,0,0,0)',
    },
    connected: {
      scale: 1.1,
      transition: {
        scale: {
          type: 'spring',
          stiffness: 200,
          damping: 0,
        },
      },
    },
    offline: {},
    online: {
      boxShadow: '1px 1px 4px rgba(38, 241, 45, 0.1)',
    },
  })
)<{ pose: 'online' | 'offline' | 'connected' }>`
  ${tw`rounded-full h-font w-font flex-no-shrink mr-1`}

  background: ${({ pose }) =>
    pose === 'connected'
      ? `linear-gradient(135deg, #ffd400 0%, #ffb100 100%)`
      : pose === 'online'
        ? `linear-gradient(135deg, #26f12d 0%, #7ddae9 100%)`
        : `rgba(0, 0, 0, 0.1)`}
`

export const Status = styled('h4')`
  ${tw`font-bold text-grey-darkest`};
`

export const Info = styled('p')`
  ${tw`text-grey-darker`};
`

export const LastSeen = styled('span')`
  ${tw`pl-2 font-normal text-grey-dark text-xs`};
`
