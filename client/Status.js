const Status = ({ mostRecentLog }) => {
  const status = mostRecentLog
    ? mostRecentLog.count > 110
      ? "Whoa that's super busy"
      : mostRecentLog.count > 80
      ? "That's pretty busy"
      : mostRecentLog.count > 50
      ? "That's about average"
      : mostRecentLog.count > 20
      ? "That's pretty quiet"
      : mostRecentLog.count > 0
      ? "That's basically empty"
      : "There's literally nobody there"
    : "";
  return (
    <div style={{ textAlign: "center", fontSize: 30 }}>
      <div>There's about </div>
      <div style={{ fontSize: 62 }}>{mostRecentLog.count}</div>
      <div>people climbing right now</div>
      <p>{status}</p>
    </div>
  );
};

export default Status;
