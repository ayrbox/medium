package main

import "fmt"


func average(x []float64) (avg float64) {
	total := 0.0
	if len(x) == 0 {
		avg = 0
	} else {

		for _, v := range x {
			total += v
		}

		avg = total / float64(len(x))
	}
	return
}


func main() {
	x := []float64{2.15, 3.14, 42.0, 29.5}
	fmt.Println(average(x))
}
