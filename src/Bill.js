import React from "react";
class Bill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSplitWindow: false,
      selectedFriend: ""
    };
  }
  onClickSplit = () => {
    const { showSplitWindow } = this.state;
    this.setState({
      showSplitWindow: !showSplitWindow
    });
  };

  deleteExpense = () => {
    const { deleteExpense, time, owner } = this.props;
    deleteExpense(owner, time);
  };

  splitExpense = () => {
    const selectedFriend = this.mySelect.value;
    if (!selectedFriend) {
      return;
    }
    const {
      owner,
      description,
      time,
      splitFriends,
      amount,
      friends,
      splitExpense
    } = this.props;
    splitExpense(selectedFriend, {
      amount: parseInt(amount, 10),
      time,
      splitFriends,
      email: owner
    });
  };

  selectFriend = event => {
    this.setState({
      selectedFriend: event.target.value
    });
  };

  onClickRemove = () => {
    const toRemoveEmail = this.myRemove.value;
    const {
      owner,
      time,
      amount,
      removeMember,
      description,
      splitFriends,
      friends
    } = this.props;
    removeMember(owner, time, toRemoveEmail, amount);
  };
  render() {
    const { owner, description, splitFriends, amount, friends } = this.props;
    const { showSplitWindow } = this.state;
    return (
      <div className="ubill-container">
        <div className="bill-row" ke>
          <div>{owner}</div>
          <div>{amount}</div>
          <div>{description}</div>
          {splitFriends &&
            splitFriends.map(friend => {
              return (
                <span>
                  {friend.email}---> {friend.amount}
                </span>
              );
            })}
          <button onClick={this.onClickSplit}>Split</button>
        </div>
        {showSplitWindow && (
          <div className="split-section">
            <button
              onClick={() => {
                this.deleteExpense();
              }}
            >
              Delete Expense
            </button>
            <button onClick={this.splitExpense}>Split Expense</button>
            <select
              ref={el => {
                this.mySelect = el;
              }}
              defaultValue={friends.length !== 0 ? friends[0].email : ""}
              onChange={this.selectFriend}
            >
              {friends.map(friend => {
                if (friend.email === owner) return null;
                return (
                  <option key={friend.email} value={friend.email}>
                    {friend.email}
                  </option>
                );
              })}
            </select>
            <button onClick={this.onClickRemove}>Remove member</button>
            <select
              ref={el => {
                this.myRemove = el;
              }}
              defaultValue={friends.length !== 0 ? friends[0].email : ""}
              onChange={this.selectFriend}
            >
              {friends.map(friend => {
                if (friend.email === owner) return null;
                return (
                  <option key={friend.email} value={friend.email}>
                    {friend.email}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>
    );
  }
}

export default Bill;
