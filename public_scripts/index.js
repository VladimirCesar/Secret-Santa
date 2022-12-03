const Authorization = {
    token: null,
    status: 0,
    userInfo: null,
    LogOut: () => {
        Authorization.token = null;
    },
};
Object.defineProperty(Authorization, 'status', {
    get: () => {
        const status = Authorization.token ? 1 : 0;
        OnUserAuthorizationStatus(status);
        return status;
    },
    set: (value) => {
        OnUserAuthorizationStatus(value);
    }
});
Object.defineProperty(Authorization, 'token', {
    get: () => {
        return localStorage.trabloebes_user_token;
    },
    set: (value) => {
        if (!value) {
            localStorage.removeItem('trabloebes_user_token');
            Authorization.status = 0;
            return;
        }
        localStorage.setItem('trabloebes_user_token', value);
        Authorization.status = 1;
    }
});

window.onload = () => {
    const _token = localStorage.trabloebes_user_token;
    if (_token) {
        fetch('/user_info/' + _token,
            {
                method: 'GET',
                headers: {
                    'Token': _token,
                },
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        Authorization.userInfo = data;
                        Authorization.token = _token;
                    });
                }
            });
    }
}

function OnUserAuthorizationStatus(authStatus = 0) {
    document.querySelector('#auth_form').style.display = authStatus === 0 ? 'unset' : 'none';
    document.querySelector('#main').style.display = authStatus === 0 ? 'none' : 'unset';
    document.querySelector('#user').innerHTML = authStatus === 0 ? '' : Authorization.userInfo.username;
    if (authStatus === 1) refresh_wishlist();
}

function auth_handler() {
    fetch('/auth',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: document.querySelector('input[name="login"]').value,
                password: document.querySelector('input[name="password"]').value
            })
        })
        .then(response => {
            if (response.status === 200) {
                response.text().then(text => {
                    Authorization.token = text;
                });
            }
            else {
                response.text().then(text => {
                    alert(text);
                });
            }
        })
}

function add_wish() {
    fetch('/new_wish',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': Authorization.token,
            },
            body: JSON.stringify({
                wish_value: document.querySelector('input[name="wish"]').value,
            }),
        }).then(response => {
            if (response.status === 200) {
                response.text().then(text => {
                    refresh_wishlist();
                });
            }
            else {
                response.text().then(text => {
                    alert(text);
                });
            }
        });
}

function refresh_wishlist() {
    fetch('/get_wishes',
        {
            method: 'GET',
            headers: {
                'Token': Authorization.token,
            },
        }).then(response => {
            if (response.status === 200) {
                response.json().then(json => {
                    const wishlist = document.querySelector('.wish_list__list');
                    wishlist.innerHTML = '';
                    json.forEach(wish => {
                        wishlist.innerHTML += `<div onclick="delete_wish(this)" data-wish_id="${wish._id}" class="wish">${wish.wish}</div>`;
                    });
                }
                );
            }
            else {
                response.text().then(text => {
                    alert(text);
                });
            }
        });
}

function delete_wish(element) {
    const wishId = element.dataset.wish_id;
    fetch('/delete_wish/' + wishId,
        {
            method: 'DELETE',
            headers: {
                'Token': Authorization.token,
            },
        }).then(response => {
            if (response.status === 200) {
                response.text().then(text => {
                    console.log(text);
                    refresh_wishlist();
                });
            }
            else {
                response.text().then(text => {
                    alert(text);
                });
            }
        });
}

function signin_handler() {
    fetch('/new_user/' + document.querySelector('input[name="signin_login"]').value + '/' + document.querySelector('input[name="signin_password"]').value,
        {
            method: 'GET',
        }).then(response => {
            if (response.status === 200) {
                response.text().then(text => {
                    Authorization.token = text;
                });
            }
            else {
                response.text().then(text => {
                    alert(text);
                });
            }
        });
}