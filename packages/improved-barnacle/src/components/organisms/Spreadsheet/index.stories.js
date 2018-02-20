import React from 'react'
import { storiesOf } from '@storybook/react'
import { Spreadsheet } from 'components'

storiesOf('Spreadsheet', module)
  .add('default', () => {
    const data = [
      {
        id: '1',
        name: 'Jack',
      },
      {
        id: '2',
        name: 'Daniel',
      },
      {
        id: '3',
        name: 'Sam',
      },
    ]
    return (
      <Spreadsheet data={data} />
    )
  })
