/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/circle.ts":
/*!***********************!*\
  !*** ./src/circle.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/index.ts");
/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shape */ "./src/shape.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var PI2 = Math.PI * 2;
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(position, radius, velocity, angle) {
        var _this = _super.call(this, position) || this;
        _this.radius = radius;
        _this.velocity = {
            x: Math.cos(angle) * velocity.x,
            y: Math.sin(angle) * velocity.y,
        };
        _this.angle = angle;
        return _this;
    }
    Circle.prototype.getVelocity = function () {
        return this.velocity;
    };
    Circle.prototype.setVelocity = function (velocity) {
        this.velocity = velocity;
    };
    Circle.prototype.getPosition = function () {
        return this.position;
    };
    Circle.prototype.setPosition = function (position) {
        this.position = position;
    };
    Circle.prototype.getRadius = function () {
        return this.radius;
    };
    Circle.prototype.collision = function (other) {
        var dx = other.getPosition().x - this.position.x;
        var dy = other.getPosition().y - this.position.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var totalRadius = this.radius + other.getRadius();
        if (dist < totalRadius) {
            var angle = Math.atan2(dy, dx);
            var sin = Math.sin(angle);
            var cos = Math.cos(angle);
            var vx1 = this.velocity.x * cos + this.velocity.y * sin;
            var vy1 = this.velocity.y * cos - this.velocity.x * sin;
            var vx2 = other.getVelocity().x * cos + other.getVelocity().y * sin;
            var vy2 = other.getVelocity().y * cos - other.getVelocity().x * sin;
            this.velocity = {
                x: vx2 * cos - vy1 * sin,
                y: vy1 * cos + vx2 * sin,
            };
            other.setVelocity({
                x: vx1 * cos - vy2 * sin,
                y: vy2 * cos + vx1 * sin,
            });
        }
    };
    Circle.prototype.update = function (delta) {
        var velocity = {
            x: this.velocity.x * delta,
            y: this.velocity.y * delta,
        };
        this.position.x += velocity.x;
        this.position.y += velocity.y;
        this.bounceWindow();
    };
    Circle.prototype.render = function (context) {
        context.fillStyle = 'skyblue';
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, PI2);
        context.fill();
    };
    Circle.prototype.bounceWindow = function () {
        var minX = this.radius;
        var maxX = _index__WEBPACK_IMPORTED_MODULE_0__.CANVAS_WIDTH - this.radius;
        var minY = this.radius;
        var maxY = _index__WEBPACK_IMPORTED_MODULE_0__.CANVAS_HEIGHT - this.radius;
        if (this.position.x <= minX || this.position.x >= maxX) {
            this.velocity.x *= -1;
            this.position.x = this.position.x <= this.radius ? this.radius : maxX;
        }
        if (this.position.y <= minY || this.position.y >= maxY) {
            this.velocity.y *= -1;
            this.position.y = this.position.y <= this.radius ? this.radius : maxY;
        }
    };
    return Circle;
}(_shape__WEBPACK_IMPORTED_MODULE_1__["default"]));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Circle);


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CANVAS_HEIGHT": () => (/* binding */ CANVAS_HEIGHT),
/* harmony export */   "CANVAS_WIDTH": () => (/* binding */ CANVAS_WIDTH)
/* harmony export */ });
/* harmony import */ var _circle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./circle */ "./src/circle.ts");

