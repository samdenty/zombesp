import styled from '@emotion/styled'
import tw from 'tailwind.macro'

export const StyledZombie = styled('div')`
  ${tw`bg-white container max-w-sm shadow-lg rounded-lg overflow-hidden font-sans`};
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

export type SectionProps = { darker?: boolean }
export const Section = styled('section')<SectionProps>`
  ${tw`flex flex-col border-b-2 border-grey-lighter px-4 py-3`};

  background-color: ${({ darker }) =>
    darker ? `rgba(33, 33, 109, 0.04)` : null};
`

export const SectionTitle = styled('h3')`
  ${tw`my-0 text-xs text-grey-dark font-bold uppercase`};
`

export const Button = styled('button')`
  ${tw`bg-white border-purple border font-semibold hover:bg-purple hover:text-white leading-normal px-4 py-1 rounded-full text-purple text-xs`};
`
