package main

import (
	"bufio"
	"fmt"
)

func puzzle3(scanner *bufio.Scanner) {
	// var dups []int
	sum1 := 0
	sum2 := 0

	var groupOfThree = make([]string, 3)

	for i := 0; scanner.Scan(); i++ {
		line := scanner.Text()

		// Part 1
		dup := findDuplicateChar(line)
		sum1 += charVal(dup)

		// Part 2
		groupOfThree[i%3] = line
		if i%3 == 2 {
			// At third of three elf in the group - calculate badge character
			char := findBadgeChar(groupOfThree)
			sum2 += charVal(char)
		}
	}

	fmt.Printf("Part 1: %d\n", sum1)
	fmt.Printf("Part 2: %d\n", sum2)
}

func charVal(char byte) int {
	if int(char)-int('Z') > 0 {
		// lowercase
		return int(char - 'a' + 1)
	} else {
		return int(char - 'A' + 27)
	}
}

func findDuplicateChar(line string) byte {
	leftChars := make(map[byte]bool)
	rightChars := make(map[byte]bool)

	var dup byte = byte(0)
	for i := 0; i < len(line)/2; i++ {
		leftChar := line[i]
		rightChar := line[len(line)-1-i]
		_, rightExists := rightChars[leftChar]
		if rightExists {
			dup = leftChar
			break
		} else {
			leftChars[leftChar] = true
		}

		_, leftExists := leftChars[rightChar]
		if leftExists {
			dup = rightChar
			break
		} else {
			rightChars[rightChar] = true
		}
	}
	if dup == byte(0) {
		panic("Couldn't find duplicate character in string: " + line)
	}
	return dup
}

func findBadgeChar(rucksacks []string) byte {
	chars := make(map[byte]byte)

	if len(rucksacks) > 8 {
		panic("Badge groups must be smaller than 8 (bits in a byte)")
	}

	for i := 0; i < len(rucksacks); i++ {
		sack := rucksacks[i]
		for j := 0; j < len(sack); j++ {
			char := sack[j]
			chars[char] = chars[char] | (1 << i)
			if chars[char] == (255 >> (8 - len(rucksacks))) {
				return char
			}
		}
	}

	panic("Could not find duplicate in rucksack group")
}
