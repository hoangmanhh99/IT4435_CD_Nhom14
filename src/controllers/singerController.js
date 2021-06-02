const { Singer } = require('../models');
const { singerService } = require('../services/index');
const { uploadToS3, uploadFirebase } = require('../services/aws');
const create = async (req, res) => {
  const file = req.file;
  var data = req.body;
  const singer = await singerService.create(data, file);
  return res.send({ status: 1, result: { singer } });
}

const update = async (req, res) => {
  let data = req.body;
  const singerId = req.params.singerId;
  const singer = await singerService.update(data, singerId);
  return res.send({ status: 1, result: { singer } });
}

const getById = async (req, res) => {
  const singerId = req.params.singerId;
  const singer = await singerService.getById(singerId);
  return res.send({ status: 1, result: { singer } });
}

// phaan trang
// const getAll = async (req, res) => {

// }

const deleteById = async (req, res) => {
  const singerId = req.params.singerId;
  await singerService.deleteById(singerId);
  return res.send({ status: 1, result: { message: "delete OK!" } });
}

const updateAvatar = async (req, res) => {
  const singerId = req.params.singerId;
  const file = req.file;
  const singer = await singerService.updateAvatar(file, singerId);
  return res.send({ status: 1, result: { singer } });
}

const get_list_singers = async (req, res) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = Singer.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdDate');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Singer.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const results = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    };
  }

  const advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  };

  res.status(200).json(advancedResults);
}


module.exports = {
  create,
  update,
  getById,
  deleteById,
  updateAvatar,
  get_list_singers
}