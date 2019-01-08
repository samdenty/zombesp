import * as React from 'react'
import { Modal, ModalProps } from '../Modal'
import { StyledDialog } from './elements'

export interface DialogProps extends ModalProps {
  children: any
}

export const Dialog = ({ isOpen, onToggle, children }: DialogProps) => {
  return (
    <Modal isOpen={isOpen} onToggle={onToggle}>
      <StyledDialog>{children}</StyledDialog>
    </Modal>
  )
}
