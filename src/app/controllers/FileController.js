const path = require('path');

class FileController {
	show(req, res) {
		const { file } = req.params;
		const filepath = path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', file);
		return res.sendFile(filepath);
	}
}

module.exports = new FileController();
