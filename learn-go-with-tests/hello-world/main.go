package main

import "fmt"

func GetMessage(name string) string {
	return "Hello " + name
}

func main() {
	msg := GetMessage("Andy")
	fmt.Println(msg)
}
