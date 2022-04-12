export const Progress = (props) => {
  return (
    <div className="progress">
      <div
        className="progress-done"
        style={{ opacity: 1, width: `${props.budget}` }}
      >
        {props.budget}
      </div>
    </div>
  );
};
