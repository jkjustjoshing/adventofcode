package main

import (
	"bufio"
	"fmt"
	"log"
	"strconv"
)

func puzzle1(scanner *bufio.Scanner) {
	var a []int
	a = append(a, 0)

	for scanner.Scan() {
		// do something with a line
		line := scanner.Text()
		if line == "" {
			a = append(a, 0)
		} else {
			num, err := strconv.ParseInt(line, 10, 32)
			if err != nil {
				log.Fatal(err)
			}
			a[len(a) - 1] += int(num)
		}
	}

	var largestIndex = 0
	for i := 1; i < len(a); i++ {
		if a[i] > a[largestIndex] {
			largestIndex = i
		}
	}
	fmt.Println("Largest index: ", largestIndex)
	fmt.Println("Quantity: ", a[largestIndex])

	largestIndexes := [3] int { 0, 1, 2 }
	for i := 3; i < len(a); i++ {
		if a[i] > a[largestIndexes[0]] || a[i] > a[largestIndexes[1]] || a[i] > a[largestIndexes[2]] {
			// Find smallest
			if a[largestIndexes[0]] < a[largestIndexes[1]] && a[largestIndexes[0]] < a[largestIndexes[2]] {
				largestIndexes[0] = i
			} else if a[largestIndexes[1]] < a[largestIndexes[2]] {
				largestIndexes[1] = i
			} else {
				largestIndexes[2] = i
			}
		}
	}
	fmt.Println("Largest indexes: ", largestIndexes)
	fmt.Println("Quantities: ", a[largestIndexes[0]], a[largestIndexes[1]], a[largestIndexes[2]])
	fmt.Println("Sum: ", a[largestIndexes[0]] + a[largestIndexes[1]] + a[largestIndexes[2]])
}
