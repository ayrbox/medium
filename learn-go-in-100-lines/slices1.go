package main

import (
	"fmt"
	"reflect"
)


func main() {

	languages := [...]string{ "Ruby", "Javascript", "Hello" }


	allLangs := languages[:]

	fmt.Println(reflect.TypeOf(allLangs).Kind())



	frameworks := []string {
		"React", "Vue", "Angular", "Svelte",
		"Laravel", "Django", "Flask", "Fiber",
	}

	jsFrameworks := frameworks[0:4:4]

	frameworks = append(frameworks, "Meteor")

	fmt.Printf("All Frameworks: %v\n", frameworks)
	fmt.Printf("JS Frameworks: %v\n", jsFrameworks)
}
