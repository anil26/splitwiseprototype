import React from "react";
import Bill from "./Bill";

class Bills extends React.Component {
  getbillList = () => {
    const { friends } = this.props;
    const finalBillList = [];
    friends.forEach((friend, index) => {
      const { email, bills, splitFriends } = friend;
      const billList = bills;
      billList.forEach(bill => {
        const copyBill = { ...bill };
        copyBill.owner = email;
        copyBill.splitFriends = splitFriends;
        finalBillList.push(copyBill);
      });
    });
    console.log("t===>", finalBillList);
    return finalBillList;
  };
  render() {
    console.log("this.getbillList()", this.getbillList());
    debugger;
    const { friends, splitExpense, deleteExpense, removeMember } = this.props;
    return (
      <div className="bill-container">
        {this.getbillList().map(bill => {
          const { owner, splitFriends, amount, description, time } = bill;
          return (
            <Bill
              owner={owner}
              splitFriends={splitFriends}
              amount={amount}
              description={description}
              time={time}
              friends={friends}
              splitExpense={splitExpense}
              deleteExpense={deleteExpense}
              removeMember={removeMember}
            />
          );
        })}
      </div>
    );
  }
}

export default Bills;
