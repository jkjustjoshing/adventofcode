package main

import (
	"bufio"
	"fmt"
	"strconv"
)

// var (
// 	colorReset = "\033[0m"
// 	colorRed   = "\033[31m"
// )

type Instr struct {
	dir      byte
	distance int64
}

func puzzle9(scanner *bufio.Scanner) {
	instrs := make([]Instr, 10)
	for scanner.Scan() {
		line := scanner.Text()
		dir := line[0]
		distance, _ := strconv.ParseInt(line[2:], 10, 8)
		instrs = append(instrs, Instr{dir, distance})
	}

	fmt.Printf("Part 1: %d\n", doPuzzle(2, instrs))
	fmt.Printf("Part 2: %d\n", doPuzzle(10, instrs))
}

func doPuzzle(length int, instrs []Instr) int {
	spots := make(map[int](map[int]int))

	knots := make([][2]int, length)
	for i := 0; i < length; i++ {
		knots[i] = [2]int{0, 0}
		logToMap(spots, knots[i], i)
	}
	for _, instr := range instrs {
		for i := int64(0); i < instr.distance; i++ {
			// Update position of head
			var index, offset int
			if instr.dir == 'L' || instr.dir == 'R' {
				index = 0
				offset = 1
				if instr.dir == 'L' {
					offset = -1
				}
			} else {
				index = 1
				offset = 1
				if instr.dir == 'D' {
					offset = -1
				}
			}
			knots[0][index] += offset
			logToMap(spots, knots[0], 0)

			// Update position of rest of knots
			for i := 1; i < length; i++ {
				knots[i] = updatePosition(knots[i-1], knots[i])
				logToMap(spots, knots[i], i)
			}
		}
	}

	count := 0
	for _, v := range spots {
		for _, c := range v {
			if c&(1<<(length-1)) > 0 {
				count++
			}
		}
	}
	// Calculate
	return count
}

func updatePosition(head, tail [2]int) [2]int {
	diffX := Abs(head[0] - tail[0])
	diffY := Abs(head[1] - tail[1])
	if diffX == 2 && diffY == 2 {
		tail[0] = (tail[0] + head[0]) / 2
		tail[1] = (tail[1] + head[1]) / 2
	} else if diffX == 2 {
		tail[0] = (tail[0] + head[0]) / 2
		tail[1] = head[1]
	} else if diffY == 2 {
		tail[1] = (tail[1] + head[1]) / 2
		tail[0] = head[0]
	}
	return tail
}

func logToMap(myMap map[int]map[int]int, arr [2]int, maskOffset int) {
	if myMap[arr[0]] == nil {
		myMap[arr[0]] = make(map[int]int)
	}

	mask := 1 << maskOffset

	myMap[arr[0]][arr[1]] = myMap[arr[0]][arr[1]] | mask
}

func Abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

// func Print(knots [][2]int) {
// 	fmt.Println("\nlen", knots)
// 	for y := 10; y >= -5; y-- {
// 		for x := -11; x < 12; x++ {
// 			if knots[0][0] == x && knots[0][1] == y {
// 				fmt.Print("H")
// 			} else {
// 				printed := false
// 				for i := 1; i < len(knots); i++ {
// 					if knots[i][0] == x && knots[i][1] == y {
// 						printed = true
// 						fmt.Printf("%d", i)
// 						break
// 					}
// 				}
// 				if !printed {
// 					fmt.Printf(".")
// 				}
// 			}
// 		}
// 		fmt.Printf("\n")
// 	}
// }
