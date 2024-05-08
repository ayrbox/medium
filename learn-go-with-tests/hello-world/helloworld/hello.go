package helloworld

const (
	english = "English"
	french  = "French"
	spanish = "Spanish"

	englishHelloPrefix = "Hello "
	spanishHelloPrefix = "Hola "
	frenchHelloPrefix  = "Bonjour "
)

func greetingPrefix(lang string) (prefix string) {
	switch lang {
	case french:
		prefix = frenchHelloPrefix
	case spanish:
		prefix = spanishHelloPrefix
	default:
		prefix = englishHelloPrefix
	}
	return
}

func GetMessage(name, lang string) string {
	prefix := greetingPrefix(lang)

	if name == "" {
		name = "World"
	}
	return prefix + name
}
