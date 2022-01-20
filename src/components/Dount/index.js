import React from "react";
import "chart.js/auto";
import { Card } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { selectMyExpenses } from "../../store/myExpenses/selector";
import { selectUser } from "../../store/user/selector";

export default function Dount() {
  const myExpense = useSelector(selectMyExpenses);
  const { budget } = useSelector(selectUser);
  const balance = "balance left";

  console.log("All data of myExpense selector", myExpense);

  const categoryName = myExpense.map((nm) => {
    return nm.category.name;
  });
  console.log(" category name", categoryName);

  const categoryColor = myExpense.map((c) => {
    return c.category.color;
  });
  console.log(" category color", categoryColor);

  const amt = myExpense.map((ex) => {
    return ex.amount;
  });
  console.log("amount ", amt);
  const expense = {
    labels: [...categoryName, balance],
    datasets: [
      {
        label: "Monthy Expense",
        backgroundColor: [...categoryColor, "#808080"],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [...amt, budget],
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: true,
        postion: "bottom",
      },
      title: {
        text: "My monthly expenses",
        display: "true",
        color: "blue",
        fontSize: 20,
      },
    },
  };

  return (
    <div className="dountChart">
      <Card className="mt-5" style={{width:"100%",display:"flex"}}>
        <Doughnut data={expense} options={options} />
      </Card>
    </div>
  );
}
