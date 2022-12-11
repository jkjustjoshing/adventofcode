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

func puzzle10(scanner *bufio.Scanner) {
	registerValues := make([]int, 1)
	registerValues[0] = 1
	currentVal := 1
	for scanner.Scan() {
		line := scanner.Text()
		if line != "noop" {
			registerValues = append(registerValues, currentVal)
			diff, _ := strconv.ParseInt(line[5:], 10, 8)
			currentVal += int(diff)
		}
		registerValues = append(registerValues, currentVal)
	}

	sum1 := 0
	for i := 20; i < 221; i += 40 {
		sum1 += (i * registerValues[i-1])
	}

	fmt.Printf("Part 1: %d\n", sum1)

	// Print screen for Part 2
	fmt.Println("Part 2:")
	width := 40
	for l := 0; l < (len(registerValues)/width)+1; l++ {
		for c := 0; c < width; c++ {
			cycle := l*width + c
			if cycle >= len(registerValues) {
				continue
			}
			diff := Abs(registerValues[cycle] - c)
			if diff <= 1 {
				fmt.Printf("#")
			} else {
				fmt.Printf(" ")
			}
		}
		fmt.Print("\n")
	}
}
