package app

import (
	"encoding/json"
	"io/ioutil"
)

// Read the configuration file.
func Read(filename string) []byte {
	// Test the configfile
	config, err := ioutil.ReadFile("./config/" + filename + ".json")

	if err != nil {
		panic(err)
	}

	return config
}

// Decode will convert our interface into an "array".
func Decode(config []byte) interface{} {
	var configuration map[string]interface{}

	if err := json.Unmarshal(config, &configuration); err != nil {
		panic(err)
	}

	return configuration
}
