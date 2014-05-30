/*!
 * starterCSS Gruntfile
 * http://startercss.aquelito.Fr
 * Copyright 2013-2014 Axel Roche, Inc.
 * Licensed MIT (https://github.com/aquelito/starterCSS/blob/master/LICENSE-MIT)
 */

module.exports = function (grunt) {
  'use strict';

  // show elapsed time at the end
  require('time-grunt')(grunt);
  grunt.loadNpmTasks('sassdown');

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  var starter = grunt.file.readJSON('starter.json');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    // configurable paths
    starter: {
      app: 'app',
      dist: 'dist'
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= starter.dist %>/*',
            '!<%= starter.dist %>/.git*'
          ]
        }]
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        '<%= starter.app %>/js/{,*/}*.js',
        '!<%= starter.app %>/js/vendor/*'
      ]
    },
    compass: {
      options: {
        sassDir: '<%= starter.app %>/scss',
        cssDir: '<%= starter.dist %>/css',
        generatedImagesDir: '<%= starter.dist %>/images/generated',
        imagesDir: '<%= starter.app %>/images',
        javascriptsDir: '<%= starter.app %>/js',
        fontsDir: '<%= starter.app %>/scss/fonts',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '<%= starter.dist %>/css/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        noLineComments: true,
      },
      dist: {
        options: {
          generatedImagesDir: '<%= starter.dist %>/images/generated'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= starter.dist %>/css/',
          src: '{,*/}*.css',
          dest: '<%= starter.dist %>/css/'
        }]
      }
    },
    watch: {
      sass: {
        files: [
          '<%= starter.app %>/scss/**/*.{scss,sass}'
        ],
        tasks: ['compass']
      },
      livereload: {
        options: {
          livereload: 1338
        },
        files: [
          '<%= starter.app %>/**/*.html',
          '<%= starter.app %>/**/*.hbs',
          '<%= starter.app %>/**/*.php',
          '<%= starter.app %>/js/**/*.{js,json}',
          '<%= starter.app %>/css/*.css',
          '<%= starter.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= starter.app %>',
          dest: '<%= starter.dist %>',
          src: [
            '*.{html,php}',
            '*.{ico,png,txt}',
            'images/{,*/}*.{webp,png,jpg,jpeg,gif}',
            'scss/fonts/{,*/}*.*'
          ]
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= starter.app %>/scss',
        dest: '<%= starter.dist %>/css',
        src: '{,*/}*.css'
      }
    },
    concurrent: {
      dist: [
        'compass'
      ]
    },
    concat: {
      basic: {
        src: ['<%= starter.app %>/js/main.js'],
        dest: '<%= starter.dist %>/js/main.js',
      },
      extras: {
        src: [
          '<%= starter.app %>/js/vendor/jquery.js',
          '<%= starter.app %>/js/vendor/jquery.modal.js',
          '<%= starter.app %>/js/vendor/swipe.js',
        ],
        dest: '<%= starter.dist %>/js/vendor.min.js',
      },
    },
    // uglify: {
    //   options: {
    //     mangle: false
    //   },
    //   dist: {
    //     files: {
    //       '<%= starter.dist %>/js/main.js': ['<%= starter.app %>/js/main.js'],
    //       '<%= starter.dist %>/js/vendor.min.js': ['<%= starter.app %>/js/vendor/**/*.js']
    //     }
    //   }
    // },
    imagemin: {
      options: {
        cache: false
      },
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [{
          expand: true,
          cwd: '<%= starter.app %>/',
          src: ['images/**/*.{png}'],
          dest: '<%= starter.dist %>/images/',
          ext: '.png'
        }]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [{
          expand: true,
          cwd: '<%= starter.app %>/',
          src: ['images/**/*.{jpg}'],
          dest: '<%= starter.dist %>/images/',
          ext: '.jpg'
        }]
      },
      gif: {
        options: {
          interlaced: true
        },
        files: [{
          expand: true,
          cwd: '<%= starter.app %>/',
          src: ['images/**/*.gif'],
          dest: '<%= starter.dist %>/images/',
          ext: '.gif'
        }]
      }
    },
    /*
     * Documentations
     */
    favicons: {
      dist: {
        src: '<%= starter.app %>/images/logo.png',
        dest: '<%= starter.dist %>'
      }
    },
    sassdown: {
      styleguide: {
        options: {
          assets: [
            '<%= starter.dist %>/css/*.css',
            '<%= starter.dist %>/js/vendor.min.js',
            '<%= starter.dist %>/js/main.js',
            'http://use.typekit.net/sea5yvm.js',
          ],
          // theme: '<%= starter.app %>/scss/styleguide/theme.css',
          template: 'tools/styleguide/template.hbs',
          readme: '<%= starter.app %>/scss/styleguide.md',
          highlight: 'monokai',
          excludeMissing: true
        },
        files: [{
          expand: true,
          cwd: '<%= starter.app %>/scss',
          src: [
            'base/*.{scss,sass}',
            'components/*.{scss,sass}',
            'helpers/*.{scss,sass}',
            'layers/*.{scss,sass}',
            'pages/*.{scss,sass}',
            'vendors/*.{scss,sass}',
          ],
          dest: 'docs/styleguide/'
        }]
      }
    },
    /*
     * Analyse CSS
     */
    csscss: {
      options: {
        colorize: true,
        verbose: true,
        outputJson: false,
        minMatch: 3,
        compass: true,
        // ignoreProperties: 'padding',
        ignoreSelectors: ['.btn', '.message']
      },
      dist: {
        src: [
          '<%= starter.dist %>/css/screen.css',
          '<%= starter.dist %>/css/print.css'
        ]
      }
    },
    cssmetrics: {
      common: {
        src: ['<%= starter.dist %>/css/**/*.css'],
        options: {
          quiet: false,
          maxRules: 4096, // IE max rules
          maxFileSize: 1048576 // 1mb in bytes
        }
      }
    },
    shell: {
      cssstats: {
        command: [
          'bash tools/css-stats/css-stats-ack.sh > docs/css-stats.md'
        ].join('&&'),
        options: {
          stdout: true
        }
      },
      zipBuild: {
        command: [
          'tar -czf docs/<%= pkg.name %>-build.tar.gz <%= starter.dist %>/'
        ].join('&&'),
        options: {
          stdout: true
        }
      }
    }
  });

 /**
  * Custom Tasks
  * ========================================================================
  *
  */

  // task : build
  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:dist',
    'autoprefixer',
    'copy:dist',
    'favicons',
    'imagemin:png',
    'imagemin:jpg',
    'imagemin:gif',
    'concat'
    // 'uglify'
  ]);

  // task : publish
  grunt.registerTask('docs', [
    'shell:zipBuild',
    'sassdown'
  ]);

  // task : analyze
  grunt.registerTask('analyze', [
    'shell:cssstats',
    'cssmetrics:common',
    'csscss:dist'
  ]);

  // task : browser
  grunt.registerTask('see', [
    'watch'
  ]);

  // task : default
  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);

};
