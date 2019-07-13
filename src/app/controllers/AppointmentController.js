const { User, Appointment } = require('../models');
class AppointmentController {
	async create(req, res) {
		const provider = await User.findByPk(req.params.provider);
		return res.render('appointments/create', { provider });
	}

	async store(req, res) {
		const { provider } = req.params;
		const { id } = req.session.user;
		const { date } = req.body;

		await Appointment.create({
			user_id: id,
			provider_id: provider,
			date
		});
		return res.redirect('/app/dashboard');
	}
}

module.exports = new AppointmentController();
