const admin = require('firebase-admin');

class Middleware{
  async decodeToken(req, res, next) {
		if(req.headers.authorization){
			var token = req.headers.authorization.split(' ')[1];
			token = token.split(" ").join("")
			try {
				const decodeValue = await admin.auth().verifyIdToken(token);
				if (decodeValue) {
					return next();
				}
				return res.json({ message: 'Unauthorized' });
			} catch (e) {
				console.log("error: ", e.message)
				return res.json({ message: e.message });
			}
		}else {
			console.log("No Token Provided")
		}
	}
}

module.exports = new Middleware();