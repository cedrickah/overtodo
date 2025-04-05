package db

import (
	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
)

var Driver neo4j.Driver

func Connect() (neo4j.Driver, error)  {
    var err error
    Driver, err = neo4j.NewDriver("neo4j://localhost", neo4j.BasicAuth("neo4j", "password", ""))
    if err != nil {
        return nil, err
    }
    return Driver, nil
}
