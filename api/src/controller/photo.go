package controller

import (
	"encoding/json"
	"io"
	"net/http"
	"os"
	"os/exec"

	"github.com/gustavomello-21/authomatic-call-roll/api/src/response"
)

func UploadImage(w http.ResponseWriter, r *http.Request) {
	file, header, err := r.FormFile("image")
	if err != nil {
		response.Error(w, http.StatusBadRequest, err)
		return
	}

	pathName, err := os.Create("./src/face-recogtion-service/img/" + header.Filename)
	if err != nil {
		response.Error(w, http.StatusBadRequest, err)
		return
	}

	_, err = io.Copy(pathName, file)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	cmd := exec.Command("python", "./src/face-recogtion-service/script/face-recogtion.py", pathName.Name())

	out, err := cmd.Output()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var result struct {
		Names                    []string `json:"names"`
		Count_faces              int      `json:"count_faces"`
		Count_faces_not_detected int      `json:"count_faces_not_detected"`
		Count_faces_detected     int      `json:"count_faces_detected"`
	}

	err = json.Unmarshal(out, &result)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response.JSON(w, http.StatusOK, result)
}

func UploadUserImage(w http.ResponseWriter, r *http.Request) {
	file, header, err := r.FormFile("image")
	if err != nil {
		response.Error(w, http.StatusBadRequest, err)
		return
	}

	pathName, err := os.Create("./src/face-recogtion-service/img/users/" + header.Filename)
	if err != nil {
		response.Error(w, http.StatusBadRequest, err)
		return
	}

	_, err = io.Copy(pathName, file)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response.JSON(w, http.StatusOK, "Imagem "+header.Filename+" salva com sucesso")
}
