var Q = require('q');
var request = require('./request-wrapper');
var extend = require('util')._extend;
var fs = require('fs');

module.exports = function(options) {
    this.accessToken = options.accessToken;
    this.userId = options.userId;
    this.version = options.version || '5.35';

    this.executeMethod = function(method, data) {
        var params = extend({}, data);

        extend(params, {
            access_token: this.accessToken,
            v: this.version
        });

        return request({
            method: 'GET',
            uri: 'https://api.vk.com/method/' +  method,
            qs: params,
            json: true
        });
    };


    this.messages = {};

    this.messages.get = function(data) {
        return this.executeMethod('messages.get', data);
    }.bind(this);

    this.messages.send = function(data) {
        return this.executeMethod('messages.send', data);
    }.bind(this);

    this.messages.getImageAttachmentId = function(file) {
        return this.photos
            .getMessagesUploadServer()
            .then(function(result) {
                console.log('[vk] Get message upload server', result.response.upload_url);
                return this.photos.uploadToServer(result.response.upload_url, fs.createReadStream(file));
            }.bind(this))
            .then(this.photos.saveMessagesPhoto)
            .then(function(result) {
                console.log('[vk] Get photo id', result.response[0].id)
                return 'photo' + this.userId + '_' + result.response[0].id;
            }.bind(this))
            .catch(function(error) {
                console.error('[vk] Error while getting messages upload server', error);
            });
    }.bind(this);


    this.photos = {};

    this.photos.getMessagesUploadServer = function() {
        console.log('get message upload server');
        return this.executeMethod('photos.getMessagesUploadServer');
    }.bind(this);

    this.photos.uploadToServer = function(url, fileStream) {
        console.log('[vk] Upload filestream to url');

        return request({
            method: 'POST',
            uri: url,
            formData: {
                photo: fileStream
            },  
            json: true
        });
    };

    this.photos.saveMessagesPhoto = function(data) {
        console.log('[vk] Save message photo', data);
        return this.executeMethod('photos.saveMessagesPhoto', data);
    }.bind(this);


    this.docs = {};

    this.docs.getAttachmentId = function(file) {
        return this.docs
            .getUploadServer()
            .then(function(result) {
                return this.docs.uploadToServer(result.response.upload_url, fs.createReadStream(file));
            }.bind(this))
            .then(this.docs.save)
            .then(function(result) {
                console.log("[vk] Document uploaded", result);
                return 'doc' + this.userId + '_' + result.response[0].id;
            }.bind(this))
            .catch(function(error) {
                console.error('[vk] Error while getting doc upload server', error);
            })
    }.bind(this);

    this.docs.getUploadServer = function() {
        console.log('[vk] Get document upload server');
        return this.executeMethod('docs.getUploadServer');
    }.bind(this);

    this.docs.uploadToServer = function(url, fileStream) {
        console.log('[vk] Upload document to url');
        return request({
            method: 'POST',
            uri: url,
            formData: {
                file: fileStream
            },  
            json: true
        });
    };

    this.docs.save = function(data) {
        console.log('[vk] Save document');
        return this.executeMethod('docs.save', data);
    }.bind(this);


    this.friends = {};

    this.friends.getRequests = function(data) {
        return this.executeMethod('friends.getRequests', data);
    }.bind(this);

    this.friends.add = function(userId) {
        return this.executeMethod('friends.add', {user_id: userId});
    }.bind(this);


    this.users = {};

    this.users.getFollowers = function() {
        return this.executeMethod('users.getFollowers');
    }.bind(this);

};

