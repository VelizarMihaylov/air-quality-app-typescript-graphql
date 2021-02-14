import React from 'react'

import { Spinner, SpinnerProps } from '../Spinner'

export default {
  component: Spinner,
  title: 'Spinner',
  argTypes: {}
}

const Template: React.FC = (args): React.ReactElement => {
  return <Spinner {...(args as SpinnerProps)} />
}

export const _default = Template.bind({})

_default.args = {}
