import { heatMapColorforValue, border } from "./util";

const Table = ({ stats, currentDay, currentHour }) => {
  const to12Hour = (hour) => hour % 12 || 12;
  return (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        border,
        marginBottom: 40,
      }}
    >
      <div
        style={{
          borderRight: border,
          textAlign: "center",
          backgroundColor: "rgba(226, 139, 114, 90%)",
          whiteSpace: "pre",
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            background: "#c47fff",
            padding: 5,
            background: "linear-gradient(40deg, #ffd89f, rgb(196, 127, 255))",
          }}
        >
          &nbsp;
        </div>
        {[...Array(24).keys()]
          .filter((hour) => hour >= 6 && hour <= 21)
          .map((hour) => (
            <div key={hour} style={{ padding: 5 }}>
              {/* {hour % 12 || 12}
              {hour < 12 || hour === 24 ? "am" : "pm"} */}
              {`${to12Hour(hour)}-${to12Hour(hour + 1)}`}
            </div>
          ))}
      </div>
      <div
        className="table"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Object.keys(stats.days).length}, 1fr)`,
          textAlign: "center",
          overflowX: "auto",
          width: "100%",
        }}
      >
        {Object.entries(stats.days).map(
          ([dayIndex, { name, hours }], index) => (
            <div
              key={dayIndex}
              style={{
                minWidth: 84,
                borderRight:
                  index === Object.entries(stats.days).length - 1
                    ? undefined
                    : border,
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  padding: 5,
                  background: "#c47fff",
                  textDecoration:
                    +dayIndex === currentDay ? "underline" : undefined,
                }}
              >
                {name}
              </div>
              {Object.entries(hours)
                .filter(([hourIndex]) => hourIndex >= 6 && hourIndex <= 21)
                .map(([hourIndex, { average }]) => {
                  const isCurrent =
                    +dayIndex === currentDay && +hourIndex === currentHour;
                  return (
                    <div
                      key={hourIndex}
                      style={{
                        padding: 5,
                        backgroundColor: average
                          ? heatMapColorforValue(average / 150)
                          : undefined,
                        ...(isCurrent
                          ? {
                              boxShadow: "rgba(0, 0, 0, 50%) 0px 0px 6px 1px",
                              textDecoration: average ? "underline" : undefined,
                              position: "relative",
                            }
                          : {}),
                      }}
                    >
                      {average ?? "-"}
                    </div>
                  );
                })}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Table;
