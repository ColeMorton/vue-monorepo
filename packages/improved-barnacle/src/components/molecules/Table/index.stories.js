import React from 'react'
import { storiesOf } from '@storybook/react'
import { Table } from 'components'

storiesOf('Table', module)
  .add('default', () => (
    <Table>
      <tr>
        <td>Cell 1</td>
        <td>Cell 2</td>
        <td>Cell 3</td>
      </tr>
      <tr>
        <td>Cell 1</td>
        <td>Cell 2</td>
        <td>Cell 3</td>
      </tr>
    </Table>
  ))
  .add('with head', () => (
    <Table
      head={
        <tr>
          <th>Heading 1</th>
          <th>Heading 2</th>
          <th>Heading 3</th>
        </tr>
      }
    >
      <tr>
        <td>Cell 1</td>
        <td>Cell 2</td>
        <td>Cell 3</td>
      </tr>
      <tr>
        <td>Cell 1</td>
        <td>Cell 2</td>
        <td>Cell 3</td>
      </tr>
    </Table>
  ))
  .add('with foot', () => (
    <Table
      foot={
        <tr>
          <td>Footer 1</td>
          <td>Footer 2</td>
          <td>Footer 3</td>
        </tr>
      }
    >
      <tr>
        <td>Cell 1</td>
        <td>Cell 2</td>
        <td>Cell 3</td>
      </tr>
      <tr>
        <td>Cell 1</td>
        <td>Cell 2</td>
        <td>Cell 3</td>
      </tr>
    </Table>
  ))
  .add('with caption', () => (
    <Table caption="Hello">
      <tr>
        <td>Cell 1</td>
        <td>Cell 2</td>
        <td>Cell 3</td>
      </tr>
      <tr>
        <td>Cell 1</td>
        <td>Cell 2</td>
        <td>Cell 3</td>
      </tr>
    </Table>
  ))
  .add('with data', () => {
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
      <Table caption="Hello">
        {
          data.map(item => (
            <tr key={item.id} >
              <td>{ item.id }</td>
              <td>{ item.name }</td>
            </tr>
          ))
        }
      </Table>
    )
  })
