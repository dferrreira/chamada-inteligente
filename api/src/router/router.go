package router

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/gustavomello-21/authomatic-call-roll/api/src/controller"
	"github.com/gustavomello-21/authomatic-call-roll/api/src/router/routes"
)

func Router() *mux.Router {
	r := mux.NewRouter()

	r = routes.Config(r)

	r.HandleFunc("/health-check", func(w http.ResponseWriter, _ *http.Request) {
		w.Write([]byte("Servidor rodando com sucesso"))
	}).Methods(http.MethodGet)

	r.HandleFunc("/upload-image", controller.UploadImage).Methods(http.MethodPost)
	r.HandleFunc("/upload-user-image", controller.UploadUserImage).Methods(http.MethodPost)

	return r
}
