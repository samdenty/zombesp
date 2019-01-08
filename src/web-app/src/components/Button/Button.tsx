import * as React from 'react'
import { StyledButton, ButtonText, ButtonIcon } from './elements'

export type ButtonSize = 'large' | 'medium' | 'small'

export interface ButtonProps extends GetComponentProps<'button'> {
  icon?: React.ReactNode
  size?: ButtonSize
}

export const Button = ({
  icon,
  children,
  size = 'medium',
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton size={size} {...rest}>
      {icon && <ButtonIcon>{icon}</ButtonIcon>}
      <ButtonText>{children}</ButtonText>
    </StyledButton>
  )
}

export * from './elements'
