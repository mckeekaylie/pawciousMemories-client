let APIURL = '';

switch (window.location.hostname) {
    case `localhost` || '127.0.0.1':
        APIURL = 'https://pawciousmemories-server.herokuapp.com';
        break;
    case 'pawciousmemories-client.herokuapp.com':
        APIURL = 'https://pawciousmemories-server.herokuapp.com'
}

export default APIURL;