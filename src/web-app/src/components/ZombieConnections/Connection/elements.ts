import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import posed from 'react-pose'

export const StyledConnection = styled('div')`
  ${tw`flex py-3 px-4 cursor-pointer`};
`

export const OnlineIndicator = styled(
  posed.div({
    connected: {
      boxShadow: '0px 0px 0px rgba(0,0,0,0)',
      scale: 1.1,
      transition: {
        scale: {
          type: 'spring',
          stiffness: 200,
          damping: 0,
        },
      },
    },
    offline: {
      boxShadow: '0px 0px 0px rgba(0,0,0,0)',
      scale: 1,
    },
    online: {
      scale: 1,
      boxShadow: '1px 1px 4px rgba(38, 241, 45, 0.1)',
    },
  })
)<{ pose: 'online' | 'offline' | 'connected' }>`
  ${tw`rounded-full h-font w-font flex-no-shrink mr-2`}

  background: ${({ pose }) =>
    pose === 'connected'
      ? `linear-gradient(135deg, #ffd400 0%, #ffb100 100%)`
      : pose === 'online'
        ? `linear-gradient(135deg, #26f12d 0%, #7ddae9 100%)`
        : `rgba(0, 0, 0, 0.1)`}
`

export const Content = styled('div')`
  ${tw`flex-grow`};
`

export const Header = styled('div')`
  ${tw`flex flex-column leading-none`};
`

export const OnlineStatus = styled('span')`
  ${tw`inline-flex`};
`

export const ConnectionInfo = styled('div')`
  ${tw`text-sm flex-grow text-right text-grey`};
`

export const ConnectionType = styled('span')`
  ${tw`font-medium uppercase`};
`

export const Address = styled('span')`
  transition: all 0.2s ease;

  ${StyledConnection}:hover & {
    ${tw`text-blue underline`};
  }
`

export const LastSeen = styled('div')`
  ${tw`font-normal text-grey-dark text-xs mt-1`};
`
