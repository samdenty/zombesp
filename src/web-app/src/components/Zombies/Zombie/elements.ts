import styled from '@emotion/styled'
import tw from 'tailwind.macro'
import { Item } from '../elements'

export const StyledZombie = styled(Item)`
  ${tw`shadow-lg`};
`

export const ZombieName = styled('h2')`
  ${tw`my-0 text-xl leading-tight`};
`

export const TextContainer = styled('div')`
  ${tw`text-center sm:text-left sm:flex-grow`};
`

export const TextSpacing = styled('div')`
  ${tw`mb-4`};
`

export const Section = styled('section')`
  ${tw`flex flex-col py-3`};

  &:not(:last-child) {
    ${tw`border-b-2 border-grey-lighter`};
  }
`

export const SectionTitle = styled('h3')`
  ${tw`my-0 text-xs text-grey-dark font-bold px-4 uppercase pb-1`};
`

export const ConnectionsSection = styled(Section)`
  ${tw`pb-0`};

  background-color: rgba(33, 33, 109, 0.04);
`
