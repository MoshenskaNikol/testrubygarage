const focusTimeout = 400;
const typingTimeout = 50;

function fillIn(email, password) {
    let fieldIndex = 0;
    let index = 0;
    document.querySelector('#user_email').focus();
    var timerId = setTimeout(function tick() {
        if (fieldIndex === 0) {
            if (index === email.length) {
                index = 0;
                ++fieldIndex;
                document.querySelector('#user_password').focus();
                timerId = setTimeout(tick, focusTimeout);
            } else {
                document.querySelector('#user_email').value += email[index];
                ++index;
                timerId = setTimeout(tick, typingTimeout);
            }
        } else if (fieldIndex === 1) {
            if (index === password.length) {
                index = 0;
                ++fieldIndex;
                if (window.location.href.endsWith('sign_up')) {
                    document.querySelector('#user_password_confirmation').focus();
                } else {
                    ++fieldIndex;
                }
                timerId = setTimeout(tick, focusTimeout);
            } else {
                document.querySelector('#user_password').value += password[index];
                ++index;
                timerId = setTimeout(tick, typingTimeout);
            }
        } else if (fieldIndex === 2) {
            if (index === password.length) {
                index = 0;
                fieldIndex += 2;
                timerId = setTimeout(tick, focusTimeout);
            } else {
                document.querySelector('#user_password_confirmation').value += password[index];
                ++index;
                timerId = setTimeout(tick, typingTimeout);
            }
        } else if (fieldIndex === 3) {
            index = 0;
            document.querySelector('#user_remember_me').click();
            ++fieldIndex;
            timerId = setTimeout(tick, focusTimeout);
        } else if (fieldIndex === 4) {
            document.querySelector('.auth-page input[type=submit]').click();
            localStorage.setItem('registered', true);
        }
    }, focusTimeout);
}

function randomizeEmail() {
    let email = 'user';
    for (let i = 0; i < 6; i++) {
        email += Math.floor(Math.random() * 10);
    }
    return email + '@example.com';
}

function randomizePassword() {
    let email = 'password';
    for (let i = 0; i < 12; i++) {
        email += Math.floor(Math.random() * 10);
    }
    return email;
}

$(document).ready(() => {
    if (document.querySelector('#wipeCredentialsButton') !== null) {
        document.querySelector('#wipeCredentialsButton').addEventListener('click', () => {
            localStorage.removeItem('registered');
        });
    }
});

function authFillInCredentials() {
    $(document).ready(() => {
        if (localStorage.getItem('registered') == null) {
            localStorage.setItem('email', randomizeEmail());
            localStorage.setItem('password', randomizePassword());
            if (!window.location.href.endsWith('sign_up')) {
                document.querySelector('.auth-links a').click();
            } else {
                let email = localStorage.getItem('email');
                let password = localStorage.getItem('password');
                if (document.querySelector('#user_email').value === '') {
                    fillIn(email, password);
                }
            }
        } else {
            if (window.location.href.endsWith('sign_up')) {
                document.querySelector('.auth-links a').click();
            } else {
                let email = localStorage.getItem('email');
                let password = localStorage.getItem('password');
                if (document.querySelector('#user_email').value === '') {
                    fillIn(email, password);
                }
            }
        }
    });
}
