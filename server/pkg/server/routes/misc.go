package routes

import (
	"github.com/elispeigel/ezmovies/server/internal/handlers"
	"github.com/elispeigel/ezmovies/server/internal/handlers/auth/middleware"
	"github.com/elispeigel/ezmovies/server/internal/orm"
	"github.com/elispeigel/ezmovies/server/pkg/utils"
	"github.com/gin-gonic/gin"
)

// Misc routes
func Misc(cfg *utils.ServerConfig, r *gin.Engine, orm *orm.ORM) error {
	// Simple keep-alive/ping handler
	r.GET(cfg.VersionedEndpoint("/ping"), handlers.Ping())
	r.GET(cfg.VersionedEndpoint("/secure-ping"),
		middleware.Middleware(cfg.VersionedEndpoint("/secure-ping"), cfg, orm), handlers.Ping())
	return nil
}