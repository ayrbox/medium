package main

import "fmt"

func main() {

	var DeploymentOptions = [5]string{"R-pi", "AWS", "GCP", "Azure", "Digital Ocean"}

	for i := 0; i < len(DeploymentOptions); i++ {
		option := DeploymentOptions[i]
		fmt.Println(i, option)
	}
}
