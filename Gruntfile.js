// VexFlow build file.
// Mohit Muthanna Cheppudira <mohit@muthanna.com>

var glob = require("glob");

module.exports = function(grunt) {
  var L = grunt.log.writeln;
  var BANNER = '/**\n' +
                ' * VexFlow <%= pkg.version %> built on <%= grunt.template.today("yyyy-mm-dd") %>.\n' +
                ' * Copyright (c) 2010 Mohit Muthanna Cheppudira <mohit@muthanna.com>\n' +
                ' *\n' +
                ' * http://www.vexflow.com  http://github.com/0xfe/vexflow\n' +
                ' */\n';
  var BUILD_DIR = 'build';
  var RELEASE_DIR = 'releases';
  var TARGET_RAW = BUILD_DIR + '/vexflow-debug.js';
  var TARGET_MIN = BUILD_DIR + '/vexflow-min.js';

  var SOURCES = [ "src/vex.js",
                  "src/flow.js",
                  "src/fraction.js",
                  "src/tables.js",
                  "src/fonts/vexflow_font.js",
                  "src/glyph.js",
                  "src/stave.js",
                  "src/staveconnector.js",
                  "src/tabstave.js",
                  "src/tickcontext.js",
                  "src/tickable.js",
                  "src/note.js",
                  "src/notehead.js",
                  "src/stem.js",
                  "src/stemmablenote.js",
                  "src/stavenote.js",
                  "src/tabnote.js",
                  "src/ghostnote.js",
                  "src/clefnote.js",
                  "src/timesignote.js",
                  "src/beam.js",
                  "src/voice.js",
                  "src/voicegroup.js",
                  "src/modifier.js",
                  "src/modifiercontext.js",
                  "src/accidental.js",
                  "src/dot.js",
                  "src/formatter.js",
                  "src/stavetie.js",
                  "src/tabtie.js",
                  "src/tabslide.js",
                  "src/bend.js",
                  "src/vibrato.js",
                  "src/annotation.js",
                  "src/articulation.js",
                  "src/tuning.js",
                  "src/stavemodifier.js",
                  "src/keysignature.js",
                  "src/timesignature.js",
                  "src/clef.js",
                  "src/music.js",
                  "src/keymanager.js",
                  "src/renderer.js",
                  "src/raphaelcontext.js",
                  "src/canvascontext.js",
                  "src/stavebarline.js",
                  "src/stavehairpin.js",
                  "src/stavevolta.js",
                  "src/staverepetition.js",
                  "src/stavesection.js",
                  "src/stavetempo.js",
                  "src/stavetext.js",
                  "src/barnote.js",
                  "src/tremolo.js",
                  "src/tuplet.js",
                  "src/boundingbox.js",
                  "src/textnote.js",
                  "src/frethandfinger.js",
                  "src/stringnumber.js",
                  "src/strokes.js",
                  "src/curve.js",
                  "src/staveline.js",
                  "src/crescendo.js",
                  "src/ornament.js",
                  "src/pedalmarking.js",
                  "src/textbracket.js",
                  "src/textdynamics.js", "src/*.js", "!src/header.js", "!src/container.js"];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: BANNER
      },
      build: {
        src: SOURCES,
        dest: TARGET_RAW
      }
    },
    uglify: {
      options: {
        banner: BANNER
      },
      build: {
        src: SOURCES,
        dest: TARGET_MIN
      }
    },
    jshint: {
      files: SOURCES,
      options: {
        eqnull: true,   // allow == and ~= for nulls
        sub: true,      // don't enforce dot notation
        trailing: true, // no more trailing spaces
        globals: {
          "Vex": false,
          "Raphael": false
         } // allowed globals
      }
    },
    qunit: {
      files: ['tests/flow.html']
    },
    watch: {
      files: SOURCES,
      tasks: ['concat']
    },
    copy: {
      release: {
        files: [
          {
            expand: true,
            dest: RELEASE_DIR,
            cwd: BUILD_DIR,
            src    : ['*.js', 'docs/**']
          }
        ]
      }
    },
    docco: {
      src: SOURCES,
      options: {
        layout: 'linear',
        output: 'build/docs'
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-release');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'docco']);

  // Release current build.
  grunt.registerTask('stage', 'Stage current binaries to releases/.', function() {
    grunt.task.run('copy:release');
  });
};