import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import { MdAddCircle } from 'react-icons/md'

export const StyledZombies = styled('div')`
  ${tw`mx-8`};

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1.5rem;
`

export const Item = styled('div')`
  ${tw`flex flex-col bg-white container max-w-sm rounded-lg overflow-hidden`};
`

export const AddZombie = styled(Item.withComponent('button'))`
  ${tw`items-center cursor-pointer border-none bg-transparent py-5`};

  &:hover {
    background-color: rgba(47, 47, 165, 0.11);
  }
`

export const AddZombieIcon = styled(MdAddCircle)`
  ${tw`fill-current h-full w-24`};

  color: rgba(49, 92, 158, 0.54);
`
