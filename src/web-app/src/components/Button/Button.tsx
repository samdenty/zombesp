import * as React from 'react'
import { StyledButton, ButtonText, ButtonIcon } from './elements'

export interface ButtonProps extends React.Props<HTMLButtonElement> {
  icon?: React.ReactNode
}

export function Button({ icon, children, ...rest }) {
  return (
    <StyledButton {...rest}>
      {icon && <ButtonIcon>{icon}</ButtonIcon>}
      <ButtonText>{children}</ButtonText>
    </StyledButton>
  )
}

export * from './elements'
