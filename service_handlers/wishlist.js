const dataman = require('../dataman');
const _ = require('lodash');

const CheckAuthorization = require('./authorization').CheckAuthorization;

const GetWishes = (req, res) => {
    const token = req.headers.token;
    CheckAuthorization(token)
        .then(
            () => {
                dataman.wishlist_database.find({
                    user_id: token
                }, (err, docs) => {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    }
                    res.status(200).send(docs);
                });
            })
        .catch(
            (err) => {
                res.status(err.status).send(err.message);
            });
}

const NewWish = (req, res) => {
    const token = req.headers.token;
    CheckAuthorization(token)
        .then(
            () => {
                dataman.wishlist_database.insert({
                    user_id: token,
                    wish: req.body.wish_value,
                }, (err, data) => {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    }
                    res.status(200).send('Желание добавлено');
                })
            })
        .catch(
            (err) => {
                res.status(err.status).send(err.message);
            });
}

const DeleteWish = (req, res) => {
    const token = req.headers.token;
    CheckAuthorization(token)
        .then(
            () => {
                dataman.wishlist_database.remove({
                    _id: req.params.wish_id
                }, (err, data) => {
                    if (err) {
                        res.status(500).send(err);
                        return;
                    }
                    res.status(200).send('Желание удалено');
                })
            })
        .catch(
            (err) => {
                res.status(err.status).send(err.message);
            });
}

function Raffle() {
    dataman.users_database.find({}, (err, docs) => {
        if (err) {
            console.log(err);
            return;
        }
        const pairs = [];
        const users =  _.map(docs, '_id');
        let santas = [...users];
        let kids = [...users];
        const getPairs = () => {
            if (santas.length === 0) {
                return;
            }
            const santa = _.sample(santas);
            const kid = _.sample(kids);
            if (santa === kid) {
                getPairs();
                return;
            }
            pairs.push({ santa, kid });
            _.pull(santas, santa);
            _.pull(kids, kid);
            getPairs();
        }
        getPairs();
        console.log(pairs);
    });
}

module.exports = {
    GetWishes,
    NewWish,
    DeleteWish,
    Raffle,
}