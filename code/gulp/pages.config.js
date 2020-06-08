module.exports = {
  build: {
    src: 'src',
    dist: 'dist',
    temp: 'temp',
    public: 'public',
    paths: {
      styles: 'assets/styles/*.scss',
      scripts: 'assets/scripts/*.js',
      pages: '*.html',
      images: 'assets/images/**',
      fonts: 'assets/fonts/**'
    }
  },
  data: {
    menus: [
      {
        name: 'Home',
        icon: 'aperture',
        link: 'index.html'
      },
      {
        name: 'About',
        link: 'about.html'
      },
      {
        name: 'Contact',
        link: '#',
        children: [
          {
            name: 'Twitter',
            link: 'https://twitter.com/'
          },
          {
            name: 'Weibo',
            link: 'https://weibo.com/'
          },
          {
            name: 'divider'
          },
          {
            name: 'Github',
            link: 'https://github.com/cinyearchan'
          }
        ]
      }
    ],
    pkg: require('./package.json'),
    date: new Date()
  }
}