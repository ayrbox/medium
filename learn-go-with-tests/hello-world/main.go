package main

import (
	"fmt"
	helloworld "hello/helloworld"
)

func main() {
	msg := helloworld.GetMessage("Andy", "English")
	fmt.Println(msg)
}
