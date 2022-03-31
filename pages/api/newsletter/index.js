function newsLetterHandler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: 'Email is required',
            });
        }

        res.status(201).send({
            message: 'Successfully saved to database',
            email,
        });
    } else {
        return res.status(400).json({ message: 'Invalid REST Method' });
    }
}
