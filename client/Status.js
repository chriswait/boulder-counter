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
    <div style={{ textAlign: "center", fontSize: 30, margin: "60px 0px" }}>
      <div>There's about </div>
      <div style={{ fontSize: 62, margin: 15 }}>
        {mostRecentLog.count} people
      </div>
      <div>climbing right now</div>
      <div>
        (at <a href="https://www.boulderbrighton.com/">Boulder Brighton</a>)
      </div>
      <p style={{ fontStyle: "italic", letterSpacing: 1.3 }}>{status}</p>
    </div>
  );
};

export default Status;
