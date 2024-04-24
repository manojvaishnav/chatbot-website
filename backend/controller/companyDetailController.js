const Company = require('../model/companyModel')

// ------------------------ ADD COMPANY DETAIL ----------------------------------
module.exports.addCompanyData = async (req, res) => {
    try {
        const { name, description, website } = req.body

        const user = req.user

        if (!name || !description) {
            return res.status(400).json({ error: 'All field are required' });
        }

        const isExists = await Company.findOne({ user: user._id })

        if (isExists) {
            return res.status(400).json({ error: 'Detail already exists' });
        }

        const newCompany = new Company({
            name,
            description,
            website,
            user: user._id
        })

        const data = await newCompany.save()

        res.status(200).json({ message: "Detail added successfully", data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}
// ------------------------ GET COMPANY DETAIL ----------------------------------
module.exports.getCompanyDetail = async (req, res) => {
    try {
        const user = req.user

        const data = await Company.findOne({ user: user._id })

        res.status(200).json({ message: "Detail fetched successfully", data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}

module.exports.updateCompanyDetail = async (req, res) => {
    try {
        const user = req.user
        const companyId = req.params.id;
        const newData = req.body;

        const data = await Company.findOneAndUpdate({ _id: companyId, user: user._id }, newData, { new: true })

        res.status(200).json({ message: "Detail updated successfully", data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal server error" })
    }
}