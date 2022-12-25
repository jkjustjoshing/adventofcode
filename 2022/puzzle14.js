import fs from "fs/promises";

const lines = `498,4 -> 498,6 -> 496,6
  503,4 -> 502,4 -> 502,9 -> 494,9`
  .split("\n")
  .map((row) => {
    return row.split(" -> ").map((pair) => {
      const [a, b] = pair.split(",");
      return { x: parseInt(a, 10), y: parseInt(b, 10) };
    });
  });

console.log(lines);

const xs = lines.flat().map((a) => a.x);
const ys = lines.flat().map((a) => a.y);
const minx = Math.min(...xs);
const maxx = Math.max(...xs);
const miny = Math.min(...ys);
const maxy = Math.max(...ys);
const svg = `<svg width="${maxx - minx + 1}" height="${
  maxy - miny + 1
}" viewBox="${minx - 0.5} ${miny - 0.5} ${maxx - minx + 1} ${
  maxy - miny + 1
}" xmlns="http://www.w3.org/2000/svg">
<style type="text/css">path{stroke-width: 1;stroke: black;fill:none;}</style>
  ${lines
    .map((line) => {
      return `<path d="${line.map((point, i) => {
        if (i === 0) {
          return `M${point.x},${point.y}`;
        } else {
          return `L${point.x},${point.y}`;
        }
      })}"></path>`;
    })
    .join("\n")}
</svg>`;
console.log(svg);

fs.writeFile("./14.svg", svg);
