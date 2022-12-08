package main

import (
	"bufio"
	"fmt"
)

func puzzle6(scanner *bufio.Scanner) {
	result := scanner.Scan()
	if !result {
		err := scanner.Err()
		if err == nil {
			fmt.Println("File empty")
		} else {
			panic(err)
		}
	}

	line := scanner.Text()

	part1 := newFunction(line, 4)
	fmt.Printf("Part 1: %d\n", part1)

	part2 := newFunction(line, 14)
	fmt.Printf("Part 2: %d\n", part2)
}

func newFunction(line string, length int) int {
	// Loop over every character in the segment of {length}
	// For each character, compare to the characters after it
	for i := 0; i < len(line)-length; i++ {
		foundDuplicate := false

	frame:
		for j := i; j < i+length-1; j++ {

			for k := j + 1; k < i+length; k++ {
				if line[j] == line[k] {
					foundDuplicate = true
					break frame
				}
			}
		}

		if !foundDuplicate {
			return i + length
		}
	}
	panic("Valid string not found")
}
