package controller

import "net/http"

func CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Criando usuário"))
}

func FindUserById(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Buscar usuário por id"))
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Deletando usuário"))
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Atualizando usuário"))
}
