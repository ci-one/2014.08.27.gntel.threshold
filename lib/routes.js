'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    execute = require('./controllers/execute');

/**
 * Application routes
 */
module.exports = function (app) {

    // Server API Routes
    app.route('/api/awesomeThings')
        .get(api.awesomeThings);


    // All undefined api routes should return a 404
    app.route('/api/*')
        .get(function (req, res) {
            res.send(404);
        });

    // All other routes to use Angular routing in app/scripts/app.js
    app.route('/partials/*')
        .get(index.partials);
    app.route('/*')
        .get(index.index);

    // begin - database

    //exports.dbUserManage = {getList:null, getOne:null, insert:null, update:null};
    //exports.dbUserOrg = {getList:null, getOne:null, insert:null, update:null};

    app.route('/dbUserManage/getList')
        .post(execute.dbUserManage.getList);
    app.route('/dbUserManage/getOne')
        .post(execute.dbUserManage.getOne);
    app.route('/dbUserManage/insert')
        .post(execute.dbUserManage.insert);
    app.route('/dbUserManage/updateState')
        .post(execute.dbUserManage.updateState);
    app.route('/dbUserManage/update')
        .post(execute.dbUserManage.update);

    app.route('/dbUserOrg/getList')
        .post(execute.dbUserOrg.getList);
    app.route('/dbUserOrg/getOne')
        .post(execute.dbUserOrg.getOne);
    app.route('/dbUserOrg/insert')
        .post(execute.dbUserOrg.insert);
    app.route('/dbUserOrg/update')
        .post(execute.dbUserOrg.update);

    app.route('/dbCode/getStatus')
        .post(execute.dbCode.getStatus);

    app.route('/dbUserAccessList')
        .post(execute.dbUserAccessList);

    // end - database
};