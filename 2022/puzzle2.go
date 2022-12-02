package main

import (
	"bufio"
	"fmt"
)

func puzzle2(scanner *bufio.Scanner) {

	score1 := 0
	score2 := 0
	for scanner.Scan() {
		// do something with a line
		line := scanner.Text()
		moveThem := int(line[0]) - 'A'
		moveMe := int(line[2]) - 'X'
		score1 += calcScore(moveMe, moveThem)

		var moveMe2 int
		if moveMe == 1 {
			// draw
			moveMe2 = moveThem
		} else if moveMe == 0 {
			// lose
			moveMe2 = (moveThem - 1 + 3) % 3
		} else {
			// win
			moveMe2 = (moveThem + 1) % 3
		}
		score2 += calcScore(moveMe2, moveThem)
	}

	fmt.Println("Final score: ", score1)
	fmt.Println("Part 2 score: ", score2)
}

func calcScore(me, them int) int {
	myScore := me + 1
	if them == me {
		myScore += 3
	} else if them-me == -1 || them-me == 2 {
		myScore += 6
	}
	return myScore
}
