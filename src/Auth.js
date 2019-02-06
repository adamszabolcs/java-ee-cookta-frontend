import auth0 from 'auth0-js';

export default class Auth {
    accessToken;
    idToken;
    expiresAt;

    auth0 = new auth0.WebAuth({
        domain: "gabtotal.eu.auth0.com",
        clientID: "XJY2WzUJ0M0yq9SI1xlv2gZSdWTxT4wB",
        redirectUri: "http://localhost:3000",
        audience: "https://cookta/api",
        responseType: 'token id_token',
        scope: 'openid profile'
    });

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getIdToken = this.getIdToken.bind(this);
        this.renewSession = this.renewSession.bind(this);
    }

    login() {
        this.auth0.authorize();
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                window.location.hash = '';
                this.setSession(authResult);
            } else if (err) {
                console.log(err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    getAccessToken() {
        return this.accessToken;
    }

    getIdToken() {
        return this.idToken;
    }

    setSession(authResult) {
        // Set isLoggedIn flag in localStorage
        localStorage.setItem('isLoggedIn', 'true');

        // Set the time that the access token will expire at
        let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
        this.expiresAt = expiresAt;
        console.log("setted");

        localStorage.setItem("accessToken", authResult.accessToken);

       this.auth0.client.userInfo(authResult.accessToken, function(err, profile) {
            if (profile) {
                localStorage.setItem("username", profile.nickname);
            }
        });

    }

    renewSession() {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                console.log("setSession done");
            } else if (err) {
                this.logout();
                console.log(err);
                alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
            }
        });
    }

    logout() {
        // Remove tokens and expiry time
        this.accessToken = null;
        this.idToken = null;
        this.expiresAt = 0;

        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');

        // navigate to the home route
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = this.expiresAt;
        return new Date().getTime() < expiresAt;
    }
}