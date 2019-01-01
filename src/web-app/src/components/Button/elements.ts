import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const StyledButton = styled('button')`
  ${tw`flex border-none font-sans bg-transparent cursor-pointer text-grey-dark font-medium items-center`};
  transition: all 0.2s ease;

  &:hover {
    ${tw`text-blue`};
    background-color: rgba(51, 121, 210, 0.07);
  }
`

export const ButtonIcon = styled('div')`
  ${tw`-mr-3 h-4 w-4`} > * {
    ${tw`h-full w-full`};
  }
`

export const ButtonText = styled('div')`
  ${tw`px-4 py-3 flex-grow`};
`
