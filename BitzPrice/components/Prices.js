class Prices extends React.Component {
  state = {
    currency: 'GBP'
  }

  render() {
    const { currency } = this.state;
    const { data } = this.props;
    const { description, code, rate } = data.bpi[currency]
    return(
      <div>
        <ul className="list-group">
          <li className="list-group-item">
            Bitcoin rate for {description}
            : <span className="badge badge-primary">{code} </span>
            <strong>{rate}</strong>
          </li>
        </ul> 
        <br />
        <select onChange={e => this.setState({ currency: e.target.value })}
          className="form-control">
          <option value="USD">USD</option>
          <option value="GBP">GBP</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
    )
  }
}

export default Prices;
