import router from './urlDataRoute.js'; // Adjust the path as needed

function routeFile (app) {
    app.use('', router)
}

export default routeFile; // Use export default
