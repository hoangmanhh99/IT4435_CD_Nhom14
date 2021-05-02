const {userService} = require('../services/index');
const {User, Song, Singer} = require('../models')
const CustomError = require('../errors/CustomError');


const register = async (req, res) => {
    const {email, name, password} = req.body;
    const result = await userService.register({email, name, password});
    return res.send({"status": 1, "result": result});
}

const login = async (req, res) => {
    const {email, password} = req.body;
    const {accesstoken, avatar, name} = await userService.login(email, password);
    return res.send({status: 1, result: {accesstoken, avatar, name}});
}

const updateAvatar = async (req, res, next) => {
    let file = req.file;
    let userId = undefined;
    if (req.user) {
        userId = req.user._id
    } else {
        return next(new CustomError(401, "Please authenticate!"))
    }
    let avatar = await userService.updateAvatar(userId, file);
    return res.send({status: 1, result: {avatar}});
    
}

const get_user_info = async (req, res, next) => {
    const user = req.user;
    if (!user) {
        return next(new CustomError(400, "Bad Request!"));
    }
    let userObject = user.toObject();
    let singer, music_audio, music_video;

    // change favorite Singers
    let list_singers = user.favoriteSingers;
    delete userObject.favoriteSingers;

    userObject.favoriteSingers = [];

    for (let sgr of list_singers) {
        
        singer = await Singer.findById(sgr);
        console.log("singers = ", singer)
        if (!singer) {
            continue;
        }
        userObject.favoriteSingers.push(singer.toObject());
    }

    // change favorite MAs
    let list_MAs = user.favoriteMAs;
    delete userObject.favoriteMAs;

    userObject.favoriteMAs = [];

    for (let ma of list_MAs) {
        music_audio = await Song.findById(ma);
        if (!music_audio) {
            continue;
        }
        userObject.favoriteMAs.push(music_audio.toObject());
    }

    // change favorite MVs
    let list_MVs = user.favoriteMVs;
    delete userObject.favoriteMVs;

    userObject.favoriteMVs = [];

    for (let mv of list_MVs) {
        music_video = await Song.findById(mv);
        if (!music_video) {
            continue;
        }
        userObject.favoriteMVs.push(music_video.toObject());
    }

    res.status(200).json(userObject)
}

const like_song = async (req, res) => {
    let song = await Song.findById(req.params.id)
    let user = req.user
    if (!song) {
        res.status(404).json({
            code: 9992,
            message: 'song is not found'
        })
    }

    // dislike Song
    if (song.users_liked.includes(req.user._id)) {

        for( var i = 0; i < song.users_liked.length; i++) {
            if (song.users_liked[i].toString() === req.user._id.toString()) {
                song.users_liked.splice(i, 1);
            }
        }

        song.favorites -= 1

        // delete favoriteSong from user
        if (song.type === "MA") {
            for( let i = 0; i < user.favoriteMAs.length; i++) {
                if (user.favoriteMAs[i].toString() === song._id.toString()) {
                    user.favoriteMAs.splice(i, 1);
                }
            }
        } else if (song.type === "MV") {
            for( let i = 0; i < user.favoriteMVs.length; i++) {
                if (user.favoriteMVs[i].toString() === song._id.toString()) {
                    user.favoriteMVs.splice(i, 1);
                }
            }
        }

        await song.save()
        await user.save()

        res.status(200).json({
            code: 1000,
            message: `song ${song._id} is disliked by user: ${req.user._id}`
        })
    }
    else {

        song.favorites += 1
        song.users_liked.push(req.user._id)

        await song.save()

        if (song.type === "MA") {
            user.favoriteMAs.push(song._id)
        } else if (song.type === "MV") {
            user.favoriteMVs.push(song._id)
        }

        await user.save()

        res.status(200).json({
            code: 1000,
            message: `song ${song._id} has a new like by user: ${req.user._id}`
        })
    }
}

const like_singers = async (req, res) => {
    let user = req.user
    let singer = await Singer.findById(req.params.id)

    if (!singer) {
        res.status(404).json({ 
            code: 9992,
            message: 'singer is not found'
        })
    }

    // dislike
    if (singer.users_liked.includes(req.user._id)) {

        for( let i = 0; i < singer.users_liked.length; i++) {
            if (singer.users_liked[i].toString() === req.user._id.toString()) {
                singer.users_liked.splice(i, 1);
            }
        }

        singer.favorites -= 1

        // delete favoriteSinger from user
        for( let i = 0; i < user.favoriteSingers.length; i++) {
            if (user.favoriteSingers[i].toString() === singer._id.toString()) {
                user.favoriteSingers.splice(i, 1);
            }
        }


        await singer.save()
        await user.save()

        res.status(200).json({
            code: 1000,
            message: `singer ${singer._id} is disliked by user: ${req.user._id}`
        })
    }
    else {

        singer.favorites += 1
        singer.users_liked.push(req.user._id)

        await singer.save()

        user.favoriteSingers.push(singer._id)
        await user.save()

        res.status(200).json({
            code: 1000,
            message: `singer ${singer._id} has a new like by user: ${req.user._id}`
        })
    }
}

const logout = async (req, res, next) => {
    let user = req.user
    if (!user) {
        return next(new CustomError(401, "please authenticate"))
    }
    user.token = undefined
    await user.save()
    res.status(200).json({
        "message": "Logout success!!!!",
        "data": {}
    })
}

module.exports = {
    register,
    login,
    updateAvatar,
    like_song,
    like_singers,
    get_user_info,
    logout
}