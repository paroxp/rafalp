package system

import (
	"encoding/json"
	"io/ioutil"
)

// Configuration will handle basic tasks on our config files.
type Configuration struct{}

// Read the configuration file.
func (c Configuration) Read(filename string) []byte {
	// Test the configfile
	config, err := ioutil.ReadFile("./config/" + filename + ".json")

	if err != nil {
		panic(err)
	}

	return config
}

// Decode will convert our interface into an "array".
func (c Configuration) Decode(config []byte) interface{} {
	var configuration map[string]interface{}

	if err := json.Unmarshal(config, &configuration); err != nil {
		panic(err)
	}

	return configuration
}
