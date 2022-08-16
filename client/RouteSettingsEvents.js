import { timeUntilDate, border } from "./util";

const RouteSettingsEvents = ({ events }) => {
  return (
    <div
      style={{
        border,
        marginBottom: 40,
        padding: 20,
      }}
    >
      <h1>Upcoming Resets</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <tbody>
          {events.map(({ uid, when, summary, description }, index) => (
            <tr
              key={uid}
              style={{
                borderBottom: index !== events.length - 1 ? border : undefined,
              }}
            >
              <td
                style={{ paddingTop: 10, paddingBottom: 5, paddingRight: 10 }}
              >
                {summary}
                {description ? <div>[{description}]</div> : null}
              </td>
              <td
                style={{ paddingTop: 10, paddingBottom: 5, whiteSpace: "pre" }}
              >
                {timeUntilDate(new Date(when))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RouteSettingsEvents;
