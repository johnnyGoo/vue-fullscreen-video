(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


// 注册
/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'vue-movie-clip',
    // 声明 props
    props: {
        forward: {
            type: Boolean,
            default: true
        },
        frameTime: {
            type: Number,
            default: 50
        },
        loop: {
            type: Boolean,
            default: true
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        initFrame: {
            type: Number,
            default: 1
        },
        type: {
            type: String,
            default: 'canvas'
        },

        frames: {
            type: Array
        },

        width: {
            type: Number,
            default: 640
        },
        height: {
            type: Number,
            default: 320
        }
    },
    data: function () {
        return {
            playing: false, lastFrame: 1, frame: 0, iv: 0, totalFrame: 0, ctx: null, canvas: null, images: []
        };
    },
    methods: {
        updateFrame: function (val) {
            if (this.$el) {
                if (val < 1 || val > this.totalFrame) {
                    return false;
                }
                switch (this.type) {
                    case 'dom':
                        this.$el.children[0].children[this.lastFrame - 1].style.setProperty('display', 'none');
                        this.$el.children[0].children[this.frame - 1].style.setProperty('display', 'block');
                        break;
                    case 'canvas':
                        let img = this.images[this.frame - 1];
                        this.ctx.drawImage(img, 0, 0, this.width, this.height);
                        break;
                }
                this.lastFrame = val;
                this.$emit('frame', this);
            }
        },
        nextFrame: function () {

            if (this.forward === true) {
                this.goFixFrame(this.frame + 1);
                if (this.frame === this.totalFrame && this.loop === false) {
                    this.stop();
                } else {
                    this.autoNext();
                }
            } else {
                this.goFixFrame(this.frame - 1);
                if (this.frame === 1 && this.loop === false) {
                    this.stop();
                } else {
                    this.autoNext();
                }
            }
        },
        goFixFrame: function (frame) {
            while (frame < 1) {
                frame = frame + this.totalFrame;
            }
            while (frame > this.totalFrame) {
                frame = frame - this.totalFrame;
            }
            this.frame = frame;
        },
        setFrameTime: function (time) {
            if (time >= 0) {
                this.frameTime = time;
            }
        },
        skipTo: function (frame) {
            this.goFixFrame(frame);
        },
        autoNext: function () {
            clearTimeout(this.iv);
            this.iv = setTimeout(this.nextFrame, this.frameTime);
        },
        play: function () {
            this.playing = true;
            this.nextFrame();
            this.$emit('play', this);
        },
        stop: function () {
            this.playing = false;
            clearTimeout(this.iv);
            this.$emit('stop', this);
        }
    },

    watch: {
        width: function (val, oldVal) {
            this.canvas.width = this.width;
            this.updateFrame(this.frame);
        },
        height: function (val, oldVal) {
            this.canvas.height = this.height;
            this.updateFrame(this.frame);
        }, frame: function (val, oldVal) {
            if (val !== oldVal) {
                if (val > 0 && val <= this.totalFrame) {
                    this.updateFrame(val);
                } else {
                    return false;
                }
            }
        }
    },

    mounted: function () {
        let self = this;
        this.totalFrame = this.frames.length;
        this.frame = this.initFrame;

        switch (this.type) {
            case 'dom':
                for (let i = 0; i < this.$el.children[0].children.length; i++) {
                    this.$el.children[0].children[i].style.setProperty('display', 'none');
                }
                break;
            case 'canvas':
                this.canvas = this.$el.children[0];
                this.canvas.width = this.width;
                this.canvas.height = this.height;
                this.ctx = this.canvas.getContext("2d");
                for (let i = 0; i < this.totalFrame; i++) {
                    let img = new Image();
                    img.src = this.frames[i];
                    this.images.push(img);
                }
                this.images[this.initFrame - 1].onload = function () {
                    if (self.frame === self.initFrame && this.playing !== true) {
                        self.updateFrame(self.initFrame);
                    }
                };

                break;
        }

        self.updateFrame(self.initFrame);

        //  this.updateFrame(this.frame);
        if (this.autoPlay) {
            this.play();
        }
    }

});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_fullscreen_video_vue__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VueFullscreenVideo", function() { return __WEBPACK_IMPORTED_MODULE_0__vue_fullscreen_video_vue__["a"]; });
/**
 * Created by johnny on 2017/12/25.
 */


// Why don't you export default?
// https://github.com/webpack/webpack/issues/3560


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_vue_fullscreen_video_vue__ = __webpack_require__(0);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e280fb94_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_vue_fullscreen_video_vue__ = __webpack_require__(4);
var normalizeComponent = __webpack_require__(3)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_vue_fullscreen_video_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e280fb94_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_vue_fullscreen_video_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.type==='dom')?_c('div',{style:({width:_vm.width+'px',height:_vm.height+'px'})},_vm._l((_vm.frames),function(val,key){return _c('img',{attrs:{"src":val}})})):_vm._e(),_vm._v(" "),(_vm.type==='canvas')?_c('canvas',{style:({width:_vm.width+'px',height:_vm.height+'px'})}):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })
/******/ ]);
});
//# sourceMappingURL=vue-fullscreen-video.js.map