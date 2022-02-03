import React, { useEffect, useState } from "react";
import "chart.js/auto";
// import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";

import { Card } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import "./style.css";
import { useSelector } from "react-redux";
import { selectMyExpenses } from "../../store/myExpenses/selector";
import { selectSearchMonth } from "../../store/myExpenses/selector";
import { selectUser } from "../../store/user/selector";
import { useNavigate } from "react-router";
import Loading from "../Loading";
import { MDBContainer } from "mdbreact";

export default function DoughnutChart() {
  const myExpense = useSelector(selectMyExpenses);

  const monthExpense = useSelector(selectSearchMonth);
  // console.log("Month Expenses from doughnut", monthExpense);
  const { budget, token } = useSelector(selectUser);

  const navigate = useNavigate();
  let mergedCategories;
  // console.log("Hiiiiiii");
  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
  }, [token, navigate]);

  // console.log("All data of myExpense selector", myExpense);
  if (monthExpense.length !== 0) {
    console.log("length ", monthExpense.length);
    mergedCategories = monthExpense.reduce((acc, expense) => {
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
  } else {
    mergedCategories = myExpense.reduce((acc, expense) => {
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
  }

  const categoryName = mergedCategories.map((nm) => nm.category.name);

  const categoryColor = mergedCategories.map((c) => c.category.color);
  //console.log(" category color", categoryColor);

  const amt = mergedCategories.map((ex) => ex.amount);
  //console.log("amount ", amt);

  let sum = amt.reduce((a, b) => a + b, 0);
  //console.log("sum", sum);

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
  // console.log(showDialog);
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
