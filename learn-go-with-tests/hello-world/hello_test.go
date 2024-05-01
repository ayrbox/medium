package main

import "testing"

func TestGetMessage(t *testing.T) {
	got := GetMessage("Bean")
	want := "Hello Bean"

	if got != want {
		t.Errorf("got %q want %q", got, want)
	}
}
