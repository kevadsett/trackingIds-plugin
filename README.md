# grunt-adapt-tracking-ids

> Automates the insertion of SCORM tracking IDs.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-adapt-tracking-ids --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-adapt-tracking-ids');
```

## The "adapt_tracking_ids" task

### Overview
In your project's Gruntfile, add a section named `adapt_tracking_ids` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  adapt_tracking_ids: {
    options: {
      courseFile: "course/course.json"
    }
  },
})
```

### Options

#### options.courseFile
Type: `String`
Default value: `'course/course.json'`

A string representation of the JSON file which contains the course.
