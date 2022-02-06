import {
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import { ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import { selectMyExpenses } from "../../store/myExpenses/selector";
import { selectUser } from "../../store/user/selector";
import { Container, Row, Col } from "react-bootstrap";
import { selectSearchMonth } from "../../store/myExpenses/selector";
// import { MDBContainer } from "mdbreact";

export default function BarChart1() {
  const myExpense = useSelector(selectMyExpenses);
  const monthExpense = useSelector(selectSearchMonth);

  const { budget } = useSelector(selectUser);

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

  const expense = mergedCategories.map((ex) => ({
    name: ex.category.name,
    amount: ex.amount,
  }));
  console.log("expense from history", expense);

  return (
    <Container>
      <Row sm>
        <Col md={{ span: 3, offset: 3 }}>
          <BarChart
            width={600}
            height={400}
            data={expense}
            // margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            barSize={35}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
              margin={{ left: 10, right: 20 }}
            />
            <YAxis domain={[0, budget]} />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="10 10" />
            <Bar
              dataKey="amount"
              fill="#1EE59B"
              background={{ fill: "#eee" }}
            />
          </BarChart>
        </Col>
      </Row>
    </Container>
  );
}
