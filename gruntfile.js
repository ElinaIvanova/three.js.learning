module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      options: {
        debug: true,
        keepalive: true,
        port: 8000,
        protocol: 'http',
      },
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc',
      },
      test: {
        src: ['*.css'],
        expand: true,
      },
    },
    eslint: {
      options: {
        configFile: '.eslintrc',
      },
      test: {
        src: ['**/*.js'],
        expand: true,
      },
    },
    watch: {
      options: {
        spawn: false,
        event: ['added', 'changed'],
        interrupt: true,
      },
      javascript: {
        files: ['**/*.js'],
        tasks: ['eslint'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('eslint-grunt');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('connect', 'connect');
  grunt.registerTask('watch', 'watch');
  grunt.registerTask('eslint', 'eslint');
};
