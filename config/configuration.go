package config

import (
	"encoding/json"
	"fmt"
	"os"
)

// Configuration will hold the details for current app.
type Configuration struct {
	Database map[string]interface{}
}

// Read the configuration file.
func Read() Configuration {
	file, _ := os.Open("./config/config.json")

	decoder := json.NewDecoder(file)
	configuration := Configuration{}
	err := decoder.Decode(&configuration)

	if err != nil {
		fmt.Println("error:", err)
	}

	return configuration
}
