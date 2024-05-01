package main

import "fmt"

const englishHelloPrefix = "Hello "

func GetMessage(name string) string {
	if name == "" {
		name = "World"
	}
	return englishHelloPrefix + name
}

func main() {
	msg := GetMessage("Andy")
	fmt.Println(msg)
}
