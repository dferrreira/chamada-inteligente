package models

import "errors"

type User struct {
	ID            uint64 `json:"id,omitempty"`
	Name          string `json:"name,omitempty"`
	Ra            string `json:"ra,omitempty"`
	ImagePublicId string `json:"image_public_id,omitempty"`
}

func (u *User) Validate() error {
	if len(u.Name) <= 0 || len(u.Ra) <= 0 {
		return errors.New("Usuário não é valido")
	}
	return nil
}
