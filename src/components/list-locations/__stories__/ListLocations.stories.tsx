import React, { useState } from 'react'

import { ListLocations, ListLocationsProps } from '../ListLocations'

import { locations } from '../__mocks__'

export default {
  component: ListLocations,
  title: 'Locations List',
  argTypes: {}
}

const Template: React.FC = (args): React.ReactElement => {
  return <ListLocations {...(args as ListLocationsProps)} />
}

export const _default = Template.bind({})

_default.args = {
  city: 'Manchester',
  locations: locations.latestMeasurements
}
