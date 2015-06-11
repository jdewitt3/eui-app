/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          "euiApp": true
        },
        predef: [
          "angular",
          "console",
          "_",
        ]
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      app: {
        src: '_inc/js/**/*.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: '_inc/styles',
          src: ['*.scss'],
          dest: '_inc/styles/css',
          ext: '.css'
        }]
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      styles: {
        files: '_inc/styles/*',
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      scripts: {
        files: ['_inc/js/*.js', '_inc/test/*.js'],
        tasks: ['jshint', 'karma'],
        options: {
          livereload: true
        }
      },
      templates: {
        files: ['_inc/templates/*.html', 'index.html'],
        options: {
          livereload: true
        }
      },
    },
    connect: {
      server: {
        options: {
          port:8080
        }
      }
    },
    karma: {
      unit: {
          configFile: 'karma.conf.js'
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-karma');

  // Default task.
  grunt.registerTask('default', ['jshint', 'sass', 'connect', 'karma', 'watch']);
  grunt.registerTask('bootstrap', ['jshint', 'sass', 'connect', 'karma', 'watch']);
  grunt.registerTask('build', ['sass']);
};
