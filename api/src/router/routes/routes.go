package routes

import (
	"net/http"

	"github.com/gorilla/mux"
)

type Routes struct {
	Method   string
	URL      string
	Function func(w http.ResponseWriter, r *http.Request)
}

func Config(router *mux.Router) *mux.Router {
	for _, route := range usersRoutes {
		router.HandleFunc(route.URL, route.Function).Methods(route.Method, http.MethodOptions)
	}

	return router
}
