package controller

import (
	"encoding/json"
	"io"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/gustavomello-21/authomatic-call-roll/api/src/database"
	"github.com/gustavomello-21/authomatic-call-roll/api/src/models"
	"github.com/gustavomello-21/authomatic-call-roll/api/src/repositories"
	"github.com/gustavomello-21/authomatic-call-roll/api/src/response"
)

func CreateUser(w http.ResponseWriter, r *http.Request) {
	body, err := io.ReadAll(r.Body)
	if err != nil {
		response.Error(w, http.StatusUnprocessableEntity, err)
	}
	var user models.User

	err = json.Unmarshal(body, &user)
	if err != nil {
		response.Error(w, http.StatusBadRequest, err)
		return
	}

	err = user.Validate()
	if err != nil {
		response.Error(w, http.StatusBadRequest, err)
		return
	}

	db, err := database.Connect()
	if err != nil {
		response.Error(w, http.StatusInternalServerError, err)
		return
	}
	defer db.Close()

	userRepository := repositories.NewUserRepository(db)
	userRepository.CreateUser(user)

	response.JSON(w, http.StatusCreated, user)
}

func FindUserById(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	targetId, err := strconv.Atoi(params["user_id"])
	if err != nil {
		response.Error(w, http.StatusBadRequest, err)
		return
	}

	db, err := database.Connect()
	if err != nil {
		response.Error(w, http.StatusInternalServerError, err)
		return
	}
	defer db.Close()

	userRepository := repositories.NewUserRepository(db)
	targetUser := userRepository.GetUserById(targetId)

	response.JSON(w, http.StatusOK, targetUser)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)

	targetId, err := strconv.Atoi(params["user_id"])
	if err != nil {
		response.Error(w, http.StatusBadRequest, err)
		return
	}

	db, err := database.Connect()
	if err != nil {
		response.Error(w, http.StatusInternalServerError, err)
		return
	}
	defer db.Close()

	userRepository := repositories.NewUserRepository(db)
	err = userRepository.Delete(targetId)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, err)
	}

	response.JSON(w, http.StatusNoContent, nil)
}

// TODO: update user feature
func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Atualizando usuário"))
}
