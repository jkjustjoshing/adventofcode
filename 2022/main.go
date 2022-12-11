package main

import (
	"bufio"
	"log"
	"os"
)

func main() {

	// By default run this day, to easily start debugging
	puzzleNumber := "8"

	// But if command line argument is passed, run that puzzle
	if len(os.Args) > 1 {
		puzzleNumber = os.Args[1]
	}

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
	case "6":
		puzzle6(scanner)
	case "7":
		puzzle7(scanner)
	case "8":
		puzzle8(scanner)
	case "9":
		puzzle9(scanner)
	}
}
