function heatMapColorforValue(value) {
  var h = (1.0 - value) * 240;
  return "hsl(" + h + ", 80%, 70%)";
}

const Table = ({ stats }) => {
  const border = "2px solid #32308e";
  return (
    <div
      style={{
        display: "flex",
        marginTop: 20,
        textAlign: "center",
        backgroundColor: "rgba(1,1,1,0.12)",
        border,
      }}
    >
      <div
        style={{
          borderRight: border,
          textAlign: "center",
          backgroundColor: "#ffd89f",
        }}
      >
        <div style={{ fontWeight: "bold", background: "#c47fff", padding: 5 }}>
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
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Object.keys(stats.days).length}, 1fr)`,
          textAlign: "center",
          overflowX: "scroll",
          width: "100%",
          maxWidth: 800,
        }}
      >
        {Object.entries(stats.days).map(([dayIndex, { name, hours }]) => (
          <div
            key={dayIndex}
            style={{
              borderRight: border,
            }}
          >
            <div
              style={{ fontWeight: "bold", padding: 5, background: "#c47fff" }}
            >
              {name}
            </div>
            {Object.entries(hours)
              .filter(([hourIndex]) => hourIndex >= 6 && hourIndex <= 22)
              .map(([hourIndex, { average, counts }]) => (
                <div
                  key={hourIndex}
                  style={{
                    padding: 5,
                    backgroundColor: average
                      ? heatMapColorforValue(average / 150)
                      : undefined,
                  }}
                >
                  {counts.length === 0 ? "-" : average}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
