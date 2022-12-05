package main

import (
	"bufio"
	"log"
	"os"
)

func main() {
	// puzzle1()
	puzzleNumber := os.Args[1]

	f, err := os.Open("./" + puzzleNumber + ".txt")
	if err != nil {
		log.Fatal(err)
	}
	// remember to close the file at the end of the program
	defer f.Close()

	// read the file line by line using scanner
	scanner := bufio.NewScanner(f)

	switch puzzleNumber {
	case "1":
		puzzle1(scanner)
	case "2":
		puzzle2(scanner)
	case "3":
		puzzle3(scanner)
	case "4":
		puzzle4(scanner)
	case "5":
		puzzle5(scanner)
	}
}
