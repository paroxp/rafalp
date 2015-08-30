package system

import "github.com/mailgun/mailgun-go"

// Mail will handle the connection to Mailgun API.
type Mail struct{}

// Setup will establish the connection to the mailgun.
func (m Mail) Setup() mailgun.Mailgun {
	// Read the configuration.
	config := Configuration{}.Decode(Configuration{}.Read("mailgun")).(map[string]interface{})

	mg := mailgun.NewMailgun(
		config["domain"].(string),
		config["apiKey"].(string),
		config["publicKey"].(string),
	)

	return mg
}
