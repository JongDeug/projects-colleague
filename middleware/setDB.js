const setDB = (controller, post, comment) => {
    return (req, res, next) => {
        try {
            controller.setPost(post);
            controller.setComment(comment);
            next();
        } catch (err) {
            next(err);
        }
    }
}


module.exports = setDB;