import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { Button, ButtonText, ButtonProps } from '../Button'

export const Root = styled('div')`
  ${tw`flex flex-col`};
`

export const ShowMore = styled(Button)`
  ${tw`text-left bg-transparent text-xs uppercase rounded-none`};
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(51, 121, 210, 0.07);
    ${tw`text-blue`};
  }
`
