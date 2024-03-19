const Badge = ({ difficulty, priority, deadline, type }) => {
  return (
    <div>
      {difficulty == "hard" && (
        <span className="inline-flex items-center rounded-md bg-red-50 px-1 py-1 text-xs font-medium ring-1 ring-inset text-red-700 ring-red-600/10">
          Hard
        </span>
      )}

      {difficulty == "decent" && (
        <span className="inline-flex items-center rounded-md bg-yellow-50 px-1 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
          Decent
        </span>
      )}

      {difficulty == "easy" && (
        <span className="inline-flex items-center rounded-md bg-green-50 px-1 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
          Easy
        </span>
      )}

      {priority == "high" && (
        <span className="inline-flex items-center rounded-md bg-red-50 px-1 text-xs font-medium ring-1 ring-inset text-red-700 ring-red-600/10">
          High
        </span>
      )}

      {priority == "medium" && (
        <span className="inline-flex items-center rounded-md bg-yellow-50 px-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
          Medium
        </span>
      )}

      {priority == "low" && (
        <span className="inline-flex items-center rounded-md bg-green-50 px-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
          Low
        </span>
      )}

      {type == "short" && (
        <span className="inline-flex items-center rounded-md bg-red-50 px-1 text-xs font-medium ring-1 ring-inset text-red-700 ring-red-600/10">
          Short-Term
        </span>
      )}

      {type == "mid" && (
        <span className="inline-flex items-center rounded-md bg-yellow-50 px-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
          Mid-Term
        </span>
      )}

      {type == "long" && (
        <span className="inline-flex items-center rounded-md bg-green-50 px-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
          Long-Term
        </span>
      )}

      {/* Green */}
      {!["Today", "Tomorrow", "Missed", undefined, null].includes(deadline) && (
        <span className="inline-flex items-center rounded-md bg-green-50 px-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
          {deadline}
        </span>
      )}

      {/* Yellow */}
      {(deadline == "Today" || deadline == "Tomorrow") && (
        <span className="inline-flex items-center rounded-md bg-yellow-50 px-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
          {deadline}
        </span>
      )}

      {/* Yellow */}
      {deadline == "Missed" && (
        <span className="inline-flex items-center rounded-md bg-red-50 px-1 text-xs font-medium ring-1 ring-inset text-red-700 ring-red-600/10">
          {deadline}
        </span>
      )}
    </div>
  );
};

export default Badge;
