package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gustavomello-21/authomatic-call-roll/api/src/config"
	"github.com/gustavomello-21/authomatic-call-roll/api/src/router"
)

func main() {
	config.Load()

	fmt.Println("Servidor rodando na porta 3000!!")
	router := router.Router()

	err := http.ListenAndServe(":3000", router)
	if err != nil {
		log.Fatal(err)
	}
}
