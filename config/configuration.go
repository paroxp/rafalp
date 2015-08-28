package config

import (
	"encoding/json"
	"io/ioutil"
)

// Read the configuration file.
func Read(filename string) interface{} {
	// Test the configfile
	config, err := ioutil.ReadFile("./config/" + filename + ".json")

	if err != nil {
		panic(err)
	}

	var configuration map[string]interface{}
	if err := json.Unmarshal(config, &configuration); err != nil {
		panic(err)
	}

	// database := configuration["Database"].(map[string]interface{})
	//
	// log.Print(database["host"])
	return configuration
}
