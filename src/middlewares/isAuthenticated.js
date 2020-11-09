const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
	try {
		console.log(req.headers)
		let { authorization } = req.headers;

		if (!authorization) {
			return res.status(401).json({ message: 'token inválido ou não informado' });
		}

		authorization = authorization.split(' ');

		if (authorization[0] !== 'Bearer') {
			return res.status(401).json({ message: 'token mal formatado' });
		}

		jwt.verify(authorization[1], process.env.SECRET, (error) => {
			if (error) {
				console.exception({ message: 'token inválido ou não informado' });

				return res.status(401).json({ message: 'token inválido ou não informado' });
			} else {
				next();
			}
		});
	} catch (error) {
		return res.status(401).json({ message: 'token inválido ou não informado' });
	}
};

module.exports = { isAuthenticated };
