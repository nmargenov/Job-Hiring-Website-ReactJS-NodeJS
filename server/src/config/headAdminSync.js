const HeadAdmin = require("../models/HeadAdmin");
const User = require("../models/User");

async function syncHeadAdmin() {
    const email = process.env.HEAD_ADMIN_EMAIL;
    if (!email) return;

    const existing = await HeadAdmin.findOne();
    const user = await User.findOne({ email });

    if (!user) {
        await User.create({
            email,
            role: "admin"
        })
    } else if (user.role !== 'admin') {
        user.role = 'admin'
        await user.save();
    }
    else if (!existing) {
        await HeadAdmin.create({ email });
    }
    else if (existing.email !== email) {
        existing.email = email;
        await existing.save();
    }
}

module.exports = { syncHeadAdmin };