package db

import (
	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
)

func Connect() (neo4j.Driver, error)  {
    driver, err := neo4j.NewDriver("neo4j://neo4j:7687", neo4j.BasicAuth("neo4j", "password", ""))
    if err != nil {
        return nil, err
    }
    return driver, nil
}
