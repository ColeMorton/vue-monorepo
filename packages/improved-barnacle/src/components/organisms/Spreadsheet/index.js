import React from 'react'
import PropTypes from 'prop-types'

import { Table, FocusableInput, Label } from 'components'

class Spreadsheet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      editingItem: { id: undefined },
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClick(item) {
    this.setState({
      editingItem: item,
    })
  }

  handleChange(value, item) {
    const data = this.state.data.map((_item) => {
      if (_item.id === item.id) {
        return Object.assign(item, {
          name: value,
        })
      }
      return _item
    })
    this.setState({ data })
  }

  handleSubmit(e) {
    this.setState({ editingItem: { id: undefined } })
    e.preventDefault()
  }

  render() {
    const { data, editingItem } = this.state
    const regular = item => (
      <td onClick={() => this.handleClick(item)}>
        <Label>{ item.name }</Label>
      </td>
    )
    const editing = item => (
      <td>
        <form onSubmit={this.handleSubmit}>
          <FocusableInput
            reverse
            value={item.name}
            onChange={e => this.handleChange(e.target.value, item)}
          />
        </form>
      </td>
    )
    return (
      <Table
        caption="Spreadsheet"
        head={
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        }
      >
        {
          data.map(item => (
            <tr key={item.id} >
              <td>{ item.id }</td>
              { item.id !== editingItem.id ? regular(item) : item.id === editingItem.id && editing(item) }
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
