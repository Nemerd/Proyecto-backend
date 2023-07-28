const {
	createToken,
	getAndVerifyToken,
} = require("../../Configurations/jwt");
const UserManager = require("../../Controllers/UserManager");

class CookieHandler {
	async JWTLogin(request, response) {
		const { user, password } = request.body;

		const usr = await UserManager.getUser(user);
		const JWToken = createToken(user);

		if (usr) {
			response.cookie("user", usr.email, { signed: true });
			response.cookie("JWT", JWToken, { signed: true });
			response.cookie("role", "User", { signed: true });
			response.redirect(302, "/hbs");
		} else {
			response.sendStatus(401);
		}
	}




	async checkAdmin(request, response, next) {
		// Admin auth hadcoded
		const { user, password } = request.body;
		console.log(process.env.ADMIN_EMAIL);
		console.log(process.env.ADMIN_PASSWORD);
		if (
			user === process.env.ADMIN_EMAIL &&
			password === process.env.ADMIN_PASSWORD
		) {
			response.cookie("user", user, { signed: true });
			response.cookie("role", "Admin", { signed: true });
			response.redirect(302, "/hbs");
		} else {
			next();
		}
	}

	async setCookie(request, response) {
		if (request.user) {
			response.cookie("user", request.user.email, { signed: true });
			response.cookie("role", request.user.role, { signed: true });
			response.redirect(302, "/hbs");
		} else {
			response.sendStatus(401);
		}
	}

	async deleteCookies(request, response) {
		console.log(getAndVerifyToken(request.signedCookies['JWT']));
		response.clearCookie("user");
		response.clearCookie("JWT");
		response.clearCookie("role");
		response.send();
	}

	async checkSignedCookie(request, response) {
		console.log(request.signedCookies["Nombre de la cookie"]);
		response.send(request.signedCookies);
	}

	async checkUnsignedCookie(request, response) {
		response.send(request.cookies);
	}
}

module.exports = new CookieHandler();
