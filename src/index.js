import React from "react";
import ReactDOM from "react-dom";
import AddFriend from "./AddFriend";
import AddExpense from "./AddExpense";
import Bills from "./Bills.js";
import { getFromLocalStorage, keyName, saveInLocalStorage } from "./utils";

import "./styles.css";

class App extends React.Component {
  state = {
    friends: getFromLocalStorage(keyName),
    viewMode: false
  };

  checkIfAlreadyExists = id => {
    return false;
  };

  addFriends = friend => {
    const { friends } = this.state;
    const { email } = friend;
    if (this.checkIfAlreadyExists(email)) return;
    const copyFriends = [...friends];
    copyFriends.push(friend);
    saveInLocalStorage(copyFriends, keyName);
    this.setState({
      ...this.state,
      friends: copyFriends
    });
  };
  addBill = bill => {
    const { friends } = this.state;
    const { email, amount, description, time } = bill;
    const copyFriends = [...friends];
    const indexOfFriend = copyFriends.findIndex(element => {
      return element.email === email;
    });

    if (indexOfFriend !== -1) {
      copyFriends[indexOfFriend].bills.push({
        email,
        amount,
        description,
        time
      });
    }
    this.setState({
      ...this.state,
      friends: copyFriends
    });
    saveInLocalStorage(copyFriends, keyName);
  };

  removeMember = (ownerEmail, id, toRemoveEmail, amount) => {
    const { friends } = this.state;
    const copyFriends = [...friends];
    const indexOfOwner = this.findFriend(friends, ownerEmail);
    if (indexOfOwner !== -1) {
      const { splitFriends } = copyFriends[indexOfOwner];
      const newSplitFriends = splitFriends.reduce((acc, split) => {
        if (split.email !== toRemoveEmail) {
          acc.push(split);
        }
        return acc;
      }, []);
      const newSplitArrLength = newSplitFriends.length;
      const newAmount = amount / (newSplitArrLength + 1);
      newSplitFriends.forEach(el => {
        el.amount = parseInt(newAmount, 10);
      });
      copyFriends[indexOfOwner].splitFriends = newSplitFriends;
      this.setState({
        ...this.state,
        friends: copyFriends
      });
      saveInLocalStorage(copyFriends, keyName);
    }
  };

  findFriend = (friends, email) => {
    return friends.findIndex(friend => {
      return friend.email === email;
    });
  };

  deleteExpense = (email, id) => {
    const { friends } = this.state;
    const copyFriends = [...friends];
    copyFriends.forEach(el => {
      if (el.email === email) {
        const { splitFriends, bills } = el;
        const newBills = bills.reduce((acc, element) => {
          if (element.time !== id) {
            acc.push(element);
          }
          return acc;
        }, []);
        el.bills = newBills;
        const newSplitFriends = [];
        splitFriends.forEach(split => {
          if (split.time !== id) {
            newSplitFriends.push(split);
          }
        });
        el.splitFriends = newSplitFriends;
      }
    });
    this.setState({
      ...this.state,
      friends: copyFriends
    });
    saveInLocalStorage(copyFriends, keyName);
  };
  splitExpense = (email, expenseObj) => {
    const { friends } = this.state;
    const { splitFriends, amount, time, email: expenseOwner } = expenseObj;
    const indexOfFriend = this.findFriend(friends, expenseOwner);
    const lengthSplitFriends = splitFriends.length;
    const copyFriends = [...friends];
    if (indexOfFriend !== -1) {
      const amountTobeUpdated = amount / (lengthSplitFriends + 2);
      const tobeUpdatedFriend = copyFriends[indexOfFriend];
      const { splitFriends } = tobeUpdatedFriend;
      const indexInSplit = this.findFriend(splitFriends, email);
      if (splitFriends.length === 0 || indexInSplit === -1) {
        splitFriends.push({
          amount: amountTobeUpdated,
          email,
          time
        });
        splitFriends.forEach(friend => {
          if (friend.time === time) {
            friend.amount = amountTobeUpdated;
          }
        });
      }
      this.setState({
        ...this.state,
        friends: copyFriends
      });
      saveInLocalStorage(copyFriends, keyName);
    }
  };

  render() {
    const { friends } = this.state;
    return (
      <div className="App">
        <h1>SplitWise App</h1>
        <AddFriend addFriends={this.addFriends} />
        <AddExpense friends={friends} addBill={this.addBill} />
        <Bills
          friends={friends}
          splitExpense={this.splitExpense}
          deleteExpense={this.deleteExpense}
          removeMember={this.removeMember}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
