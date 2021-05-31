const { Song, Category } = require('../models')
const { categoryService } = require('../services/index');

const create = async (req, res) => {
  let imageFile = req.file;
  const category = await categoryService.create(req.body, imageFile);
  return res.send({ status: 1, result: { category } });
}

const update = async (req, res) => {
  const category = await categoryService.update(req.body, req.params.categoryID);
  return res.send({ status: 1, result: { category } });
}

const getById = async (req, res) => {
  const category = await categoryService.getById(req.params.categoryID);
  let result = category.toObject();
  let list_song_ids = result.list_song;
  let tmp, songs = [];
  const n = list_song_ids.length;
  if (n > 0) {
    for (let song_id of list_song_ids) {
      tmp = await Song.findById(song_id)
      if (tmp) {
        songs.push(tmp.toObject())
      } else {
        songs.push(undefined)
      }
    }
  }
  result.list_song = songs;
  return res.send({ "status": 1, "result": { result } });
}

// pagination
const get_list_categorys = async (req, res) => {
  console.log('pagination...')
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
  query = Category.find(JSON.parse(queryStr));

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
  const total = await Category.countDocuments(JSON.parse(queryStr));

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const results = await query;
  let new_results = [];

  let result, list_song_ids, tmp, songs, n;

  if (results.length > 0) {
    for (let category of results) {
      result = category.toObject();
      list_song_ids = result.list_song;
      songs = [];
      n = list_song_ids.length;
      if (n > 0) {
        for (let song_id of list_song_ids) {
          tmp = await Song.findById(song_id)
          if (tmp) {
            songs.push(tmp.toObject())
          } else {
            songs.push(undefined)
          }
        }
      }

      result.list_song = songs;

      new_results.push(result)
    }
  }

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
    data: new_results
  };

  res.status(200).json(advancedResults);
}

const deleteById = async (req, res) => {
  await categoryService.deleteById(req.params.categoryID);
  return res.send({ status: 1, result: { message: "delete OK!" } });
}


module.exports = {
  create,
  update,
  getById,
  get_list_categorys,
  deleteById,
}