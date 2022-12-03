const dataman = require('../dataman');

const NewUser = (req, res) => {
    dataman.users_database.find({ username: req.params.username }, (err, docs) => {
        if (docs.length > 0) {
            res.status(400).send("Пользователь с таким именем уже существует");
            return;
        }
        dataman.users_database.insert({
            username: req.params.username,
            password: req.params.password,
        }, (err, data) => {
            if (err) {
                res.status(500).send(err);
                return;
            }
            res.status(200).send(data['_id']);
        });
    });
}

const Login = (req, res) => {
    console.log(`Попытка авторизации пользователя ${req.body.login}`);
    dataman.users_database.find({ username: req.body.login }, (err, docs) => {
        if (docs.length === 0) {
            res.status(400).send("Пользователь не найден");
            return;
        }
        const user_doc = docs[0];
        if (user_doc.password != req.body.password) {
            res.status(401).send("Неверный пароль");
            return;
        }
        res.status(200).send(user_doc['_id']);
    });
}

const UserInfo = (req, res) => {
    const token = req.headers.token;
    const user_id = req.params.user_id;
    CheckAuthorization(token)
        .then(
            () => {
                dataman.users_database.find({
                    _id: user_id
                }, (err, docs) => {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    }
                    res.status(200).send(docs[0]);
                });
            })
        .catch(
            (err) => {
                res.status(err.status).send(err.message);
            });
}

function CheckAuthorization(token) {
    return new Promise((resolve, reject) => {
        if (!token) {
            reject({ status: 403, message: "Необходима авторизация" })
            return;
        }
        dataman.users_database.find({
            _id: token
        }, (err, docs) => {
            if (err) {
                reject({ status: 500, message: err });
                return;
            }
            if (docs.length === 0) {
                reject({ status: 400, message: "Пользователь не найден" })
                return;
            }
            resolve();
        });
    });
}

module.exports = {
    NewUser,
    Login,
    CheckAuthorization,
    UserInfo,
}