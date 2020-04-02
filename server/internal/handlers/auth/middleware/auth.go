package middleware

import (
    "net/http"

    "github.com/elispeigel/ezmovies/server/internal/logger"
    "github.com/elispeigel/ezmovies/server/internal/orm"
    "github.com/elispeigel/ezmovies/server/pkg/utils"
    "github.com/dgrijalva/jwt-go"

    "github.com/gin-gonic/gin"
)

func authError(c *gin.Context, err error) {
    errKey := "message"
    errMsgHeader := "[Auth] error: "
    e := gin.H{errKey: errMsgHeader + err.Error()}
    c.AbortWithStatusJSON(http.StatusUnauthorized, e)
}