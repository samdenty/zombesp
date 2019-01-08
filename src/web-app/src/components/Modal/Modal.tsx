import { useBoolean } from 'react-hanger'
import { Portal } from 'react-portal'
import * as React from 'react'
import { Shade, globalStyles } from './elements'
import { Global } from '@emotion/core'
import { PoseGroup } from 'react-pose'

export type ModalProps = {
  isOpen: boolean
  onToggle?(value: boolean): void
}

export const Modal: React.StatelessComponent<ModalProps> = ({
  children,
  isOpen,
  onToggle: setOpen = () => null,
}) => {
  const showStyles = useBoolean(false)
  if (isOpen && !showStyles.value) showStyles.setTrue()

  return (
    <Portal>
      {showStyles.value && <Global key="styles" styles={globalStyles} />}

      <PoseGroup onRest={showStyles.setFalse}>
        {isOpen && [
          <Shade
            key="shade"
            onClick={event =>
              event.currentTarget === event.target && setOpen(false)
            }
          >
            {children}
          </Shade>,
        ]}
      </PoseGroup>
    </Portal>
  )
}
