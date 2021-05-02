const { Singer, Category, Musican } = require('../models');
const Song = require('../models/Song');
const songService = require('../services/songService');


const create = async (req, res) => {
    let data = req.body;
    let files = req.files;
    let musicFile;
    let imageFile;
    files.map(file => {
        if(file.mimetype.includes('image'))
            imageFile = file;
        else
            musicFile = file;
    })
    let song = await songService.create(data, musicFile, imageFile);
    return res.send({status: 1, result: {song}});
}

const update = async (req, res) => {
    let songId = req.params.songId;
    console.log("updating...")
    let data = req.body;
    console.log(req.body)
    let song = await songService.update(data, songId);
    // console.log("song = ", song);
    return res.send({status: 1, result: {song}});
}
    
const updateCoverImage = async (req, res) => {
    let songId = req.params.songId;
    let file = req.file;
    let song = await songService.updateCoverImage(file, songId);
    return res.status(200).json({status: 1, result: {coverImage: song.cover_image}});
}

const updateSongFile = async (req ,res) => {
    let songId = req.params.songId;
    let file = req.file;
    let song = await songService.updateSongFile(file, songId);
    return res.send({status: 1, result: {file: song.file}});
}

const deleteSong = async (req, res) => {
    await songService.deleteById(req.params.songId);
    return res.send({status: 1, result: {message: "deleted!"}});
}


/* USER privilage */


const watchSong = async (req, res) => {
    let songId = req.params.songId;
    let userId = undefined;
    if (req.user) {
        userId = req.user._id.toString()
    }
    console.log("user ID = ", userId);
    let song = await songService.watchSong(userId, songId);
    return res.send({status: 1, result: {song}});
}

// Pagination
const get_list_songs = async (req, res) => {
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
    query = Song.find(JSON.parse(queryStr));
  
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
    const total = await Song.countDocuments(JSON.parse(queryStr));
  
    query = query.skip(startIndex).limit(limit);

    // Executing query
    const results = await query;
    let new_results = [];
    let result, list_singer_ids, list_category_ids, list_musican_ids, tmp, singers, categories, musicans, n, m, p;

    if (results.length > 0) {
      for (let song of results) {
        console.log("song: ", song);
        result = song.toObject();
        list_singer_ids = result.singers;
        list_category_ids = result.categories;
        list_musican_ids = result.musican
        singers = [];
        categories = [];
        musicans = [];
        if (list_singer_ids != null && list_singer_ids != undefined) {
          n = list_singer_ids.length;
        }
        if (list_category_ids != null && list_category_ids != undefined) {
          m = list_category_ids.length;
        }
        if (list_musican_ids) {
          p = list_musican_ids.length;
        }
        
        if (n > 0) {
          if (list_singer_ids != null && list_singer_ids != undefined) {
            for (let singer_id of list_singer_ids) {
              if(singer_id){
                tmp = await Singer.findById(singer_id).select('name');
                if (tmp) {
                  singers.push(JSON.stringify(tmp))
                } else {
                  singers.push(undefined)
                }
              }else continue;
              
            }
          }
          
        }

        if (m > 0) {
          if(list_category_ids != null && list_category_ids != undefined){
            for (let category_id of list_category_ids) {
              if(category_id){
                tmp = await Category.findById(category_id).select('name');
                if (tmp) {
                  categories.push(JSON.stringify(tmp))
                } else {
                  categories.push(undefined)
                }
              }
              else continue;
              
            }
          }
         
        }

        if (p > 0) {
          for (let musican_id of list_musican_ids) {
            if(musican_id){
              tmp = await Musican.findById(musican_id).select('name');
              if (tmp) {
                musicans.push(JSON.stringify(tmp))
              } else {
                musicans.push(undefined)
              }
            }
            
          }
        }
    
        result.singers = singers;
        result.musican = musicans;
        result.categories = categories;

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
      total,
      success: true,
      count: results.length,
      pagination,
      results: new_results,
    };

    res.status(200).json(advancedResults);
}

module.exports = {
    create,
    update, 
    updateCoverImage,
    updateSongFile,
    deleteSong,
    get_list_songs,
    watchSong

}



