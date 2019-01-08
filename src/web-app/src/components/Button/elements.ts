import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { ButtonSize } from './Button'

export const StyledButton = styled('button')<{ size: ButtonSize }>`
  ${tw`flex border-none bg-transparent cursor-pointer text-grey-dark font-medium items-center rounded`};
  transition: all 0.2s ease;

  ${({ size }) =>
    size === 'small'
      ? tw`px-2 py-1`
      : size === 'medium'
        ? tw`px-3 py-2`
        : tw`px-4 py-3`} &:hover {
    ${tw`text-blue`};
    background-color: rgba(51, 121, 210, 0.07);
  }
`

export const ButtonIcon = styled('div')`
  ${tw`h-4 w-4 mr-1`};

  > * {
    ${tw`h-full w-full`};
  }
`

export const ButtonText = styled('div')`
  ${tw`flex-grow`};
`
