import React from 'react'
import { storiesOf } from '@storybook/react'
import Input from '.'

storiesOf('FocusableInput', module)
  .add('default', () => (
    <Input />
  ))
  .add('reverse', () => (
    <Input reverse />
  ))
  .add('height', () => (
    <Input height={100} />
  ))
  .add('invalid', () => (
    <Input invalid />
  ))
