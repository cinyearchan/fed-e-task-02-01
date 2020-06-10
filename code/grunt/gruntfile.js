// 实现这个项目的构建任务
const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')

module.exports = grunt => {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 9000,
          useAvailablePort: true,
          hostname: '*',
          keepalive: true,
          open: true,
          livereload: 35729,
          base: ['dist/']
        }
      }
    },
    watch: {
      options: {
        livereload: 35729
      },
      server: {
        files: ['src/assets/styles/*.scss', 'src/assets/scripts/*.js'],
        tasks: ['sass', 'copy', 'concat', 'uglify', 'cssmin', 'babel']
      }
    },
    jshint: {
      all: ['src/assets/scripts/main.js']
    },
    // 模板引擎
    swig: {
      options: {
        data: {
          pkg: {
            name: 'grunt page',
            homepage: 'https://github.com/cinyearchan/fed-e-task-02-01/tree/master/code/grunt',
            author: {
              name: 'cinyearchan',
              url: 'https://github.com/cinyearchan'
            },
            description: 'this is a fed grunt task project'
          },
          date: '2020-06-03',
          menus: [
            {
              name: 'menu',
              link: '#',
              children: [
                {
                  name: 'home',
                  link: 'index.html'
                },
                {
                  name: 'about',
                  link: 'about.html'
                }
              ]
            }
          ]
        },
        cache: false,
        templatePath: undefined
      },
      mappings: {
        expand: true,
        cwd: 'src',
        ext: '.html',
        src: ['*.html'],
        dest: 'dist'
      }
    },

    // 合并文件
    concat: {
      // 合并 JS
      kityminderJs: {
        src: [
          'node_modules/jquery/dist/jquery.js',
          'node_modules/popper.js/dist/umd/popper.js',
          'node_modules/bootstrap/dist/js/bootstrap.js'
        ],
        dest: 'temp/vendor.js'
      }
    },
    // 压缩 JS
    uglify: {
      baseJs: {
        src: 'temp/vendor.js',
        dest: 'dist/assets/scripts/vendor.js'
      }
    },
    // sass 转 css
    sass: {
      // grunt-sass
      // options: {
      //   sourceMap: true,
      //   implementation: sass
      // },
      // main: {
      //   files: {
      //     'dist/assets/styles/main.css': 'src/assets/styles/main.scss'
      //   }
      // }

      // grunt-contrib-sass
      dist: {
        options: {
          style: 'expanded',
          sourceMap: true,
          implementation: sass
        },
        files: {
          'dist/assets/styles/main.css': 'src/assets/styles/main.scss'
        }
      }
    },
    // 压缩 CSS
    cssmin: {
      kopBaseCss: {
        src: ['node_modules/bootstrap/dist/css/bootstrap.css'],
        dest: "dist/assets/styles/vendor.css"
      }
    },
    // 转换 JS
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
    // 清理临时文件
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
    // 拷贝静态资源
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
        dest: 'dist/favicon.ico'
      }
    },
    // 替换静态资源链接前置准备
    useminPrepare: {
      html: 'dist/*.html',
      options: {
        dest: './dist',
        root: './dist'
      }
    },
    // 替换静态资源链接
    usemin: {
      html: {
        files: [{
          src: 'dist/*.html',

        }]
      },
      options: {
        assetsDirs: ['dist']
      }
    }
  })

  loadGruntTasks(grunt)

  grunt.registerTask('default', ['sass', 'babel', 'copy'])
  grunt.registerTask('compile', ['build', 'connect'])
  grunt.registerTask('build', [
    'clean:beforeBuild',
    'swig',
    'sass',
    'copy',
    'concat',
    'uglify',
    'cssmin',
    'babel',
    'useminPrepare',
    'usemin',
    'clean:afterBuild'
  ])
}