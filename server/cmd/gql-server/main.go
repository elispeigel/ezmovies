package main

import (
	"github.com/elispeigel/ezmovies/server/cmd/gql-server/config"
	"github.com/elispeigel/ezmovies/server/internal/logger"

	"github.com/elispeigel/ezmovies/server/internal/orm"
	"github.com/elispeigel/ezmovies/server/pkg/server"
)

// main
func main() {
	sc := config.Server()
	orm, err := orm.Factory(sc)
	defer orm.DB.Close()
	if err != nil {
		logger.Panic(err)
	}
	server.Run(sc, orm)
}