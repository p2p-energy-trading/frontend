const StatusDot = ({ status }) => {
  let color = "text-warning";
  if (status === "Exporting") color = "text-success";
  else if (status === "Importing") color = "text-error";
  else if (status === "Idle") color = "text-base-content";
  return (
    <span className={`inline-flex items-center gap-1 ${color} font-semibold`}>
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="10" />
      </svg>
      {status}
    </span>
  );
};

export default StatusDot;