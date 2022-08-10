import { getDayFromIndex } from "./util.js";

const Status = ({
  mostRecentLog,
  currentStat,
  currentDay,
  currentHour,
  isOpen,
}) => {
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

  const averageCountString =
    currentStat == undefined
      ? "...I'm not sure actually"
      : currentStat.average > 1
      ? `around ${currentStat.average} people`
      : currentStat.average === 1
      ? `around ${currentStat.average} person`
      : "nobody there";

  const diff =
    mostRecentLog && currentStat
      ? Math.abs(mostRecentLog.count - currentStat.average)
      : 0;
  return (
    <div style={{ textAlign: "center", fontSize: 30, margin: "60px 0px" }}>
      <div>There's about </div>
      <div style={{ fontSize: 62, margin: 15 }}>
        {mostRecentLog.count} people
      </div>
      <div>climbing right now</div>
      <div style={{ marginBottom: 80 }}>
        (at <a href="https://www.boulderbrighton.com/">Boulder Brighton</a>)
      </div>
      <p style={{ fontStyle: "italic", letterSpacing: 1.3 }}>{status}</p>
      {!isOpen && <div>(because it's closed)</div>}
      {diff > 20 && (
        <div style={{ fontSize: 20 }}>
          At this time on a {getDayFromIndex(currentDay)}, there's usually{" "}
          {averageCountString}
        </div>
      )}
    </div>
  );
};

export default Status;
