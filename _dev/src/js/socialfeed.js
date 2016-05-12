import Mustache from 'mustache';

import Utils from './utils/Utils';
import ApiUtils from './utils/ApiUtils';

(function (window) {

    'use strict';

    var SocialFeed = function () {
        destroy.call(this);

        this.facebookData = [];
        this.instagramData = [];
        this.twitterData = [];

        this.facebookContainer = null;
        this.instagramContainer = null;
        this.twitterContainer = null;

        var defaults = {
            facebook: '0',
            instagram: '0',
            twitter: '0',
            facebookContainerClass: '.socialFeeds-facebook-container',
            instagramContainerClass: '.socialFeeds-instagram-container',
            twitterContainerClass: '.socialFeeds-twitter-container',
            loadingContainerClass: '.socialFeeds-loading',
            loadingHtml: 'LOADING'
        };

        if (arguments[0] && typeof arguments[0] === 'object') {
            this.options = Utils.extend(defaults, arguments[0]);
        }

        init.call(this);
    };

    /**
     * Destory instance of plugin
     * @private
     */
    var destroy = function () {
        if (!this.options) return;

        this.options = null;
    };

    /**
     * Init Plugin
     * @private
     */
    var init = function (options) {
        const self = this;

        if (this.options.facebook === '1') {
            this.facebookContainer = document.querySelector(this.options.facebookContainerClass);
            this.facebookContainer.querySelector(this.options.loadingContainerClass).innerHTML = this.options.loadingHtml;

            ApiUtils.loadData('api/craft/socialfeedplugin/facebook', function (results) {
                self.facebookData = results;
                getFacebookView.call(self);
            });
        }

        if (this.options.instagram === '1') {
            this.instagramContainer = document.querySelector(this.options.instagramContainerClass);
            this.instagramContainer.querySelector(this.options.loadingContainerClass).innerHTML = this.options.loadingHtml;

            ApiUtils.loadData('api/craft/socialfeedplugin/instagram', function (results) {
                self.instagramData = results;
                getInstagramView.call(self);
            });
        }

        if (this.options.twitter === '1') {
            this.twitterContainer = document.querySelector(this.options.twitterContainerClass);
            this.twitterContainer.querySelector(this.options.loadingContainerClass).innerHTML = this.options.loadingHtml;

            ApiUtils.loadData('api/craft/socialfeedplugin/twitter', function (results) {
                self.twitterData = results;
                getTwitterView.call(self);
            });
        }
    };

    /**
     * Get Facebook View
     * @private
     */
    var getFacebookView = function () {
        var facebookTemplate = document.getElementById('socialFeeds-facebook').innerHTML;
        Mustache.parse(facebookTemplate);
        var facebookCompiled = Mustache.render(facebookTemplate, this.facebookData);
        this.facebookContainer.innerHTML = facebookCompiled;
    };

    /**
     * Get Instagram View
     * @private
     */
    var getInstagramView = function () {
        var instagramTemplate = document.getElementById('socialFeeds-instagram').innerHTML;
        Mustache.parse(instagramTemplate);
        var instagramCompiled = Mustache.render(instagramTemplate, this.instagramData);
        this.instagramContainer.innerHTML = instagramCompiled;
    };

    /**
     * Get Twitter View
     * @private
     */
    var getTwitterView = function () {
        var twitterTemplate = document.getElementById('socialFeeds-twitter').innerHTML;
        Mustache.parse(twitterTemplate);
        var twitterCompiled = Mustache.render(twitterTemplate, this.twitterData);
        this.twitterContainer.innerHTML = twitterCompiled;
    };

    // load it
    window.SocialFeed = SocialFeed;

})(window);
