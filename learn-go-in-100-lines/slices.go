package main

import "fmt"

func main() {

	langs:= [9]string {
		"C", "Lisp", "C++", "Java", "Python", "JavaScript", "Ruby", "Go", "Rust",
	}


	classic := langs[0:3] // alternatively languages[:3]
	mordern := make([]string, 4)
	mordern = langs[3:7]

	new := langs[7:9]

	fmt.Printf("Classic: %v\n", classic)
	fmt.Printf("Mordern: %v\n", mordern)
	fmt.Printf("New: %v\n", new)

}
