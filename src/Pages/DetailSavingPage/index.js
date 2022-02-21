import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { selectToken } from "../../store/user/selector";
import { detailsaving } from "../../store/Goal/action";

export default function DetailSavings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
  const { id } = useParams();
  console.log("Id from saving detail page", id);
  useEffect(() => {
    if (token === null) {
      navigate("/");
    }
    dispatch(detailsaving(id));
  }, []);
  return <div>Savings Details</div>;
}
