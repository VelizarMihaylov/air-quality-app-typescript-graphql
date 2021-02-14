import React, { useState } from 'react'

import { SearchBox, SearchBoxProps } from '../SearchBox'
import { cities } from '../__mocks__'

export default {
  component: SearchBox,
  title: 'Search Box',
  argTypes: {}
}

const Template: React.FC = (args): React.ReactElement => {
  return <SearchBox {...(args as SearchBoxProps)} />
}

export const _default = Template.bind({})

_default.args = {
  options: cities
}
