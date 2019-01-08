import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import posed from 'react-pose'

export const StyledDialog = styled(
  posed.div({
    enter: {
      y: 0,
      opacity: 1,
      delay: 300,
      transition: {
        y: { type: 'spring', stiffness: 1000, damping: 15 },
        default: { duration: 300 },
      },
    },
    exit: {
      y: 50,
      opacity: 0,
      transition: { duration: 150 },
    },
  })
)`
  ${tw`flex flex-col bg-white shadow-lg rounded-lg`};
`

export const DialogTitle = styled('h1')`
  ${tw`py-6 px-5 text-xl font-medium`};
`

export const DialogContent = styled('div')`
  ${tw`pb-6 px-5`};
`

export const DialogActions = styled('div')`
  ${tw`flex justify-end items-center px-3 py-2`};
`
