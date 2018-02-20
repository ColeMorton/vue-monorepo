import React from 'react'
import PropTypes from 'prop-types'

import { Table } from 'components'
import { Input } from 'components'

class Spreadsheet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      editingItem: { id: undefined },
    }
  }

  handleClick(item) {
    console.log('Clicked!!!')
    this.setState({
      editingItem: item,
    })
    console.log(this.state)
  }

  handleChange(value, item) {
    console.log('value', value)
    console.log('item', item)
    const data = this.state.data.map((_item) => {
      if (_item.id === item.id) {
        return {
          id: _item.id,
          name: value,
        }
      }
      return _item
    })
    this.setState({ data })
  }

  render() {
    const { data, editingItem } = this.state
    const regular = (item) => (<td onClick={() => this.handleClick(item)}>{ item.name }</td>)
    const editing = (item) => (
      <td>
        <Input reverse type="text" value={item.name} onChange={(e) => this.handleChange(e.target.value, item)} />
      </td>
    )
    return (
      <Table caption="Spreadsheet">
        {
          data.map(item => (
            <tr key={item.id} >
              <td>{ item.id }</td>
              {
                item.id !== editingItem.id && regular(item)
              }
              {
                item.id === editingItem.id && editing(item)
              }
            </tr>
          ))
        }
      </Table>
    )
  }
}

Spreadsheet.propTypes = {
  data: PropTypes.array,
}

export default Spreadsheet
