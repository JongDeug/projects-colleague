const createPostController = require('./BoardControllers/createPostController');
const readPostListController = require('./BoardControllers/readPostListController');
const updatePostController = require('./BoardControllers/updatePostController');
const deletePostController = require('./BoardControllers/deletePostController');

const boardController = {
    createPost: {
        get : createPostController.getMethod,
        post : createPostController.postMethod
    },
    readPostList: {
        get : readPostListController.getMethod,
    },
    updatePost: {
        get : updatePostController.getMethod,
        put : updatePostController.putMethod
    },
    deletePost: {
        get : deletePostController.getMethod,
        delete : deletePostController.deleteMethod
    },
};

module.exports = boardController;