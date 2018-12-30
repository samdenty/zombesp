import tw from 'tailwind.macro'
import styled from '@emotion/styled'

export const StyledZombies = styled('div')`
  ${tw`mx-8`};

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1.5rem;
`
