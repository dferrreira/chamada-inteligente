package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gustavomello-21/authomatic-call-roll/api/src/config"
	"github.com/gustavomello-21/authomatic-call-roll/api/src/router"
	"github.com/rs/cors"
)

func main() {
	config.Load()

	fmt.Println("Servidor rodando na porta 3000!!")
	router := router.Router()

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"POST", "GET", "OPTIONS", "PUT", "DELETE"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})

	app := c.Handler(router)

	err := http.ListenAndServe(":3000", app)
	if err != nil {
		log.Fatal(err)
	}
}
