/*
 * grunt-adapt-tracking-ids
 * https://github.com/kevadsett/trackingIds-plugin
 *
 * Copyright (c) 2013 Kev Adsett
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    
    grunt.registerTask('adapt_insert_tracking_ids', 'Automates the insertion of SCORM tracking IDs.', function() {
        
        var options = this.options({
            contentTypes: ["topics", "pages", "articles", "blocks"],
            latestTrackingId: -1,
            trackingIdsSeen: [],
        });
        
        function insertTrackingIds(course){
            options.latestTrackingId = course.latestTrackingId || -1;
            
            for(var i in course.modules) {
                setBlockTrackingId(course.modules[i]);
            }
            course.latestTrackingId = options.latestTrackingId;
            grunt.log.writeln("The latest tracking ID is " + course.latestTrackingId);
            grunt.file.write(options.courseFile, JSON.stringify(course, null, "    "));
        }
        
        function setBlockTrackingId(startingItem) {
            if(startingItem.components !== undefined) {
                if(startingItem.trackingId === undefined) {
                    startingItem.trackingId = ++options.latestTrackingId;
                    grunt.log.writeln("Adding tracking ID: " + startingItem.trackingId + " to " + startingItem.id);
                } else {
                    if(options.trackingIdsSeen.indexOf(startingItem.trackingId) > -1) {
                        grunt.log.writeln("Warning: " + startingItem.id + " has the tracking ID " + startingItem.trackingId + ", but this is already in use. Changing to " + (options.latestTrackingId + 1) + ".");
                        startingItem.trackingId = ++options.latestTrackingId;
                    }
                }
                options.trackingIdsSeen.push(startingItem.trackingId);
            } else {
                var blocks = [], children;
                for(var i = 0; i < options.contentTypes.length; i++) {
                    if(startingItem[options.contentTypes[i]] !== undefined) {
                        children = options.contentTypes[i];
                        break;
                    }
                }
                for(i = 0; i < startingItem[children].length; i++) {
                    setBlockTrackingId(startingItem[children][i]);
                }
            }
        }
        
        insertTrackingIds(grunt.file.readJSON(options.courseFile));
    });
};
