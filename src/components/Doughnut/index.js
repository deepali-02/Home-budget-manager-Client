import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { MDBContainer } from "mdbreact";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import "./style.css";

import { useSelector } from "react-redux";
import { selectMyExpenses } from "../../store/myExpenses/selector";
import { selectSearchMonth } from "../../store/myExpenses/selector";
import { selectUser } from "../../store/user/selector";
import Loading from "../Loading";

export default function DoughnutChart() {
  const myExpense = useSelector(selectMyExpenses);
  const monthExpense = useSelector(selectSearchMonth);
  console.log("Month Expenses from doughnut", monthExpense);
  const { budget, token } = useSelector(selectUser);

  const navigate = useNavigate();
  let mergedCategories;

  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [token, navigate]);

  if (monthExpense.length !== 0) {
    console.log("length ", monthExpense.length);
    mergedCategories = monthExpense.reduce((acc, expense) => {
      const categoryExist = acc.find(
        (eachExpense) => eachExpense.categoryId === expense.categoryId
      );

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
  } else {
    mergedCategories = myExpense.reduce((acc, expense) => {
      const categoryExist = acc.find(
        (eachExpense) => eachExpense.categoryId === expense.categoryId
      );

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
  }

  const categoryName = mergedCategories.map((nm) => nm.category.name);

  const categoryColor = mergedCategories.map((c) => c.category.color);

  const amt = mergedCategories.map((ex) => ex.amount);

  let sum = amt.reduce((a, b) => a + b, 0);

  const bal = "Balance left";
  let balance = budget - sum;

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
      responsive: true,
      maintainAspectRatio: true,
    },
  };
  return (
    <div>
      {!expense && !options ? (
        <Loading />
      ) : (
        <>
          <MDBContainer>
            <Doughnut data={expense} options={options} />
          </MDBContainer>
        </>
      )}
    </div>
  );
}
