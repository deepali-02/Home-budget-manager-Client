import {
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import { useSelector } from "react-redux";
import { selectMyExpenses } from "../../store/myExpenses/selector";
import { selectUser } from "../../store/user/selector";

export default function BarChart1() {
  const myExpense = useSelector(selectMyExpenses);
  const { budget } = useSelector(selectUser);
  // const expense = [

  //   {
  //     name: myExpense.map((nm) => nm.category.name),
  //     amount: myExpense.map((ex) => ex.amount),
  //   },
  // ];
  // console.log("expense from history", expense);
  // const name = myExpense.map((nm) => nm.category.name);
  // const amount = myExpense.map((ex) => ex.amount);

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

  const expense = mergedCategories.map((ex) => ({
    name: ex.category.name,
    amount: ex.amount,
  }));
  console.log("expense from history", expense);

  return (
    <div>
      <BarChart
        width={800}
        height={500}
        data={expense}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis domain={[0, 500]} />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="10 10" />
        <Bar dataKey="amount" fill="#bd0b61" background={{ fill: "#eee" }} />
      </BarChart>
    </div>
  );
}
