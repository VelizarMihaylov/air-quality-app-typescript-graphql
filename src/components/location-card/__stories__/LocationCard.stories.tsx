import React from 'react'

import { LocationCard, LocationCardProps } from '../LocationCard'

import { measurements } from '../__mocks__'

export default {
  component: LocationCard,
  title: 'Location Card',
  argTypes: {}
}

const Template: React.FC = (args): React.ReactElement => {
  return <LocationCard {...(args as LocationCardProps)} />
}

export const _default = Template.bind({})

_default.args = {
  location: 'Manchester Piccadilly',
  lastUpdated: '2019-12-28T08:00:00.000Z',
  city: 'Manchester',
  measurements
}
