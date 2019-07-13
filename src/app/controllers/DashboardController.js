const { User, Appointment } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

class DashboardController {
	async index(req, res) {
		const { provider, id } = req.session.user;
		if (provider) {
			const appointments = await Appointment.findAll({
				include: [ { model: User, as: 'user' } ],
				where: {
					provider_id: id,
					date: {
						[Op.between]: [ moment().startOf('day').format(), moment().endOf('day').format() ]
					}
				}
			});
			return res.render('dashboard', { appointments });
		} else {
			const providers = await User.findAll({ where: { provider: true } });
			return res.render('dashboard', { providers });
		}
	}
}

module.exports = new DashboardController();