// OPTIONS
var CANVAS_WIDTH = 1000;
var CANVAS_HEIGHT = 500;
var MAX_BALL_COUNT = 20;
var MIN_BALL_COUNT = 10;
var MAX_BALL_RADIUS = 20;
var MIN_BALL_RADIUS = 10;
var MIN_BALL_SPEED = 200;
var MAX_BALL_SPEED = 400;
var getRandomRangeNumber = function (min, max) {
    return Math.random() * (max - min) + min;
};
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.delta = 0;
        this.circles = [];
        this.createCircle = function () {
            var radius = getRandomRangeNumber(MIN_BALL_RADIUS, MAX_BALL_RADIUS);
            var position = {
                x: getRandomRangeNumber(radius * 2, CANVAS_WIDTH - radius * 2),
                y: getRandomRangeNumber(radius * 2, CANVAS_HEIGHT - radius * 2),
            };
            // 중복위치 방지
            for (var i = 0; i < _this.circles.length; i++) {
                var dx = _this.circles[i].getPosition().x - position.x;
                var dy = _this.circles[i].getPosition().y - position.y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                var totalRadius = _this.circles[i].getRadius() + radius;
                if (dist <= totalRadius) {
                    (position.x = getRandomRangeNumber(radius * 2, CANVAS_WIDTH - radius * 2)),
                        (position.y = getRandomRangeNumber(radius * 2, CANVAS_HEIGHT - radius * 2)),
                        (i = 0);
                }
            }
            var velocity = {
                x: getRandomRangeNumber(MIN_BALL_SPEED, MAX_BALL_SPEED),
                y: getRandomRangeNumber(MIN_BALL_SPEED, MAX_BALL_SPEED),
            };
            var angle = Math.random() * 360;
            _this.circles.push(new _circle__WEBPACK_IMPORTED_MODULE_0__["default"](position, radius, velocity, angle));
        };
        this.circleCollision = function () {
            for (var i = 0; i < _this.circles.length; i++) {
                for (var j = i + 1; j < _this.circles.length; j++) {
                    _this.circles[i].collision(_this.circles[j]);
                }
            }
        };
        this.fixedUpdate = function () {
            _this.frameRequestHandle = window.requestAnimationFrame(_this.fixedUpdate);
            // 델타 타임
            var curTime = Date.now();
            _this.delta = (curTime - _this.startTime) * 0.001;
            _this.startTime = curTime;
            _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            _this.circleCollision();
            _this.circles.forEach(function (circle) {
                circle.update(_this.delta);
                circle.render(_this.ctx);
            });
        };
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        this.startTime = Date.now();
        var ballCount = getRandomRangeNumber(MIN_BALL_COUNT, MAX_BALL_COUNT);
        for (var i = 0; i < ballCount; i++) {
            this.createCircle();
        }
        this.frameRequestHandle = window.requestAnimationFrame(this.fixedUpdate);
        document.body.appendChild(this.canvas);
    }
    return App;
}());
window.onload = function () {
    new App();
};


/***/ }),

