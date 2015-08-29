package app

import (
	// Import is being used by the sqlx.Open as a driver.
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// Database will handle the connection and maybe some "ORM" later on.
type Database struct{}

// Connect will establish the connection to the database.
func (a Database) Connect() *sqlx.DB {
	// Read the configuration.
	database := Configuration{}.Decode(Configuration{}.Read("database")).(map[string]interface{})

	// Establish connection to the database.
	db, err := sqlx.Open(database["engine"].(string),
		database["user"].(string)+":"+database["password"].(string)+
			"@tcp("+database["host"].(string)+")"+
			"/"+database["name"].(string)+
			"?charset="+database["charset"].(string))

	if err != nil {
		panic(err)
	}

	return db
}
