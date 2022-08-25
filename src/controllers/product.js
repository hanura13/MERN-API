exports.createProduct = (req, res, next) =>{
    const name = req.body.name;
    const price = req.body.price;
    res.json({
        message : 'Create Product Succes coy',
        data: {
            id: 1,
            name: name,
            price: price
        }
    });
    next();
}

exports.getAllproduct = (req, res, next) =>{
    res.json(
        {
            message: 'Get All Product',
            data: {
                id: 1,
                name: 'Sari Roti',
                price: 8000
            }
        }
    )
}