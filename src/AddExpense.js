import React from "react";

class AddExpense extends React.Component {
  state = {
    isOpenInput: false
  };
  addExpense = () => {
    const { addBill } = this.props;
    const description = this.desc.value;
    const amount = this.amount.value;
    const email = this.selectFriend.value;
    if (!description || !amount) return;
    const time = new Date().toISOString();
    addBill({
      description,
      amount,
      email,
      time
    });
  };
  render() {
    const { friends = [] } = this.props;
    return (
      <div className="addexpense-container">
        <button onClick={this.addExpense}>Add Expense</button>
        <div>
          <input
            type="text"
            placeholder="Description"
            ref={desc => {
              this.desc = desc;
            }}
          />
          <input
            type="number"
            placeholder="Amount"
            ref={amount => {
              this.amount = amount;
            }}
          />
          <select
            className="friend-select"
            ref={selectFriend => {
              this.selectFriend = selectFriend;
            }}
          >
            {friends.map(friend => {
              const { email, name } = friend;
              return (
                <option key={email} value={email}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    );
  }
}

export default AddExpense;
