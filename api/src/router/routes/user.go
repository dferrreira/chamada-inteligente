package routes

import "github.com/gustavomello-21/authomatic-call-roll/api/src/controller"

var usersRoutes = []Routes{
	{
		Method:   "POST",
		URL:      "/usuarios",
		Function: controller.CreateUser,
	},
	{
		Method:   "GET",
		URL:      "/usuarios/{user_id}",
		Function: controller.FindUserById,
	},
	{
		Method:   "PUT",
		URL:      "/usuarios/{user_id}",
		Function: controller.UpdateUser,
	},
	{
		Method:   "DELETE",
		URL:      "/usuarios/{user_id}",
		Function: controller.DeleteUser,
	},
}
