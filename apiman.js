const dataman = require('./dataman');
// HANDLERS
const Authorization = require('./service_handlers/authorization');
const Wishlist = require('./service_handlers/wishlist');

const CheckAuthorization = Authorization.CheckAuthorization;

function Initialize(app) {
    // ROUTES
    app.get('/', (req, res) => {
        res.sendFile(`${__dirname}/${process.env.CLIENT_DIR}/index.html`);
    });
    app.get('/public_scripts/:scr_name', (req, res) => {
        const scriptName = req.params.scr_name;
        res.sendFile(`${__dirname}/public_scripts/${scriptName}.js`);
    });
    app.get('/raffle', Wishlist.Raffle);

    // AUTHORIZATION
    app.get('/new_user/:username/:password', Authorization.NewUser);
    app.get('/user_info/:user_id', Authorization.UserInfo);
    app.post('/auth', Authorization.Login);

    // WISHLIST
    app.post('/new_wish', Wishlist.NewWish);
    app.get('/get_wishes', Wishlist.GetWishes);
    app.delete('/delete_wish/:wish_id', Wishlist.DeleteWish);
}

module.exports = Initialize;