#[derive(Debug)]
struct Cell {
  cell_number: u32,
  sum: u32,
  visited: bool
}

pub fn part1(input: &str) -> u32 {
  let rows = input.trim().split("\n");

  let mut grid = Vec::new();

  for row in rows {
    let mut row_vector = Vec::new();
    let cells = row.chars();
    for cell in cells {
      row_vector.push(Cell {
        cell_number: cell.to_digit(10).unwrap(),
        sum: 0,
        visited: false
      });
    }
    grid.push(row_vector);
  }

  let height = grid.len();
  let width = grid[0].len();

  // Now we have a vector of Cells. Starting at the upper left, get the sum of above plus me, and left plus me
  for diagonal in 1..(width + height - 1) {

    // println!("Checking diagonal {}", diagonal);
    for x in 0..(diagonal+1) {
      let y = diagonal - x;
      if y >= height || x >= width {
        continue;
      }

      // println!("\tChecking cell {},{}", x, y);
      let this_cell = &grid[x][y];

      if x == 0 && y == 0 {
        // On the 0,0 cell
        (&mut grid[x][y]).sum = 0;
        continue;
      }

      // println!("\t\tPrev sums");

      let min_sum = if y == 0 {
        // println!("\t\t\tprev x {}", grid[x - 1][y].sum);
        grid[x - 1][y].sum
      } else if x == 0 {
        // println!("\t\t\t prev y {}", grid[x][y - 1].sum);
        grid[x][y - 1].sum
      } else {
        let left = grid[x - 1][y].sum;
        let above = grid[x][y - 1].sum;
        // println!("\t\t\t{}, {}", left, above);
        if left > above {
          above
        } else {
          left
        }
      };

      let new_sum = this_cell.cell_number + min_sum;
      // println!("\t\tNew sum {}+{}={}", this_cell.cell_number, min_sum, new_sum);

      (&mut grid[x][y]).sum = new_sum;
    }

  }

  let last_row = &grid[grid.len() - 1];
  let last_cell = &last_row[last_row.len() - 1];

  return last_cell.sum;
}
