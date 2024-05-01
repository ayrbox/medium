package main

import "testing"

func TestGetMessage(t *testing.T) {

	t.Run("saying hello to people", func(t *testing.T) {
		got := GetMessage("Bean")
		want := "Hello Bean"
		assertCorrectMessage(t, got, want)
	})

	t.Run("say 'Hello, World' when an empty string is supplied", func(t *testing.T) {
		got := GetMessage("")
		want := "Hello World"
		assertCorrectMessage(t, got, want)
	})
}

func assertCorrectMessage(t testing.TB, got, want string) {
	t.Helper()
	if got != want {
		t.Errorf("got %q want %q", got, want)
	}
}
