const User = require('../models/User');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const errors = require('../lib/errors');

class AuthController {
	show = async (req, res) => res.status(200).json({ message: 'usuário autenticado' });

	store = async (req, res) => {
		try {
			const { email, cpf, password } = req.body;
			const user = await User.findOne({ email, cpf });

			if (!user) {
				throw errors.NOT_FOUND('usuário');
			}

			bcrypt.compare(password, user.password, (err, passwordsMatch) => {
				if (err || !passwordsMatch) {
					return res.status(401).json({ message: 'senha incorreta' });
				}

				const auth = jwt.sign({ user }, process.env.SECRET);

				return res.status(200).json({ user, auth });
			});
		} catch (error) {
			console.error(error);

			return res.status(error.code || 500).json({
				message: error.message || errors.INTERNAL_SERVER_ERROR,
			});
		}
	};
}

module.exports = { AuthController };
