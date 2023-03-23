package repositories

import (
	"database/sql"
	"log"

	"github.com/gustavomello-21/authomatic-call-roll/api/src/models"
)

type user struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) *user {
	return &user{db: db}
}

func (u *user) CreateUser(user models.User) int64 {
	statement, err := u.db.Prepare("INSERT INTO users (name, ra, image_public_id) VALUES (?, ?, ?)")
	if err != nil {
		log.Fatal(err)
	}
	defer statement.Close()

	result, err := statement.Exec(user.Name, user.Ra, user.ImagePublicId)
	if err != nil {
		log.Fatal(err)
	}

	lastId, err := result.LastInsertId()
	if err != nil {
		log.Fatal(err)
	}

	return lastId
}

func (u *user) GetUserById(targetId int) models.User {
	row, err := u.db.Query("SELECT * FROM users WHERE id = ?", targetId)
	if err != nil {
		log.Fatal(err)
	}

	var user models.User

	for row.Next() {
		err = row.Scan(&user.ID, &user.Name, &user.Ra, &user.ImagePublicId)
		if err != nil {
			log.Fatal(err)
		}
	}

	return user
}

func (u *user) Delete(targetId int) error {
	statement, err := u.db.Prepare("DELETE FROM users WHERE id = ?")
	if err != nil {
		return err
	}
	_, err = statement.Exec(targetId)
	if err != nil {
		return err
	}

	return nil
}
