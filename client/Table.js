function heatMapColorforValue(value) {
  var h = (1.0 - value) * 240;
  return "hsl(" + h + ", 80%, 70%)";
}

const Table = ({ stats, currentDay, currentHour }) => {
  const border = "2px solid #32308e";
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
          backgroundColor: "#ffd89f",
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
          .filter((hour) => hour >= 6 && hour <= 22)
          .map((hour) => (
            <div key={hour} style={{ padding: 5 }}>
              {hour % 12 || 12}
              {hour < 12 || hour === 24 ? "am" : "pm"}
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
                .filter(([hourIndex]) => hourIndex >= 6 && hourIndex <= 22)
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
                        boxShadow: isCurrent
                          ? "rgba(0, 0, 0, 50%) 0px 0px 6px 1px"
                          : undefined,
                        textDecoration:
                          average && isCurrent ? "underline" : undefined,
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
