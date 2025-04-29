import { useState } from "react";

export default function App() {
  const tileColors = ["#333333", "#e63946", "#f1faee", "#a8dadc", "#457b9d"];
  const gridSize = 6;
  const [grid, setGrid] = useState(
    Array.from({ length: gridSize }, () => Array(gridSize).fill("#333333"))
  );
  const [selectedColor, setSelectedColor] = useState(tileColors[1]);

  function paint(r, c) {
    const n = grid.map((row, i) =>
      row.map((col, j) => (i === r && j === c ? selectedColor : col))
    );
    setGrid(n);
  }

  function reset() {
    setGrid(Array.from({ length: gridSize }, () => Array(gridSize).fill("#333333")));
  }

  const count = grid.flat().filter(c => c === selectedColor).length;

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h1>EZ Tiles Floor Visualizer</h1>

      <div style={{ margin: "20px 0" }}>
        {tileColors.map(color => (
          <button
            key={color}
            onClick={() => setSelectedColor(color)}
            style={{
              background: color,
              width: 30,
              height: 30,
              margin: 5,
              border: selectedColor === color ? "2px solid black" : "1px solid #ccc"
            }}
          />
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 40px)`,
          gap: 2,
          justifyContent: "center"
        }}
      >
        {grid.map((row, i) =>
          row.map((col, j) => (
            <div
              key={`${i}-${j}`}
              onClick={() => paint(i, j)}
              style={{
                width: 40,
                height: 40,
                background: col,
                border: "1px solid #ddd",
                cursor: "pointer"
              }}
            />
          ))
        )}
      </div>

      <p style={{ marginTop: 20 }}>
        Selected Color: <strong>{selectedColor}</strong> • Tiles Painted: <strong>{count}</strong>
      </p>
      <button onClick={reset} style={{ marginTop: 10 }}>Reset</button>
    </div>
  );
}
