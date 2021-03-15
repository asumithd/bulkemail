const Bulkmail = require('../models/bulkmail.model.js');


exports.create = (req, res, next) => {

    const bulkmail = new Bulkmail(req.body);
    console.log(bulkmail)
    bulkmail.save((err, data) => {
        if (err) {
            console.log(err)
            const error = new Error('Some Error in product');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'product added successfully', data });
    })
}

exports.findAll = (req, res, next) => {
    Bulkmail.find().exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in bulkmail');
            return next(error);
        }
        return res.json({ 'success': true, 'message': 'bulkmail fetched successfully', 'data': data });
    });
}

exports.findOne = (req, res, next) => {
    Bulkmail.find({ _id: req.params.id }).exec((err, data) => {
        if (err) {
            const error = new Error('Some Error in bulkmail');
            return next(error);
        }
        if (data.length) {
            return res.json({ 'success': true, 'message': 'bulkmail fetched by id successfully', data });
        } else {
            return res.json({ 'success': false, 'message': 'bulkmail with the given id not found' });
        }
    });
};

exports.update = (req, res, next) => {
    Bulkmail.updateOne({ _id: req.params.id }, req.body, { new: true }, (err, data) => {
        if (err) {
            const error = new Error('Some Error in bulkmail');
            return next(error);
        } else {
            return res.json({ 'success': true, 'message': 'bulkmail Updated Successfully', data });
        }
    })
};

exports.delete = (req, res, next) => {
    Bulkmail.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        return res.json({ 'success': true, 'message': 'bulkmail Deleted Successfully', data });
    })

};