import moment from "moment";

interface DateDisplayProps {
  createdAt: string;
  updatedAt: string;
}

const DateDisplay = ({ createdAt, updatedAt }: DateDisplayProps) => {
  return (
    <div style={{ color: "#959699" }}>
      <small>
        Created: {moment(createdAt).format("MMM D, YYYY h:mm A")} | Updated:{" "}
        {moment(updatedAt).format("MMM D, YYYY h:mm A")}
      </small>
    </div>
  );
};

export default DateDisplay;
