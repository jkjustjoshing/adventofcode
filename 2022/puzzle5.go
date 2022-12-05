package main

import (
	"bufio"
	"fmt"
	"log"
	"regexp"
	"strconv"
)

func puzzle5(scanner *bufio.Scanner) {
	diagramRows := make([]string, 0, 5)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			break
		}
		diagramRows = append(diagramRows, line)
	}
	stacks := createStacks(diagramRows)
	stacks2 := createStacks(diagramRows)

	for scanner.Scan() {
		stacks = applyMove(stacks, scanner.Text())
		stacks2 = applyMove2(stacks2, scanner.Text())
	}

	topOfStacks := make([]byte, len(stacks))
	for index, stack := range stacks {
		topOfStacks[index] = stack[len(stack)-1]
	}
	fmt.Printf("Part 1: %s\n", topOfStacks)

	topOfStacks2 := make([]byte, len(stacks2))
	for index, stack := range stacks2 {
		topOfStacks2[index] = stack[len(stack)-1]
	}
	fmt.Printf("Part 2: %s\n", topOfStacks2)
}

func createStacks(rows []string) [][]byte {
	re := regexp.MustCompile(` (\d+)`)
	result := re.FindAllStringIndex(rows[len(rows)-1], -1)
	stacks := make([][]byte, len(result))

	// Initialize stacks
	height := len(rows) - 1
	for index := range stacks {
		stacks[index] = make([]byte, 0, height)
	}

	letterRegex := regexp.MustCompile(`(?:(?:\[(.)\])|(?:    ?))`)
	for i := len(rows) - 2; i >= 0; i-- {
		result := letterRegex.FindAllStringSubmatch(rows[i], -1)
		// fmt.Println(result, len(stacks))
		for index, match := range result {
			if len(match) > 1 && match[1] != "" {
				stacks[index] = append(stacks[index], match[1][0])
			}
		}
	}
	return stacks
}

func applyMove(stacks [][]byte, command string) [][]byte {
	commandRegex := regexp.MustCompile(`move (\d+) from (\d+) to (\d+)`)
	result := commandRegex.FindStringSubmatch(command)
	count, err1 := strconv.ParseInt(result[1], 10, 8)
	src, err2 := strconv.ParseInt(result[2], 10, 8)
	dest, err3 := strconv.ParseInt(result[3], 10, 8)
	if err1 != nil || err2 != nil || err3 != nil {
		log.Fatal(err1, err2, err3)
	}

	for i := int64(0); i < count; i++ {
		srcStack := stacks[src-1]
		stacks[dest-1] = append(stacks[dest-1], srcStack[len(srcStack)-1])
		stacks[src-1] = srcStack[:len(srcStack)-1]
	}

	return stacks
}

// Puzzle part 2
func applyMove2(stacks [][]byte, command string) [][]byte {
	commandRegex := regexp.MustCompile(`move (\d+) from (\d+) to (\d+)`)
	result := commandRegex.FindStringSubmatch(command)
	count, err1 := strconv.ParseInt(result[1], 10, 8)
	src, err2 := strconv.ParseInt(result[2], 10, 8)
	dest, err3 := strconv.ParseInt(result[3], 10, 8)
	if err1 != nil || err2 != nil || err3 != nil {
		log.Fatal(err1, err2, err3)
	}

	srcStack := stacks[src-1]
	stacks[dest-1] = append(stacks[dest-1], srcStack[len(srcStack)-int(count):]...)
	stacks[src-1] = srcStack[:len(srcStack)-int(count)]

	return stacks
}

// func drawStack(stacks [][]byte) {
// 	longestStack := 0
// 	for _, stack := range stacks {
// 		if longestStack < len(stack) {
// 			longestStack = len(stack)
// 		}
// 	}

// 	for i := longestStack - 1; i >= 0; i-- {
// 		for _, stack := range stacks {
// 			if i < len(stack) {
// 				fmt.Printf(" [%c] ", stack[i])
// 			} else {
// 				fmt.Printf("     ")
// 			}
// 		}
// 		fmt.Printf("\n")
// 	}
// 	for i := range stacks {
// 		fmt.Printf("  %d  ", i+1)
// 	}
// 	fmt.Printf("\n")
// }
