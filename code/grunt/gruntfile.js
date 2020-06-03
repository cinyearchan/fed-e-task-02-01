// 实现这个项目的构建任务
const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
  grunt.initConfig({
    uglify: {
      options: {},
      static_mappings: {
        files: [{
          src: 'node_modules/jquery/dist/jquery.js',
          dest: 'temp/jquery.js'
        }, {
          src: 'node_modules/popper.js/dist/umd/popper.js',
          dest: 'temp/popper.js'
        }, {
          src: 'node_modules/bootstrap/dist/js/bootstrap.js',
          dest: 'temp/bootstrap.js'
        }]
      }
    },
    concat: {
      js: {
        src: ['temp/*.js'],
        dest: 'dist/assets/scripts/vendor.js',
        options: {
          separator: ';',
          stripBanners: true
        }
      }
    },
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      main: {
        files: {
          'dist/assets/styles/main.css': 'src/assets/styles/main.scss'
        }
      }
    },
    cssmin: {
      kopBaseCss: {
        src: ['node_modules/bootstrap/dist/css/bootstrap.css'],
        dest: "dist/assets/styles/vendor.css"
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ['@babel/preset-env']
      },
      main: {
        files: {
          'dist/assets/scripts/main.js': 'src/assets/scripts/main.js'
        }
      }
    },
    clean: {
      beforeBuild: {
        files: [
          {
            src: ['temp/', 'dist/']
          }
        ]
      },
      afterBuild: {
        files: [
          {
            src: ['temp/']
          }
        ]
      }
    },
    copy: {
      fonts: {
        expand: true,
        cwd: 'src/assets/fonts/',
        src: ['**'],
        dest: 'dist/assets/fonts/',
        flatten: false
      },
      images: {
        expand: true,
        cwd: 'src/assets/images',
        src: ['**'],
        dest: 'dist/assets/images/',
        flatten: false
      },
      ico: {
        src: 'public/favicon.ico',
        dest: 'dist/'
      }
    }
  })

  loadGruntTasks(grunt)

  grunt.registerTask('default', ['sass', 'babel', 'copy'])
  grunt.registerTask('build', [
    'clean:beforeBuild',
    'sass',
    'copy',
    'uglify',
    'concat',
    'cssmin',
    'babel',
    'clean:afterBuild'
  ])
}