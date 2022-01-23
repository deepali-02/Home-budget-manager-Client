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

export default function BarChart1() {
  const myExpense = useSelector(selectMyExpenses);
  // const expense = [
  //   {
  //     name: myExpense.map((nm) => nm.category.name),
  //     amount: myExpense.map((ex) => ex.amount),
  //   },
  // ];
  // console.log("expense from history", expense);
  const expense = myExpense.map((ex) => ({
    name: ex.category.name,
    amount: ex.amount,
  }));
  console.log("expense from history", expense);
  // const name = myExpense.map((nm) => nm.category.name);
  // const amount = myExpense.map((ex) => ex.amount);
  return (
    <div>
      <BarChart
        width={500}
        height={300}
        data={expense}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="amont" fill="#8884d8" background={{ fill: "#eee" }} />
      </BarChart>
    </div>
  );
}
