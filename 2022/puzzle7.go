package main

import (
	"bufio"
	"fmt"
	"strconv"
	"strings"
)

type Item struct {
	parent *Directory
	name   string
}

type Directory struct {
	Item
	childrenDirs  []*Directory
	childrenFiles []*File
}

type File struct {
	Item
	size int64
}

type Directories interface {
	Cd()
	Add()
}

func (dir *Directory) Cd(arg string) *Directory {
	if arg == ".." {
		return dir.parent
	}
	for i := 0; i < len(dir.childrenDirs); i++ {
		if dir.childrenDirs[i].name == arg {
			return dir.childrenDirs[i]
		}
	}
	panic("Can't find directory with name " + arg)
}
func (dir *Directory) Add(size, name string) {
	if size == "dir" {
		newDir := Directory{
			Item: Item{parent: dir, name: name},
		}
		dir.childrenDirs = append(dir.childrenDirs, &newDir)
	} else {
		sizeInt, err := strconv.ParseInt(size, 10, 64)
		if err != nil {
			fmt.Printf("Can't parse number: %s (%s)\n", size, name)
			panic("Can't parse number")
		}
		newFile := File{
			Item: Item{parent: dir, name: name},
			size: sizeInt,
		}
		dir.childrenFiles = append(dir.childrenFiles, &newFile)
	}
}

func (dir *Directory) Size() int64 {
	var size int64 = 0
	for _, item := range dir.childrenFiles {
		size += item.size
	}
	for _, item := range dir.childrenDirs {
		size += item.Size()
	}
	return size
}

func xTabs(x int) string {
	str := ""
	for i := 0; i < x*4; i++ {
		str += " "
	}
	return str
}

func (dir *Directory) Print(level int) {
	fmt.Printf(xTabs(level)+"- "+dir.name+" (%d)\n", dir.Size())
	for _, file := range dir.childrenFiles {
		fmt.Printf(xTabs(level+1)+"* "+file.name+"(%d)\n", file.size)
	}
	for _, childDir := range dir.childrenDirs {
		childDir.Print(level + 1)
	}
}

func (dir *Directory) AllDirectories() []*Directory {
	dirs := make([]*Directory, 1)
	dirs[0] = dir
	for _, subdir := range dir.childrenDirs {
		dirs = append(dirs, subdir.AllDirectories()...)
	}
	return dirs
}

func generateTree(scanner *bufio.Scanner) *Directory {
	var currentDirectory *Directory

	for scanner.Scan() {
		line := scanner.Text()
		if line[0] == '$' {
			// Command
			if line[2:4] == "cd" {
				// Change directory
				name := line[5:]
				if currentDirectory == nil {
					currentDirectory = &Directory{
						Item: Item{name: name},
					}
				} else {
					currentDirectory = currentDirectory.Cd(name)
				}
			}
			// Listing - just go to next line
		} else {
			// Listing
			parts := strings.Split(line, " ")
			currentDirectory.Add(parts[0], parts[1])
		}
	}

	// Get root directory
	for currentDirectory.parent != nil {
		currentDirectory = currentDirectory.parent
	}
	return currentDirectory
}

func puzzle7(scanner *bufio.Scanner) {
	tree := generateTree(scanner)

	dirs := tree.AllDirectories()
	// sort.Slice(dirs, func(p, q int) bool {
	// 	return dirs[p].Size() < dirs[q].Size()
	// })

	sum := int64(0)
	rootSize := tree.Size()
	minSizeToDelete := rootSize - 40000000
	sizeToDelete := rootSize
	for _, dir := range dirs {
		size := dir.Size()
		if size <= 100000 {
			sum += size
		}
		if size > minSizeToDelete && size < sizeToDelete {
			sizeToDelete = size
		}
	}
	fmt.Printf("Part 1: %d\n", sum)
	fmt.Printf("Part 2: %d\n", sizeToDelete)

}
