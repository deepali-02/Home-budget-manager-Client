import React, { useEffect } from "react";
import "chart.js/auto";
import { Card } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { selectMyExpenses } from "../../store/myExpenses/selector";
import { selectUser } from "../../store/user/selector";
import { useNavigate } from "react-router";

export default function DoughnutChart() {
  const myExpense = useSelector(selectMyExpenses);
  const { budget, token } = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [token, navigate]);

  //console.log("All data of myExpense selector", myExpense);
  const mergedCategories = myExpense.reduce((acc, expense) => {
    const categoryExist = acc.find(
      (eachExpense) => eachExpense.categoryId === expense.categoryId
    );
    // console.log("Category Exist", categoryExist);
    const updatedCategory = categoryExist
      ? { ...categoryExist, amount: categoryExist.amount + expense.amount }
      : null;
    const newAcc = updatedCategory
      ? acc.map((eachExpense) => {
          if (
            parseInt(eachExpense.categoryId) ===
            parseInt(updatedCategory.categoryId)
          ) {
            return updatedCategory;
          } else {
            return eachExpense;
          }
        })
      : [...acc, expense];
    return newAcc;
  }, []);

  const categoryName = mergedCategories.map((nm) => {
    return nm.category.name;
  });
  console.log(" Merged category", mergedCategories);

  const categoryColor = mergedCategories.map((c) => {
    return c.category.color;
  });
  //console.log(" category color", categoryColor);

  const amt = mergedCategories.map((ex) => {
    return ex.amount;
  });
  //console.log("amount ", amt);

  let sum = amt.reduce((a, b) => a + b, 0);
  //console.log("sum", sum);

  const bal = "Balance left";
  let balance = budget - sum;
  //console.log("balance", balance);

  const expense = {
    labels: [...categoryName, bal],
    datasets: [
      {
        label: "Monthy Expense",
        backgroundColor: [...categoryColor, "#8f8d86"],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [...amt, balance],
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
    // <div className="dountChart">
    <div className="mt-5" style={{ width: "55%", display: "flex" }}>
      <Doughnut data={expense} options={options} />
    </div>
    // </div>
  );
}
