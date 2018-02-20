import React from 'react'
import { storiesOf } from '@storybook/react'
import { Spreadsheet } from 'components'

storiesOf('Spreadsheet', module)
  .add('default', () => {
    const data = [
      {
        id: '1',
        name: 'jim',
      },
      {
        id: '2',
        name: 'jane',
      },
      {
        id: '3',
        name: 'john',
      },
    ]
    return (
      <Spreadsheet data={data} />
    )
  })
