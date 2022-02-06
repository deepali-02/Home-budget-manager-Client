import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { BarChart } from "recharts";
import { MDBContainer } from "mdbreact";

// import { useNavigate } from "react-router";
import { selectSearchMonth } from "../../store/myExpenses/selector";
import { selectMyExpenses } from "../../store/myExpenses/selector";
// import { selectUser } from "../../store/user/selector";

export default function BarChart2() {
  const myExpense = useSelector(selectMyExpenses);
  const monthExpense = useSelector(selectSearchMonth);
  //     const { budget, token } = useSelector(selectUser);
  //   const navigate = useNavigate();
  let mergedCategories;

  if (monthExpense.length !== 0) {
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
  console.log("Categories Name", categoryName);

  const amt = mergedCategories.map((ex) => {
    return ex.amount;
  });
  console.log("Amount from bar2", amt);

  const data = {
    labels: categoryName,
    datasets: [
      {
        label: "Expenses per category",
        data: amt,
        backgroundColor: "#1EE59B",
        borderWidth: 1,
        borderColor: "#000000",
      },
    ],
  };

  return (
    <MDBContainer>
      {/* <BarChart barSize={20}> */}
      <Bar data={data} style={{ maxHeight: "600px" }} />
      {/* </BarChart> */}
    </MDBContainer>
  );
}
