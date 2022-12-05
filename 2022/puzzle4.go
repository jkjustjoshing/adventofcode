package main

import (
	"bufio"
	"fmt"
	"log"
	"regexp"
	"strconv"
)

func puzzle4(scanner *bufio.Scanner) {
	contained := 0
	overlap := 0
	re := regexp.MustCompile(`(\d+)-(\d+),(\d+)-(\d+)`)

	for i := 0; scanner.Scan(); i++ {
		line := scanner.Text()
		result := re.FindStringSubmatch(line)

		range1S, err1 := strconv.ParseInt(result[1], 10, 8)
		range1E, err2 := strconv.ParseInt(result[2], 10, 8)
		range2S, err3 := strconv.ParseInt(result[3], 10, 8)
		range2E, err4 := strconv.ParseInt(result[4], 10, 8)
		if err1 != nil || err2 != nil || err3 != nil || err4 != nil {
			log.Fatal(err1, err2, err3, err4)
		}
		if ((range1S - range2S) * (range2E - range1E)) >= 0 {
			contained++
		}
		if (range1S <= range2E) && (range2S <= range1E) {
			overlap++
		}
	}

	fmt.Printf("Part 1: %d\n", contained)
	fmt.Printf("Part 1: %d\n", overlap)
}