/***/ "./src/shape.ts":
/*!**********************!*\
  !*** ./src/shape.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Shape = /** @class */ (function () {
    function Shape(position) {
        this.position = position;
    }
    Shape.prototype.update = function (delta) { };
    Shape.prototype.render = function (context) { };
    return Shape;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Shape);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBc0Q7QUFDMUI7QUFHNUIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDeEI7SUFBb0MsMEJBQUs7SUFLdkMsZ0JBQ0UsUUFBZ0IsRUFDaEIsTUFBYyxFQUNkLFFBQWdCLEVBQ2hCLEtBQWE7UUFKZixZQU1FLGtCQUFNLFFBQVEsQ0FBQyxTQU9oQjtRQU5DLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLEtBQUksQ0FBQyxRQUFRLEdBQUc7WUFDZCxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUMvQixDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQztTQUNoQyxDQUFDO1FBQ0YsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O0lBQ3JCLENBQUM7SUFFRCw0QkFBVyxHQUFYO1FBQ0UsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCw0QkFBVyxHQUFYLFVBQVksUUFBZ0I7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVELDRCQUFXLEdBQVg7UUFDRSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELDRCQUFXLEdBQVgsVUFBWSxRQUFnQjtRQUMxQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBQ0QsMEJBQVMsR0FBVDtRQUNFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQsMEJBQVMsR0FBVCxVQUFVLEtBQWE7UUFDckIsSUFBTSxFQUFFLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNuRCxJQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ25ELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDMUMsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDcEQsSUFBSSxJQUFJLEdBQUcsV0FBVyxFQUFFO1lBQ3RCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pDLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUU1QixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzFELElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFFMUQsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDdEUsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFFdEUsSUFBSSxDQUFDLFFBQVEsR0FBRztnQkFDZCxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRztnQkFDeEIsQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUc7YUFDekIsQ0FBQztZQUNGLEtBQUssQ0FBQyxXQUFXLENBQUM7Z0JBQ2hCLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO2dCQUN4QixDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRzthQUN6QixDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCx1QkFBTSxHQUFOLFVBQU8sS0FBYTtRQUNsQixJQUFNLFFBQVEsR0FBVztZQUN2QixDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsS0FBSztZQUMxQixDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsS0FBSztTQUMzQixDQUFDO1FBRUYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQsdUJBQU0sR0FBTixVQUFPLE9BQWlDO1FBQ3RDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzlCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ25FLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsNkJBQVksR0FBWjtRQUNFLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDekIsSUFBTSxJQUFJLEdBQUcsZ0RBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3hDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDekIsSUFBTSxJQUFJLEdBQUcsaURBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXpDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRTtZQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7U0FDdkU7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDdEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1NBQ3ZFO0lBQ0gsQ0FBQztJQUNILGFBQUM7QUFBRCxDQUFDLENBbEdtQyw4Q0FBSyxHQWtHeEM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZHNkI7QUFJOUIsVUFBVTtBQUNILElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQztBQUMxQixJQUFNLGFBQWEsR0FBRyxHQUFHLENBQUM7QUFDakMsSUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQzFCLElBQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUMxQixJQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7QUFDM0IsSUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBQzNCLElBQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQztBQUMzQixJQUFNLGNBQWMsR0FBRyxHQUFHLENBQUM7QUFFM0IsSUFBTSxvQkFBb0IsR0FBRyxVQUFDLEdBQVcsRUFBRSxHQUFXO0lBQ3BELE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUMzQyxDQUFDLENBQUM7QUFFRjtJQVFFO1FBQUEsaUJBZUM7UUFwQkQsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUdsQixZQUFPLEdBQWtCLEVBQUUsQ0FBQztRQW1CNUIsaUJBQVksR0FBRztZQUNiLElBQU0sTUFBTSxHQUFXLG9CQUFvQixDQUN6QyxlQUFlLEVBQ2YsZUFBZSxDQUNoQixDQUFDO1lBRUYsSUFBTSxRQUFRLEdBQVc7Z0JBQ3ZCLENBQUMsRUFBRSxvQkFBb0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLFlBQVksR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUM5RCxDQUFDLEVBQUUsb0JBQW9CLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxhQUFhLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQzthQUNoRSxDQUFDO1lBRUYsVUFBVTtZQUNWLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDNUMsSUFBTSxFQUFFLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDeEQsSUFBTSxFQUFFLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDeEQsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDMUMsSUFBTSxXQUFXLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRyxNQUFNLENBQUM7Z0JBQ3pELElBQUksSUFBSSxJQUFJLFdBQVcsRUFBRTtvQkFDdkIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLG9CQUFvQixDQUNoQyxNQUFNLEdBQUcsQ0FBQyxFQUNWLFlBQVksR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUMxQixDQUFDO3dCQUNBLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxvQkFBb0IsQ0FDaEMsTUFBTSxHQUFHLENBQUMsRUFDVixhQUFhLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FDM0IsQ0FBQzt3QkFDRixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDWDthQUNGO1lBRUQsSUFBTSxRQUFRLEdBQVc7Z0JBQ3ZCLENBQUMsRUFBRSxvQkFBb0IsQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDO2dCQUN2RCxDQUFDLEVBQUUsb0JBQW9CLENBQUMsY0FBYyxFQUFFLGNBQWMsQ0FBQzthQUN4RCxDQUFDO1lBQ0YsSUFBTSxLQUFLLEdBQVcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBQztZQUMxQyxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLCtDQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUM7UUFFRixvQkFBZSxHQUFHO1lBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDNUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDaEQsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUM1QzthQUNGO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsZ0JBQVcsR0FBRztZQUNaLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxNQUFNLENBQUMscUJBQXFCLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRXpFLFFBQVE7WUFDUixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDM0IsS0FBSSxDQUFDLEtBQUssR0FBRyxDQUFDLE9BQU8sR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ2hELEtBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1lBRXpCLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUVoRSxLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNO2dCQUMxQixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7UUE3RUEsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsWUFBWSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQztRQUVuQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUU1QixJQUFNLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFdkUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckI7UUFDRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6RSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQWdFSCxVQUFDO0FBQUQsQ0FBQztBQUNELE1BQU0sQ0FBQyxNQUFNLEdBQUc7SUFDZCxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ1osQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMxR0Y7SUFHRSxlQUFZLFFBQWdCO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFFRCxzQkFBTSxHQUFOLFVBQU8sS0FBYSxJQUFHLENBQUM7SUFFeEIsc0JBQU0sR0FBTixVQUFPLE9BQWlDLElBQUcsQ0FBQztJQUM5QyxZQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7VUNaRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXIvLi9zcmMvY2lyY2xlLnRzIiwid2VicGFjazovL3dlYXIvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vd2Vhci8uL3NyYy9zaGFwZS50cyIsIndlYnBhY2s6Ly93ZWFyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWFyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2Vhci93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3dlYXIvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3dlYXIvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENBTlZBU19IRUlHSFQsIENBTlZBU19XSURUSCB9IGZyb20gJy4vaW5kZXgnO1xyXG5pbXBvcnQgU2hhcGUgZnJvbSAnLi9zaGFwZSc7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi92ZWN0b3InO1xyXG5cclxuY29uc3QgUEkyID0gTWF0aC5QSSAqIDI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZSBleHRlbmRzIFNoYXBlIHtcclxuICBwcml2YXRlIHJhZGl1czogbnVtYmVyO1xyXG4gIHByaXZhdGUgdmVsb2NpdHk6IFZlY3RvcjtcclxuICBwcml2YXRlIGFuZ2xlOiBudW1iZXI7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcG9zaXRpb246IFZlY3RvcixcclxuICAgIHJhZGl1czogbnVtYmVyLFxyXG4gICAgdmVsb2NpdHk6IFZlY3RvcixcclxuICAgIGFuZ2xlOiBudW1iZXJcclxuICApIHtcclxuICAgIHN1cGVyKHBvc2l0aW9uKTtcclxuICAgIHRoaXMucmFkaXVzID0gcmFkaXVzO1xyXG4gICAgdGhpcy52ZWxvY2l0eSA9IHtcclxuICAgICAgeDogTWF0aC5jb3MoYW5nbGUpICogdmVsb2NpdHkueCxcclxuICAgICAgeTogTWF0aC5zaW4oYW5nbGUpICogdmVsb2NpdHkueSxcclxuICAgIH07XHJcbiAgICB0aGlzLmFuZ2xlID0gYW5nbGU7XHJcbiAgfVxyXG5cclxuICBnZXRWZWxvY2l0eSgpOiBWZWN0b3Ige1xyXG4gICAgcmV0dXJuIHRoaXMudmVsb2NpdHk7XHJcbiAgfVxyXG4gIHNldFZlbG9jaXR5KHZlbG9jaXR5OiBWZWN0b3IpOiB2b2lkIHtcclxuICAgIHRoaXMudmVsb2NpdHkgPSB2ZWxvY2l0eTtcclxuICB9XHJcblxyXG4gIGdldFBvc2l0aW9uKCk6IFZlY3RvciB7XHJcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIHNldFBvc2l0aW9uKHBvc2l0aW9uOiBWZWN0b3IpOiB2b2lkIHtcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICB9XHJcbiAgZ2V0UmFkaXVzKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5yYWRpdXM7XHJcbiAgfVxyXG5cclxuICBjb2xsaXNpb24ob3RoZXI6IENpcmNsZSkge1xyXG4gICAgY29uc3QgZHggPSBvdGhlci5nZXRQb3NpdGlvbigpLnggLSB0aGlzLnBvc2l0aW9uLng7XHJcbiAgICBjb25zdCBkeSA9IG90aGVyLmdldFBvc2l0aW9uKCkueSAtIHRoaXMucG9zaXRpb24ueTtcclxuICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG4gICAgY29uc3QgdG90YWxSYWRpdXMgPSB0aGlzLnJhZGl1cyArIG90aGVyLmdldFJhZGl1cygpO1xyXG4gICAgaWYgKGRpc3QgPCB0b3RhbFJhZGl1cykge1xyXG4gICAgICBjb25zdCBhbmdsZSA9IE1hdGguYXRhbjIoZHksIGR4KTtcclxuICAgICAgY29uc3Qgc2luID0gTWF0aC5zaW4oYW5nbGUpO1xyXG4gICAgICBjb25zdCBjb3MgPSBNYXRoLmNvcyhhbmdsZSk7XHJcblxyXG4gICAgICBjb25zdCB2eDEgPSB0aGlzLnZlbG9jaXR5LnggKiBjb3MgKyB0aGlzLnZlbG9jaXR5LnkgKiBzaW47XHJcbiAgICAgIGNvbnN0IHZ5MSA9IHRoaXMudmVsb2NpdHkueSAqIGNvcyAtIHRoaXMudmVsb2NpdHkueCAqIHNpbjtcclxuXHJcbiAgICAgIGNvbnN0IHZ4MiA9IG90aGVyLmdldFZlbG9jaXR5KCkueCAqIGNvcyArIG90aGVyLmdldFZlbG9jaXR5KCkueSAqIHNpbjtcclxuICAgICAgY29uc3QgdnkyID0gb3RoZXIuZ2V0VmVsb2NpdHkoKS55ICogY29zIC0gb3RoZXIuZ2V0VmVsb2NpdHkoKS54ICogc2luO1xyXG5cclxuICAgICAgdGhpcy52ZWxvY2l0eSA9IHtcclxuICAgICAgICB4OiB2eDIgKiBjb3MgLSB2eTEgKiBzaW4sXHJcbiAgICAgICAgeTogdnkxICogY29zICsgdngyICogc2luLFxyXG4gICAgICB9O1xyXG4gICAgICBvdGhlci5zZXRWZWxvY2l0eSh7XHJcbiAgICAgICAgeDogdngxICogY29zIC0gdnkyICogc2luLFxyXG4gICAgICAgIHk6IHZ5MiAqIGNvcyArIHZ4MSAqIHNpbixcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoZGVsdGE6IG51bWJlcikge1xyXG4gICAgY29uc3QgdmVsb2NpdHk6IFZlY3RvciA9IHtcclxuICAgICAgeDogdGhpcy52ZWxvY2l0eS54ICogZGVsdGEsXHJcbiAgICAgIHk6IHRoaXMudmVsb2NpdHkueSAqIGRlbHRhLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnBvc2l0aW9uLnggKz0gdmVsb2NpdHkueDtcclxuICAgIHRoaXMucG9zaXRpb24ueSArPSB2ZWxvY2l0eS55O1xyXG4gICAgdGhpcy5ib3VuY2VXaW5kb3coKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcihjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3NreWJsdWUnO1xyXG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcclxuICAgIGNvbnRleHQuYXJjKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLnJhZGl1cywgMCwgUEkyKTtcclxuICAgIGNvbnRleHQuZmlsbCgpO1xyXG4gIH1cclxuXHJcbiAgYm91bmNlV2luZG93KCkge1xyXG4gICAgY29uc3QgbWluWCA9IHRoaXMucmFkaXVzO1xyXG4gICAgY29uc3QgbWF4WCA9IENBTlZBU19XSURUSCAtIHRoaXMucmFkaXVzO1xyXG4gICAgY29uc3QgbWluWSA9IHRoaXMucmFkaXVzO1xyXG4gICAgY29uc3QgbWF4WSA9IENBTlZBU19IRUlHSFQgLSB0aGlzLnJhZGl1cztcclxuXHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbi54IDw9IG1pblggfHwgdGhpcy5wb3NpdGlvbi54ID49IG1heFgpIHtcclxuICAgICAgdGhpcy52ZWxvY2l0eS54ICo9IC0xO1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLnggPSB0aGlzLnBvc2l0aW9uLnggPD0gdGhpcy5yYWRpdXMgPyB0aGlzLnJhZGl1cyA6IG1heFg7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5wb3NpdGlvbi55IDw9IG1pblkgfHwgdGhpcy5wb3NpdGlvbi55ID49IG1heFkpIHtcclxuICAgICAgdGhpcy52ZWxvY2l0eS55ICo9IC0xO1xyXG4gICAgICB0aGlzLnBvc2l0aW9uLnkgPSB0aGlzLnBvc2l0aW9uLnkgPD0gdGhpcy5yYWRpdXMgPyB0aGlzLnJhZGl1cyA6IG1heFk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBDaXJjbGUgZnJvbSAnLi9jaXJjbGUnO1xyXG5pbXBvcnQgU2hhcGUgZnJvbSAnLi9zaGFwZSc7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi92ZWN0b3InO1xyXG5cclxuLy8gT1BUSU9OU1xyXG5leHBvcnQgY29uc3QgQ0FOVkFTX1dJRFRIID0gMTAwMDtcclxuZXhwb3J0IGNvbnN0IENBTlZBU19IRUlHSFQgPSA1MDA7XHJcbmNvbnN0IE1BWF9CQUxMX0NPVU5UID0gMjA7XHJcbmNvbnN0IE1JTl9CQUxMX0NPVU5UID0gMTA7XHJcbmNvbnN0IE1BWF9CQUxMX1JBRElVUyA9IDIwO1xyXG5jb25zdCBNSU5fQkFMTF9SQURJVVMgPSAxMDtcclxuY29uc3QgTUlOX0JBTExfU1BFRUQgPSAyMDA7XHJcbmNvbnN0IE1BWF9CQUxMX1NQRUVEID0gNDAwO1xyXG5cclxuY29uc3QgZ2V0UmFuZG9tUmFuZ2VOdW1iZXIgPSAobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyID0+IHtcclxuICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xyXG59O1xyXG5cclxuY2xhc3MgQXBwIHtcclxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gIGRlbHRhOiBudW1iZXIgPSAwO1xyXG4gIHN0YXJ0VGltZTogbnVtYmVyO1xyXG4gIGZyYW1lUmVxdWVzdEhhbmRsZTogbnVtYmVyO1xyXG4gIGNpcmNsZXM6IEFycmF5PENpcmNsZT4gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpITtcclxuICAgIHRoaXMuY2FudmFzLndpZHRoID0gQ0FOVkFTX1dJRFRIO1xyXG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gQ0FOVkFTX0hFSUdIVDtcclxuXHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IERhdGUubm93KCk7XHJcblxyXG4gICAgY29uc3QgYmFsbENvdW50ID0gZ2V0UmFuZG9tUmFuZ2VOdW1iZXIoTUlOX0JBTExfQ09VTlQsIE1BWF9CQUxMX0NPVU5UKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJhbGxDb3VudDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuY3JlYXRlQ2lyY2xlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmZyYW1lUmVxdWVzdEhhbmRsZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5maXhlZFVwZGF0ZSk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUNpcmNsZSA9ICgpID0+IHtcclxuICAgIGNvbnN0IHJhZGl1czogbnVtYmVyID0gZ2V0UmFuZG9tUmFuZ2VOdW1iZXIoXHJcbiAgICAgIE1JTl9CQUxMX1JBRElVUyxcclxuICAgICAgTUFYX0JBTExfUkFESVVTXHJcbiAgICApO1xyXG5cclxuICAgIGNvbnN0IHBvc2l0aW9uOiBWZWN0b3IgPSB7XHJcbiAgICAgIHg6IGdldFJhbmRvbVJhbmdlTnVtYmVyKHJhZGl1cyAqIDIsIENBTlZBU19XSURUSCAtIHJhZGl1cyAqIDIpLFxyXG4gICAgICB5OiBnZXRSYW5kb21SYW5nZU51bWJlcihyYWRpdXMgKiAyLCBDQU5WQVNfSEVJR0hUIC0gcmFkaXVzICogMiksXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIOykkeuzteychOy5mCDrsKnsp4BcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jaXJjbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGR4ID0gdGhpcy5jaXJjbGVzW2ldLmdldFBvc2l0aW9uKCkueCAtIHBvc2l0aW9uLng7XHJcbiAgICAgIGNvbnN0IGR5ID0gdGhpcy5jaXJjbGVzW2ldLmdldFBvc2l0aW9uKCkueSAtIHBvc2l0aW9uLnk7XHJcbiAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG4gICAgICBjb25zdCB0b3RhbFJhZGl1cyA9IHRoaXMuY2lyY2xlc1tpXS5nZXRSYWRpdXMoKSArIHJhZGl1cztcclxuICAgICAgaWYgKGRpc3QgPD0gdG90YWxSYWRpdXMpIHtcclxuICAgICAgICAocG9zaXRpb24ueCA9IGdldFJhbmRvbVJhbmdlTnVtYmVyKFxyXG4gICAgICAgICAgcmFkaXVzICogMixcclxuICAgICAgICAgIENBTlZBU19XSURUSCAtIHJhZGl1cyAqIDJcclxuICAgICAgICApKSxcclxuICAgICAgICAgIChwb3NpdGlvbi55ID0gZ2V0UmFuZG9tUmFuZ2VOdW1iZXIoXHJcbiAgICAgICAgICAgIHJhZGl1cyAqIDIsXHJcbiAgICAgICAgICAgIENBTlZBU19IRUlHSFQgLSByYWRpdXMgKiAyXHJcbiAgICAgICAgICApKSxcclxuICAgICAgICAgIChpID0gMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB2ZWxvY2l0eTogVmVjdG9yID0ge1xyXG4gICAgICB4OiBnZXRSYW5kb21SYW5nZU51bWJlcihNSU5fQkFMTF9TUEVFRCwgTUFYX0JBTExfU1BFRUQpLFxyXG4gICAgICB5OiBnZXRSYW5kb21SYW5nZU51bWJlcihNSU5fQkFMTF9TUEVFRCwgTUFYX0JBTExfU1BFRUQpLFxyXG4gICAgfTtcclxuICAgIGNvbnN0IGFuZ2xlOiBudW1iZXIgPSBNYXRoLnJhbmRvbSgpICogMzYwO1xyXG4gICAgdGhpcy5jaXJjbGVzLnB1c2gobmV3IENpcmNsZShwb3NpdGlvbiwgcmFkaXVzLCB2ZWxvY2l0eSwgYW5nbGUpKTtcclxuICB9O1xyXG5cclxuICBjaXJjbGVDb2xsaXNpb24gPSAoKSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2lyY2xlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBmb3IgKGxldCBqID0gaSArIDE7IGogPCB0aGlzLmNpcmNsZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICB0aGlzLmNpcmNsZXNbaV0uY29sbGlzaW9uKHRoaXMuY2lyY2xlc1tqXSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICBmaXhlZFVwZGF0ZSA9ICgpID0+IHtcclxuICAgIHRoaXMuZnJhbWVSZXF1ZXN0SGFuZGxlID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmZpeGVkVXBkYXRlKTtcclxuXHJcbiAgICAvLyDrjbjtg4Ag7YOA7J6EXHJcbiAgICBjb25zdCBjdXJUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIHRoaXMuZGVsdGEgPSAoY3VyVGltZSAtIHRoaXMuc3RhcnRUaW1lKSAqIDAuMDAxO1xyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBjdXJUaW1lO1xyXG5cclxuICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuXHJcbiAgICB0aGlzLmNpcmNsZUNvbGxpc2lvbigpO1xyXG4gICAgdGhpcy5jaXJjbGVzLmZvckVhY2goKGNpcmNsZSkgPT4ge1xyXG4gICAgICBjaXJjbGUudXBkYXRlKHRoaXMuZGVsdGEpO1xyXG4gICAgICBjaXJjbGUucmVuZGVyKHRoaXMuY3R4KTtcclxuICAgIH0pO1xyXG4gIH07XHJcbn1cclxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcclxuICBuZXcgQXBwKCk7XHJcbn07XHJcbiIsImltcG9ydCBWZWN0b3IgZnJvbSAnLi92ZWN0b3InO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhcGUge1xyXG4gIHBvc2l0aW9uOiBWZWN0b3I7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBWZWN0b3IpIHtcclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICB9XHJcblxyXG4gIHVwZGF0ZShkZWx0YTogbnVtYmVyKSB7fVxyXG5cclxuICByZW5kZXIoY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7fVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=