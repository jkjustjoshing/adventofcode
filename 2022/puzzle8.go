package main

import (
	"bufio"
	"fmt"
)

type Tree struct {
	height int

	score int

	visibleFromTop    bool
	visibleFromLeft   bool
	visibleFromBottom bool
	visibleFromRight  bool
}

var (
	colorReset = "\033[0m"
	colorRed   = "\033[31m"
)

func makeGrid(scanner *bufio.Scanner) [][]*Tree {
	grid := make([][]*Tree, 0)
	for scanner.Scan() {
		line := scanner.Text()
		gridLine := make([]*Tree, len(line))
		grid = append(grid, gridLine)
		for i, tree := range line {
			height := int(byte(tree) - '0')
			gridLine[i] = &Tree{height: height}
		}
	}
	return grid
}

func puzzle8(scanner *bufio.Scanner) {
	grid := makeGrid(scanner)

	// Check top and left
	tallestInColIndex := make([]int, len(grid[0]))
	for y, row := range grid {
		tallestInRowIndex := 0
		for x, tree := range row {
			if x == 0 || row[tallestInRowIndex].height < tree.height {
				tallestInRowIndex = x
				tree.visibleFromLeft = true
			}

			if y == 0 || grid[tallestInColIndex[x]][x].height < tree.height {
				tallestInColIndex[x] = y
				tree.visibleFromTop = true
			}

		}
	}

	// Check bottom and right
	tallestInColIndex = make([]int, len(grid[0]))
	for y := len(grid) - 1; y >= 0; y-- {
		tallestInRowIndex := len(grid) - 1
		row := grid[y]
		for x := len(row) - 1; x >= 0; x-- {
			tree := row[x]

			if x == len(row)-1 || row[tallestInRowIndex].height < tree.height {
				tallestInRowIndex = x
				tree.visibleFromRight = true
			}

			if y == len(grid)-1 || grid[tallestInColIndex[x]][x].height < tree.height {
				tallestInColIndex[x] = y
				tree.visibleFromBottom = true
			}

		}
	}

	countVisible := 0
	for _, row := range grid {
		for _, cell := range row {
			// color := colorReset
			if cell.visibleFromLeft || cell.visibleFromTop || cell.visibleFromBottom || cell.visibleFromRight {
				countVisible++
				// color = colorRed
			}
			// fmt.Printf(color+"%d", cell.height)
		}
		// fmt.Printf(colorReset + "\n")
	}

	fmt.Printf("Part 1: %d\n", countVisible)

	// Scenic score, part 2
	for y, row := range grid {
		for x, tree := range row {
			if x == 0 || y == 0 || x == len(row)-1 || y == len(grid)-1 {
				tree.score = 0
				continue
			}
			tree.score = 1
			var i int

			// Left
			for i = x - 1; i > 0; i-- {
				if row[i].height >= tree.height {
					break
				}
			}
			tree.score *= (x - i)

			// Top
			for i = y - 1; i > 0; i-- {
				if grid[i][x].height >= tree.height {
					break
				}
			}
			tree.score *= (y - i)

			// Bottom
			for i = y + 1; i < len(grid)-1; i++ {
				if grid[i][x].height >= tree.height {
					break
				}
			}
			tree.score *= (i - y)

			// Right
			for i = x + 1; i < len(row)-1; i++ {
				if row[i].height >= tree.height {
					break
				}
			}
			tree.score *= (i - x)
		}
	}

	maxScore := 0
	for _, row := range grid {
		for _, cell := range row {
			if cell.score > maxScore {
				maxScore = cell.score
			}
		}
	}
	fmt.Printf("Part 2: %d\n", maxScore)
}
