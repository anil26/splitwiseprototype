import React from "react";

class AddFriend extends React.Component {
  state = {
    isOpenInput: false
  };
  addFriend = () => {
    const email = this.email.value;
    const name = this.name.value;
    if (!email || !name) {
      return;
    }
    const { addFriends } = this.props;
    addFriends({
      email,
      name,
      bills: [],
      totalLiability: 0,
      totalCredit: 0,
      splitFriends: []
    });
  };
  render() {
    return (
      <div className="addfriend-container">
        <button onClick={this.addFriend}>Add Friends +</button>
        <input
          ref={el => {
            this.email = el;
          }}
          type="email"
          className="friend-email"
          placeholder="emailId"
        />
        <input
          className="friend-name"
          placeholder="name"
          type="text"
          ref={el => {
            this.name = el;
          }}
        />
      </div>
    );
  }
}

export default AddFriend;
