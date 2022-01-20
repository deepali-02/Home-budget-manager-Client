import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/user/selector";

export const Progress = ( props ) => {
  //const { budget } = useSelector(selectUser);
  return (
    <div className="progress">
      <div className="progress-done" style={{ opacity: 1, width: `${props.budget}` }}>
        {props.budget}
      </div>
    </div>
  );
};
