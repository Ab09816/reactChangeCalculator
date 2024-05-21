import React from 'react';

// define the ChangeCalculator component as a class
export default class ChangeCalculator extends React.Component {
  constructor(props) {
    super(props);
    // Initial state setup with default values
    this.state = {
      amountDue: '',
      amountReceived: '',
      changeDue: '',
      twenties: 0,
      tens: 0,
      fives: 0,
      ones: 0,
      quarters: 0,
      dimes: 0,
      nickels: 0,
      pennies: 0,
      message: '',
      messageType: ''
    };
    // Binding 'this' methods to the component instance
    this.handleInputChange = this.handleInputChange.bind(this);
    this.calculateChange = this.calculateChange.bind(this);
  }

  // Method to handle changes in the input fields and update the state
  handleInputChange(event) {
    const { name, value } = event.target;
    // Updating the state with the new value from the input field
    this.setState({ [name]: value });
  }

  // Method to calculate the change
  calculateChange() {
    const { amountDue, amountReceived } = this.state;
    const due = parseFloat(amountDue);
    const received = parseFloat(amountReceived);

    // Check for invalid input
    if (isNaN(due) || isNaN(received)) {
      this.setState({
        message: 'Please enter valid numbers.',
        messageType: 'danger'
      });
      return;
    }

    const change = received - due;
    // Check if the amount received is less than the amount due
    if (change < 0) {
      this.setState({
        message: `You need $${Math.abs(change).toFixed(2)} more to purchase this item.`,
        messageType: 'danger'
      });
      return;
    }

    // Calculate the number of each denomination needed for the change
    let remainingChange = Math.round(change * 100);

    const twenties = Math.floor(remainingChange / 2000);
    remainingChange %= 2000;
    const tens = Math.floor(remainingChange / 1000);
    remainingChange %= 1000;
    const fives = Math.floor(remainingChange / 500);
    remainingChange %= 500;
    const ones = Math.floor(remainingChange / 100);
    remainingChange %= 100;
    const quarters = Math.floor(remainingChange / 25);
    remainingChange %= 25;
    const dimes = Math.floor(remainingChange / 10);
    remainingChange %= 10;
    const nickels = Math.floor(remainingChange / 5);
    remainingChange %= 5;
    const pennies = remainingChange;

    // Update the state with the calculated change
    this.setState({
      changeDue: change.toFixed(2),
      twenties,
      tens,
      fives,
      ones,
      quarters,
      dimes,
      nickels,
      pennies,
      message: `Total change due: $${change.toFixed(2)}`,
      messageType: 'success'
    });
  }

  // Render method to display the UI
  render() {
    return (
      <div className="container">
        {/* Header section */}
        <header className="mt-3">
          <h1>Change Calculator</h1>
          <p className="lead">Calculate the change due</p>
        </header>
        <div className="row mt-4">
          {/* Input section */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Transaction Details</h5>
                <div className="form-group">
                  <label htmlFor="amountDue">Amount Due:</label>
                  <input
                    type="number"
                    name="amountDue"
                    id="amountDue"
                    className="form-control"
                    value={this.state.amountDue}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="amountReceived">Amount Received:</label>
                  <input
                    type="number"
                    name="amountReceived"
                    id="amountReceived"
                    className="form-control"
                    value={this.state.amountReceived}
                    onChange={this.handleInputChange}
                  />
                </div>
                <button className="btn btn-primary btn-block" onClick={this.calculateChange}>
                  Calculate Change
                </button>
              </div>
            </div>
          </div>
          {/* Output section */}
          <div className="col-md-8">
            {this.state.message && (
              <div className={`alert alert-${this.state.messageType}`} role="alert">
                {this.state.message}
              </div>
            )}
            <div className="row">
              {/* Display each denomination */}
              {['Twenties', 'Tens', 'Fives', 'Ones', 'Quarters', 'Dimes', 'Nickels', 'Pennies'].map((denomination, index) => (
                <div key={index} className="col-md-3">
                  <div className="well">
                    <h2>{denomination}</h2>
                    <p className="change">{this.state[denomination.toLowerCase()]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
