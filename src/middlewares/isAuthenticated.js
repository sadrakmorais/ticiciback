const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
	try {
		let { authorization } = req.headers;

		if (!authorization) {
			return res.status(401).json({ logged: false });
		}

		authorization = authorization.split(' ');

		if (authorization[0] !== 'Bearer') {
			return res.status(401).json({ message: 'token mal formatado' });
		}

		jwt.verify(authorization[1], process.env.SECRET, (error) => {
			if (error) {
				return res.status(401).json({ logged: false });
			} else {
				next();
			}
		});
	} catch (error) {
		return res.status(401).json({ logged: false });
	}
};

module.exports = { isAuthenticated };
