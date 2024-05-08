package sum

func Sum(numbers []int) (sum int) {
	for _, number := range numbers {
		sum += number
	}
	return
}

func SumAll(numbersToSum ...[]int) []int {
	var sums []int
	for _, numbers := range numbersToSum {
		sums = append(sums, Sum(numbers))
	}
	return sums
}

func SumAllTails(numbersToSum ...[]int) []int {
	var sumTails []int

	for _, numbers := range numbersToSum {
		if len(numbers) == 0 {
			sumTails = append(sumTails, 0)
		} else {
			sumTails = append(sumTails, Sum(numbers[1:]))
		}
	}
	return sumTails
}
