const { Song, Album, Category, Singer } = require('../models');
const {albumService} = require('../services/index');

// create new album
const create = async (req, res) => {
    const file = req.file;
    var data = req.body;
    const album = await albumService.create(data, file);
    return res.send({status: 1, result: {album}});
}

// update an album by its id
const update = async (req, res) => {
    const data = req.body;
    const albumId = req.params.albumId;
    const album = await albumService.update(data, albumId);
    return res.send({status: 1, result: {album}});
}

// get an album by its id
const getById = async (req, res) => {
    const albumId = req.params.albumId;
    const album = await albumService.getById(albumId);
    let result = album.toObject();
    let list_song_ids = result.musicList;
    let list_category_ids = result.category;
    let list_singer_ids = result.singers;
    let tmp, songs = [], categorys = [], singers = [];
    const n = list_song_ids.length;
    const m = list_category_ids.length;
    const p = list_singer_ids.length;
    if (n > 0) {
      for (let song_id of list_song_ids) {
        tmp = await Song.findById(song_id).select('name _id');
        if (tmp) {
          songs.push(JSON.stringify(tmp))
        } else {
          songs.push(undefined)
        }
      }
    }

    if (m > 0) {
      for (let category_id of list_category_ids) {
        tmp = await Category.findById(category_id).select('name _id');
        console.log(tmp)
        if (tmp) {
          categorys.push(JSON.stringify(tmp))
        } else {
          categorys.push(undefined)
        }
      }
    }

    if (p > 0) {
      for (let singer_id of list_singer_ids) {
        tmp = await Singer.findById(singer_id).select('name _id');
        if (tmp) {
          singers.push(JSON.stringify(tmp))
        } else {
          singers.push(undefined)
        }
      }
    }

    result.musicList = songs;
    result.category = categorys;
    result.singers = singers;
    return res.send({"status": 1, "result": {result}});
}

// delete an album by its id
const deleteById = async (req, res) => {
    const albumId = req.params.albumId;
    await albumService.deleteById(albumId);
    return res.send({status: 1, result: {message: "delete OK!"}});
}

// update image for an album
const updateCoverImage = async (req, res) => {
    const albumId = req.params.albumId;
    const file = req.file;
    const album = await albumService.updateCoverImage(file, albumId);
    return res.send({status: 1, result: {album}});
}

// Pagination
const get_list_albums = async (req, res) => {
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
    query = Album.find(JSON.parse(queryStr));
  
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
    const total = await Album.countDocuments(JSON.parse(queryStr));
  
    query = query.skip(startIndex).limit(limit);

    // Executing query
    const results = await query;
    let new_results = [];

    let result, list_song_ids, list_category_ids, list_singer_ids, tmp, songs, categorys, singers, n, m, p;

    if (results.length > 0) {
      for (let album of results) {
        result = album.toObject();
        list_song_ids = result.musicList;
        list_category_ids = result.category;
        list_singer_ids = result.singers;
        songs = [];
        categorys = [];
        singers = [];
        n = list_song_ids.length;
        m = list_category_ids.length;
        p = list_singer_ids.length;
        if (n > 0) {
          for (let song_id of list_song_ids) {
            tmp = await Song.findById(song_id).select('name');
            if (tmp) {
              songs.push(JSON.stringify(tmp))
            } else {
              songs.push(undefined)
            }
          }
        }
    
        if (m > 0) {
          for (let category_id of list_category_ids) {
            tmp = await Category.findById(category_id).select('name');
            if (tmp) {
              categorys.push(JSON.stringify(tmp))
            } else {
              categorys.push(undefined)
            }
          }
        }
    
        if (p > 0) {
          for (let singer_id of list_singer_ids) {
            tmp = await Singer.findById(singer_id).select('name');
            if (tmp) {
              singers.push(JSON.stringify(tmp))
            } else {
              singers.push(undefined)
            }
          }
        }
    
        result.musicList = songs;
        result.category = categorys;
        result.singers = singers;

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
      "results": new_results
    };

    res.status(200).json(advancedResults);
}


module.exports = {
    create,
    update,
    getById,
    deleteById,
    updateCoverImage,
    get_list_albums
}