// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function(modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire
  var nodeRequire = typeof require === 'function' && require

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire
        if (!jumped && currentRequire) {
          return currentRequire(name, true)
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true)
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name)
        }

        var err = new Error("Cannot find module '" + name + "'")
        err.code = 'MODULE_NOT_FOUND'
        throw err
      }

      localRequire.resolve = resolve
      localRequire.cache = {}

      var module = (cache[name] = new newRequire.Module(name))

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      )
    }

    return cache[name].exports

    function localRequire(x) {
      return newRequire(localRequire.resolve(x))
    }

    function resolve(x) {
      return modules[name][1][x] || x
    }
  }

  function Module(moduleName) {
    this.id = moduleName
    this.bundle = newRequire
    this.exports = {}
  }

  newRequire.isParcelRequire = true
  newRequire.Module = Module
  newRequire.modules = modules
  newRequire.cache = cache
  newRequire.parent = previousRequire
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports
      },
      {},
    ]
  }

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i])
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1])

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports
      })

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports
    }
  }

  // Override the current require with this new one
  return newRequire
})(
  {
    '../../../node_modules/@protobufjs/aspromise/index.js': [
      function(require, module, exports) {
        'use strict'
        module.exports = asPromise

        /**
         * Callback as used by {@link util.asPromise}.
         * @typedef asPromiseCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {...*} params Additional arguments
         * @returns {undefined}
         */

        /**
         * Returns a promise from a node-style callback function.
         * @memberof util
         * @param {asPromiseCallback} fn Function to call
         * @param {*} ctx Function context
         * @param {...*} params Function arguments
         * @returns {Promise<*>} Promisified function
         */
        function asPromise(fn, ctx /*, varargs */) {
          var params = new Array(arguments.length - 1),
            offset = 0,
            index = 2,
            pending = true
          while (index < arguments.length) params[offset++] = arguments[index++]
          return new Promise(function executor(resolve, reject) {
            params[offset] = function callback(err /*, varargs */) {
              if (pending) {
                pending = false
                if (err) reject(err)
                else {
                  var params = new Array(arguments.length - 1),
                    offset = 0
                  while (offset < params.length)
                    params[offset++] = arguments[offset]
                  resolve.apply(null, params)
                }
              }
            }
            try {
              fn.apply(ctx || null, params)
            } catch (err) {
              if (pending) {
                pending = false
                reject(err)
              }
            }
          })
        }
      },
      {},
    ],
    '../../../node_modules/@protobufjs/base64/index.js': [
      function(require, module, exports) {
        'use strict'

        /**
         * A minimal base64 implementation for number arrays.
         * @memberof util
         * @namespace
         */
        var base64 = exports

        /**
         * Calculates the byte length of a base64 encoded string.
         * @param {string} string Base64 encoded string
         * @returns {number} Byte length
         */
        base64.length = function length(string) {
          var p = string.length
          if (!p) return 0
          var n = 0
          while (--p % 4 > 1 && string.charAt(p) === '=') ++n
          return Math.ceil(string.length * 3) / 4 - n
        }

        // Base64 encoding table
        var b64 = new Array(64)

        // Base64 decoding table
        var s64 = new Array(123)

        // 65..90, 97..122, 48..57, 43, 47
        for (var i = 0; i < 64; )
          s64[
            (b64[i] =
              i < 26
                ? i + 65
                : i < 52
                  ? i + 71
                  : i < 62
                    ? i - 4
                    : (i - 59) | 43)
          ] = i++

        /**
         * Encodes a buffer to a base64 encoded string.
         * @param {Uint8Array} buffer Source buffer
         * @param {number} start Source start
         * @param {number} end Source end
         * @returns {string} Base64 encoded string
         */
        base64.encode = function encode(buffer, start, end) {
          var parts = null,
            chunk = []
          var i = 0, // output index
            j = 0, // goto index
            t // temporary
          while (start < end) {
            var b = buffer[start++]
            switch (j) {
              case 0:
                chunk[i++] = b64[b >> 2]
                t = (b & 3) << 4
                j = 1
                break
              case 1:
                chunk[i++] = b64[t | (b >> 4)]
                t = (b & 15) << 2
                j = 2
                break
              case 2:
                chunk[i++] = b64[t | (b >> 6)]
                chunk[i++] = b64[b & 63]
                j = 0
                break
            }
            if (i > 8191) {
              ;(parts || (parts = [])).push(
                String.fromCharCode.apply(String, chunk)
              )
              i = 0
            }
          }
          if (j) {
            chunk[i++] = b64[t]
            chunk[i++] = 61
            if (j === 1) chunk[i++] = 61
          }
          if (parts) {
            if (i)
              parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)))
            return parts.join('')
          }
          return String.fromCharCode.apply(String, chunk.slice(0, i))
        }

        var invalidEncoding = 'invalid encoding'

        /**
         * Decodes a base64 encoded string to a buffer.
         * @param {string} string Source string
         * @param {Uint8Array} buffer Destination buffer
         * @param {number} offset Destination offset
         * @returns {number} Number of bytes written
         * @throws {Error} If encoding is invalid
         */
        base64.decode = function decode(string, buffer, offset) {
          var start = offset
          var j = 0, // goto index
            t // temporary
          for (var i = 0; i < string.length; ) {
            var c = string.charCodeAt(i++)
            if (c === 61 && j > 1) break
            if ((c = s64[c]) === undefined) throw Error(invalidEncoding)
            switch (j) {
              case 0:
                t = c
                j = 1
                break
              case 1:
                buffer[offset++] = (t << 2) | ((c & 48) >> 4)
                t = c
                j = 2
                break
              case 2:
                buffer[offset++] = ((t & 15) << 4) | ((c & 60) >> 2)
                t = c
                j = 3
                break
              case 3:
                buffer[offset++] = ((t & 3) << 6) | c
                j = 0
                break
            }
          }
          if (j === 1) throw Error(invalidEncoding)
          return offset - start
        }

        /**
         * Tests if the specified string appears to be base64 encoded.
         * @param {string} string String to test
         * @returns {boolean} `true` if probably base64 encoded, otherwise false
         */
        base64.test = function test(string) {
          return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
            string
          )
        }
      },
      {},
    ],
    '../../../node_modules/@protobufjs/eventemitter/index.js': [
      function(require, module, exports) {
        'use strict'
        module.exports = EventEmitter

        /**
         * Constructs a new event emitter instance.
         * @classdesc A minimal event emitter.
         * @memberof util
         * @constructor
         */
        function EventEmitter() {
          /**
           * Registered listeners.
           * @type {Object.<string,*>}
           * @private
           */
          this._listeners = {}
        }

        /**
         * Registers an event listener.
         * @param {string} evt Event name
         * @param {function} fn Listener
         * @param {*} [ctx] Listener context
         * @returns {util.EventEmitter} `this`
         */
        EventEmitter.prototype.on = function on(evt, fn, ctx) {
          ;(this._listeners[evt] || (this._listeners[evt] = [])).push({
            fn: fn,
            ctx: ctx || this,
          })
          return this
        }

        /**
         * Removes an event listener or any matching listeners if arguments are omitted.
         * @param {string} [evt] Event name. Removes all listeners if omitted.
         * @param {function} [fn] Listener to remove. Removes all listeners of `evt` if omitted.
         * @returns {util.EventEmitter} `this`
         */
        EventEmitter.prototype.off = function off(evt, fn) {
          if (evt === undefined) this._listeners = {}
          else {
            if (fn === undefined) this._listeners[evt] = []
            else {
              var listeners = this._listeners[evt]
              for (var i = 0; i < listeners.length; )
                if (listeners[i].fn === fn) listeners.splice(i, 1)
                else ++i
            }
          }
          return this
        }

        /**
         * Emits an event by calling its listeners with the specified arguments.
         * @param {string} evt Event name
         * @param {...*} args Arguments
         * @returns {util.EventEmitter} `this`
         */
        EventEmitter.prototype.emit = function emit(evt) {
          var listeners = this._listeners[evt]
          if (listeners) {
            var args = [],
              i = 1
            for (; i < arguments.length; ) args.push(arguments[i++])
            for (i = 0; i < listeners.length; )
              listeners[i].fn.apply(listeners[i++].ctx, args)
          }
          return this
        }
      },
      {},
    ],
    '../../../node_modules/@protobufjs/float/index.js': [
      function(require, module, exports) {
        'use strict'

        module.exports = factory(factory)

        /**
         * Reads / writes floats / doubles from / to buffers.
         * @name util.float
         * @namespace
         */

        /**
         * Writes a 32 bit float to a buffer using little endian byte order.
         * @name util.float.writeFloatLE
         * @function
         * @param {number} val Value to write
         * @param {Uint8Array} buf Target buffer
         * @param {number} pos Target buffer offset
         * @returns {undefined}
         */

        /**
         * Writes a 32 bit float to a buffer using big endian byte order.
         * @name util.float.writeFloatBE
         * @function
         * @param {number} val Value to write
         * @param {Uint8Array} buf Target buffer
         * @param {number} pos Target buffer offset
         * @returns {undefined}
         */

        /**
         * Reads a 32 bit float from a buffer using little endian byte order.
         * @name util.float.readFloatLE
         * @function
         * @param {Uint8Array} buf Source buffer
         * @param {number} pos Source buffer offset
         * @returns {number} Value read
         */

        /**
         * Reads a 32 bit float from a buffer using big endian byte order.
         * @name util.float.readFloatBE
         * @function
         * @param {Uint8Array} buf Source buffer
         * @param {number} pos Source buffer offset
         * @returns {number} Value read
         */

        /**
         * Writes a 64 bit double to a buffer using little endian byte order.
         * @name util.float.writeDoubleLE
         * @function
         * @param {number} val Value to write
         * @param {Uint8Array} buf Target buffer
         * @param {number} pos Target buffer offset
         * @returns {undefined}
         */

        /**
         * Writes a 64 bit double to a buffer using big endian byte order.
         * @name util.float.writeDoubleBE
         * @function
         * @param {number} val Value to write
         * @param {Uint8Array} buf Target buffer
         * @param {number} pos Target buffer offset
         * @returns {undefined}
         */

        /**
         * Reads a 64 bit double from a buffer using little endian byte order.
         * @name util.float.readDoubleLE
         * @function
         * @param {Uint8Array} buf Source buffer
         * @param {number} pos Source buffer offset
         * @returns {number} Value read
         */

        /**
         * Reads a 64 bit double from a buffer using big endian byte order.
         * @name util.float.readDoubleBE
         * @function
         * @param {Uint8Array} buf Source buffer
         * @param {number} pos Source buffer offset
         * @returns {number} Value read
         */

        // Factory function for the purpose of node-based testing in modified global environments
        function factory(exports) {
          // float: typed array
          if (typeof Float32Array !== 'undefined')
            (function() {
              var f32 = new Float32Array([-0]),
                f8b = new Uint8Array(f32.buffer),
                le = f8b[3] === 128

              function writeFloat_f32_cpy(val, buf, pos) {
                f32[0] = val
                buf[pos] = f8b[0]
                buf[pos + 1] = f8b[1]
                buf[pos + 2] = f8b[2]
                buf[pos + 3] = f8b[3]
              }

              function writeFloat_f32_rev(val, buf, pos) {
                f32[0] = val
                buf[pos] = f8b[3]
                buf[pos + 1] = f8b[2]
                buf[pos + 2] = f8b[1]
                buf[pos + 3] = f8b[0]
              }

              /* istanbul ignore next */
              exports.writeFloatLE = le
                ? writeFloat_f32_cpy
                : writeFloat_f32_rev
              /* istanbul ignore next */
              exports.writeFloatBE = le
                ? writeFloat_f32_rev
                : writeFloat_f32_cpy

              function readFloat_f32_cpy(buf, pos) {
                f8b[0] = buf[pos]
                f8b[1] = buf[pos + 1]
                f8b[2] = buf[pos + 2]
                f8b[3] = buf[pos + 3]
                return f32[0]
              }

              function readFloat_f32_rev(buf, pos) {
                f8b[3] = buf[pos]
                f8b[2] = buf[pos + 1]
                f8b[1] = buf[pos + 2]
                f8b[0] = buf[pos + 3]
                return f32[0]
              }

              /* istanbul ignore next */
              exports.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev
              /* istanbul ignore next */
              exports.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy

              // float: ieee754
            })()
          else
            (function() {
              function writeFloat_ieee754(writeUint, val, buf, pos) {
                var sign = val < 0 ? 1 : 0
                if (sign) val = -val
                if (val === 0)
                  writeUint(
                    1 / val > 0
                      ? /* positive */ 0
                      : /* negative 0 */ 2147483648,
                    buf,
                    pos
                  )
                else if (isNaN(val)) writeUint(2143289344, buf, pos)
                else if (val > 3.4028234663852886e38)
                  // +-Infinity
                  writeUint(((sign << 31) | 2139095040) >>> 0, buf, pos)
                else if (val < 1.1754943508222875e-38)
                  // denormal
                  writeUint(
                    ((sign << 31) | Math.round(val / 1.401298464324817e-45)) >>>
                      0,
                    buf,
                    pos
                  )
                else {
                  var exponent = Math.floor(Math.log(val) / Math.LN2),
                    mantissa =
                      Math.round(val * Math.pow(2, -exponent) * 8388608) &
                      8388607
                  writeUint(
                    ((sign << 31) | ((exponent + 127) << 23) | mantissa) >>> 0,
                    buf,
                    pos
                  )
                }
              }

              exports.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE)
              exports.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE)

              function readFloat_ieee754(readUint, buf, pos) {
                var uint = readUint(buf, pos),
                  sign = (uint >> 31) * 2 + 1,
                  exponent = (uint >>> 23) & 255,
                  mantissa = uint & 8388607
                return exponent === 255
                  ? mantissa
                    ? NaN
                    : sign * Infinity
                  : exponent === 0 // denormal
                    ? sign * 1.401298464324817e-45 * mantissa
                    : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608)
              }

              exports.readFloatLE = readFloat_ieee754.bind(null, readUintLE)
              exports.readFloatBE = readFloat_ieee754.bind(null, readUintBE)
            })()

          // double: typed array
          if (typeof Float64Array !== 'undefined')
            (function() {
              var f64 = new Float64Array([-0]),
                f8b = new Uint8Array(f64.buffer),
                le = f8b[7] === 128

              function writeDouble_f64_cpy(val, buf, pos) {
                f64[0] = val
                buf[pos] = f8b[0]
                buf[pos + 1] = f8b[1]
                buf[pos + 2] = f8b[2]
                buf[pos + 3] = f8b[3]
                buf[pos + 4] = f8b[4]
                buf[pos + 5] = f8b[5]
                buf[pos + 6] = f8b[6]
                buf[pos + 7] = f8b[7]
              }

              function writeDouble_f64_rev(val, buf, pos) {
                f64[0] = val
                buf[pos] = f8b[7]
                buf[pos + 1] = f8b[6]
                buf[pos + 2] = f8b[5]
                buf[pos + 3] = f8b[4]
                buf[pos + 4] = f8b[3]
                buf[pos + 5] = f8b[2]
                buf[pos + 6] = f8b[1]
                buf[pos + 7] = f8b[0]
              }

              /* istanbul ignore next */
              exports.writeDoubleLE = le
                ? writeDouble_f64_cpy
                : writeDouble_f64_rev
              /* istanbul ignore next */
              exports.writeDoubleBE = le
                ? writeDouble_f64_rev
                : writeDouble_f64_cpy

              function readDouble_f64_cpy(buf, pos) {
                f8b[0] = buf[pos]
                f8b[1] = buf[pos + 1]
                f8b[2] = buf[pos + 2]
                f8b[3] = buf[pos + 3]
                f8b[4] = buf[pos + 4]
                f8b[5] = buf[pos + 5]
                f8b[6] = buf[pos + 6]
                f8b[7] = buf[pos + 7]
                return f64[0]
              }

              function readDouble_f64_rev(buf, pos) {
                f8b[7] = buf[pos]
                f8b[6] = buf[pos + 1]
                f8b[5] = buf[pos + 2]
                f8b[4] = buf[pos + 3]
                f8b[3] = buf[pos + 4]
                f8b[2] = buf[pos + 5]
                f8b[1] = buf[pos + 6]
                f8b[0] = buf[pos + 7]
                return f64[0]
              }

              /* istanbul ignore next */
              exports.readDoubleLE = le
                ? readDouble_f64_cpy
                : readDouble_f64_rev
              /* istanbul ignore next */
              exports.readDoubleBE = le
                ? readDouble_f64_rev
                : readDouble_f64_cpy

              // double: ieee754
            })()
          else
            (function() {
              function writeDouble_ieee754(
                writeUint,
                off0,
                off1,
                val,
                buf,
                pos
              ) {
                var sign = val < 0 ? 1 : 0
                if (sign) val = -val
                if (val === 0) {
                  writeUint(0, buf, pos + off0)
                  writeUint(
                    1 / val > 0
                      ? /* positive */ 0
                      : /* negative 0 */ 2147483648,
                    buf,
                    pos + off1
                  )
                } else if (isNaN(val)) {
                  writeUint(0, buf, pos + off0)
                  writeUint(2146959360, buf, pos + off1)
                } else if (val > 1.7976931348623157e308) {
                  // +-Infinity
                  writeUint(0, buf, pos + off0)
                  writeUint(((sign << 31) | 2146435072) >>> 0, buf, pos + off1)
                } else {
                  var mantissa
                  if (val < 2.2250738585072014e-308) {
                    // denormal
                    mantissa = val / 5e-324
                    writeUint(mantissa >>> 0, buf, pos + off0)
                    writeUint(
                      ((sign << 31) | (mantissa / 4294967296)) >>> 0,
                      buf,
                      pos + off1
                    )
                  } else {
                    var exponent = Math.floor(Math.log(val) / Math.LN2)
                    if (exponent === 1024) exponent = 1023
                    mantissa = val * Math.pow(2, -exponent)
                    writeUint(
                      (mantissa * 4503599627370496) >>> 0,
                      buf,
                      pos + off0
                    )
                    writeUint(
                      ((sign << 31) |
                        ((exponent + 1023) << 20) |
                        ((mantissa * 1048576) & 1048575)) >>>
                        0,
                      buf,
                      pos + off1
                    )
                  }
                }
              }

              exports.writeDoubleLE = writeDouble_ieee754.bind(
                null,
                writeUintLE,
                0,
                4
              )
              exports.writeDoubleBE = writeDouble_ieee754.bind(
                null,
                writeUintBE,
                4,
                0
              )

              function readDouble_ieee754(readUint, off0, off1, buf, pos) {
                var lo = readUint(buf, pos + off0),
                  hi = readUint(buf, pos + off1)
                var sign = (hi >> 31) * 2 + 1,
                  exponent = (hi >>> 20) & 2047,
                  mantissa = 4294967296 * (hi & 1048575) + lo
                return exponent === 2047
                  ? mantissa
                    ? NaN
                    : sign * Infinity
                  : exponent === 0 // denormal
                    ? sign * 5e-324 * mantissa
                    : sign *
                      Math.pow(2, exponent - 1075) *
                      (mantissa + 4503599627370496)
              }

              exports.readDoubleLE = readDouble_ieee754.bind(
                null,
                readUintLE,
                0,
                4
              )
              exports.readDoubleBE = readDouble_ieee754.bind(
                null,
                readUintBE,
                4,
                0
              )
            })()

          return exports
        }

        // uint helpers

        function writeUintLE(val, buf, pos) {
          buf[pos] = val & 255
          buf[pos + 1] = (val >>> 8) & 255
          buf[pos + 2] = (val >>> 16) & 255
          buf[pos + 3] = val >>> 24
        }

        function writeUintBE(val, buf, pos) {
          buf[pos] = val >>> 24
          buf[pos + 1] = (val >>> 16) & 255
          buf[pos + 2] = (val >>> 8) & 255
          buf[pos + 3] = val & 255
        }

        function readUintLE(buf, pos) {
          return (
            (buf[pos] |
              (buf[pos + 1] << 8) |
              (buf[pos + 2] << 16) |
              (buf[pos + 3] << 24)) >>>
            0
          )
        }

        function readUintBE(buf, pos) {
          return (
            ((buf[pos] << 24) |
              (buf[pos + 1] << 16) |
              (buf[pos + 2] << 8) |
              buf[pos + 3]) >>>
            0
          )
        }
      },
      {},
    ],
    '../../../node_modules/@protobufjs/inquire/index.js': [
      function(require, module, exports) {
        'use strict'
        module.exports = inquire

        /**
         * Requires a module only if available.
         * @memberof util
         * @param {string} moduleName Module to require
         * @returns {?Object} Required module if available and not empty, otherwise `null`
         */
        function inquire(moduleName) {
          try {
            var mod = eval('quire'.replace(/^/, 're'))(moduleName) // eslint-disable-line no-eval
            if (mod && (mod.length || Object.keys(mod).length)) return mod
          } catch (e) {} // eslint-disable-line no-empty
          return null
        }
      },
      {},
    ],
    '../../../node_modules/@protobufjs/utf8/index.js': [
      function(require, module, exports) {
        'use strict'

        /**
         * A minimal UTF8 implementation for number arrays.
         * @memberof util
         * @namespace
         */
        var utf8 = exports

        /**
         * Calculates the UTF8 byte length of a string.
         * @param {string} string String
         * @returns {number} Byte length
         */
        utf8.length = function utf8_length(string) {
          var len = 0,
            c = 0
          for (var i = 0; i < string.length; ++i) {
            c = string.charCodeAt(i)
            if (c < 128) len += 1
            else if (c < 2048) len += 2
            else if (
              (c & 0xfc00) === 0xd800 &&
              (string.charCodeAt(i + 1) & 0xfc00) === 0xdc00
            ) {
              ++i
              len += 4
            } else len += 3
          }
          return len
        }

        /**
         * Reads UTF8 bytes as a string.
         * @param {Uint8Array} buffer Source buffer
         * @param {number} start Source start
         * @param {number} end Source end
         * @returns {string} String read
         */
        utf8.read = function utf8_read(buffer, start, end) {
          var len = end - start
          if (len < 1) return ''
          var parts = null,
            chunk = [],
            i = 0, // char offset
            t // temporary
          while (start < end) {
            t = buffer[start++]
            if (t < 128) chunk[i++] = t
            else if (t > 191 && t < 224)
              chunk[i++] = ((t & 31) << 6) | (buffer[start++] & 63)
            else if (t > 239 && t < 365) {
              t =
                (((t & 7) << 18) |
                  ((buffer[start++] & 63) << 12) |
                  ((buffer[start++] & 63) << 6) |
                  (buffer[start++] & 63)) -
                0x10000
              chunk[i++] = 0xd800 + (t >> 10)
              chunk[i++] = 0xdc00 + (t & 1023)
            } else
              chunk[i++] =
                ((t & 15) << 12) |
                ((buffer[start++] & 63) << 6) |
                (buffer[start++] & 63)
            if (i > 8191) {
              ;(parts || (parts = [])).push(
                String.fromCharCode.apply(String, chunk)
              )
              i = 0
            }
          }
          if (parts) {
            if (i)
              parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)))
            return parts.join('')
          }
          return String.fromCharCode.apply(String, chunk.slice(0, i))
        }

        /**
         * Writes a string as UTF8 bytes.
         * @param {string} string Source string
         * @param {Uint8Array} buffer Destination buffer
         * @param {number} offset Destination offset
         * @returns {number} Bytes written
         */
        utf8.write = function utf8_write(string, buffer, offset) {
          var start = offset,
            c1, // character 1
            c2 // character 2
          for (var i = 0; i < string.length; ++i) {
            c1 = string.charCodeAt(i)
            if (c1 < 128) {
              buffer[offset++] = c1
            } else if (c1 < 2048) {
              buffer[offset++] = (c1 >> 6) | 192
              buffer[offset++] = (c1 & 63) | 128
            } else if (
              (c1 & 0xfc00) === 0xd800 &&
              ((c2 = string.charCodeAt(i + 1)) & 0xfc00) === 0xdc00
            ) {
              c1 = 0x10000 + ((c1 & 0x03ff) << 10) + (c2 & 0x03ff)
              ++i
              buffer[offset++] = (c1 >> 18) | 240
              buffer[offset++] = ((c1 >> 12) & 63) | 128
              buffer[offset++] = ((c1 >> 6) & 63) | 128
              buffer[offset++] = (c1 & 63) | 128
            } else {
              buffer[offset++] = (c1 >> 12) | 224
              buffer[offset++] = ((c1 >> 6) & 63) | 128
              buffer[offset++] = (c1 & 63) | 128
            }
          }
          return offset - start
        }
      },
      {},
    ],
    '../../../node_modules/@protobufjs/pool/index.js': [
      function(require, module, exports) {
        'use strict'
        module.exports = pool

        /**
         * An allocator as used by {@link util.pool}.
         * @typedef PoolAllocator
         * @type {function}
         * @param {number} size Buffer size
         * @returns {Uint8Array} Buffer
         */

        /**
         * A slicer as used by {@link util.pool}.
         * @typedef PoolSlicer
         * @type {function}
         * @param {number} start Start offset
         * @param {number} end End offset
         * @returns {Uint8Array} Buffer slice
         * @this {Uint8Array}
         */

        /**
         * A general purpose buffer pool.
         * @memberof util
         * @function
         * @param {PoolAllocator} alloc Allocator
         * @param {PoolSlicer} slice Slicer
         * @param {number} [size=8192] Slab size
         * @returns {PoolAllocator} Pooled allocator
         */
        function pool(alloc, slice, size) {
          var SIZE = size || 8192
          var MAX = SIZE >>> 1
          var slab = null
          var offset = SIZE
          return function pool_alloc(size) {
            if (size < 1 || size > MAX) return alloc(size)
            if (offset + size > SIZE) {
              slab = alloc(SIZE)
              offset = 0
            }
            var buf = slice.call(slab, offset, (offset += size))
            if (offset & 7)
              // align to 32 bit
              offset = (offset | 7) + 1
            return buf
          }
        }
      },
      {},
    ],
    '../../../node_modules/protobufjs/src/util/longbits.js': [
      function(require, module, exports) {
        'use strict'
        module.exports = LongBits

        var util = require('../util/minimal')

        /**
         * Constructs new long bits.
         * @classdesc Helper class for working with the low and high bits of a 64 bit value.
         * @memberof util
         * @constructor
         * @param {number} lo Low 32 bits, unsigned
         * @param {number} hi High 32 bits, unsigned
         */
        function LongBits(lo, hi) {
          // note that the casts below are theoretically unnecessary as of today, but older statically
          // generated converter code might still call the ctor with signed 32bits. kept for compat.

          /**
           * Low bits.
           * @type {number}
           */
          this.lo = lo >>> 0

          /**
           * High bits.
           * @type {number}
           */
          this.hi = hi >>> 0
        }

        /**
         * Zero bits.
         * @memberof util.LongBits
         * @type {util.LongBits}
         */
        var zero = (LongBits.zero = new LongBits(0, 0))

        zero.toNumber = function() {
          return 0
        }
        zero.zzEncode = zero.zzDecode = function() {
          return this
        }
        zero.length = function() {
          return 1
        }

        /**
         * Zero hash.
         * @memberof util.LongBits
         * @type {string}
         */
        var zeroHash = (LongBits.zeroHash = '\0\0\0\0\0\0\0\0')

        /**
         * Constructs new long bits from the specified number.
         * @param {number} value Value
         * @returns {util.LongBits} Instance
         */
        LongBits.fromNumber = function fromNumber(value) {
          if (value === 0) return zero
          var sign = value < 0
          if (sign) value = -value
          var lo = value >>> 0,
            hi = ((value - lo) / 4294967296) >>> 0
          if (sign) {
            hi = ~hi >>> 0
            lo = ~lo >>> 0
            if (++lo > 4294967295) {
              lo = 0
              if (++hi > 4294967295) hi = 0
            }
          }
          return new LongBits(lo, hi)
        }

        /**
         * Constructs new long bits from a number, long or string.
         * @param {Long|number|string} value Value
         * @returns {util.LongBits} Instance
         */
        LongBits.from = function from(value) {
          if (typeof value === 'number') return LongBits.fromNumber(value)
          if (util.isString(value)) {
            /* istanbul ignore else */
            if (util.Long) value = util.Long.fromString(value)
            else return LongBits.fromNumber(parseInt(value, 10))
          }
          return value.low || value.high
            ? new LongBits(value.low >>> 0, value.high >>> 0)
            : zero
        }

        /**
         * Converts this long bits to a possibly unsafe JavaScript number.
         * @param {boolean} [unsigned=false] Whether unsigned or not
         * @returns {number} Possibly unsafe number
         */
        LongBits.prototype.toNumber = function toNumber(unsigned) {
          if (!unsigned && this.hi >>> 31) {
            var lo = (~this.lo + 1) >>> 0,
              hi = ~this.hi >>> 0
            if (!lo) hi = (hi + 1) >>> 0
            return -(lo + hi * 4294967296)
          }
          return this.lo + this.hi * 4294967296
        }

        /**
         * Converts this long bits to a long.
         * @param {boolean} [unsigned=false] Whether unsigned or not
         * @returns {Long} Long
         */
        LongBits.prototype.toLong = function toLong(unsigned) {
          return util.Long
            ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned))
            : /* istanbul ignore next */
              {
                low: this.lo | 0,
                high: this.hi | 0,
                unsigned: Boolean(unsigned),
              }
        }

        var charCodeAt = String.prototype.charCodeAt

        /**
         * Constructs new long bits from the specified 8 characters long hash.
         * @param {string} hash Hash
         * @returns {util.LongBits} Bits
         */
        LongBits.fromHash = function fromHash(hash) {
          if (hash === zeroHash) return zero
          return new LongBits(
            (charCodeAt.call(hash, 0) |
              (charCodeAt.call(hash, 1) << 8) |
              (charCodeAt.call(hash, 2) << 16) |
              (charCodeAt.call(hash, 3) << 24)) >>>
              0,
            (charCodeAt.call(hash, 4) |
              (charCodeAt.call(hash, 5) << 8) |
              (charCodeAt.call(hash, 6) << 16) |
              (charCodeAt.call(hash, 7) << 24)) >>>
              0
          )
        }

        /**
         * Converts this long bits to a 8 characters long hash.
         * @returns {string} Hash
         */
        LongBits.prototype.toHash = function toHash() {
          return String.fromCharCode(
            this.lo & 255,
            (this.lo >>> 8) & 255,
            (this.lo >>> 16) & 255,
            this.lo >>> 24,
            this.hi & 255,
            (this.hi >>> 8) & 255,
            (this.hi >>> 16) & 255,
            this.hi >>> 24
          )
        }

        /**
         * Zig-zag encodes this long bits.
         * @returns {util.LongBits} `this`
         */
        LongBits.prototype.zzEncode = function zzEncode() {
          var mask = this.hi >> 31
          this.hi = (((this.hi << 1) | (this.lo >>> 31)) ^ mask) >>> 0
          this.lo = ((this.lo << 1) ^ mask) >>> 0
          return this
        }

        /**
         * Zig-zag decodes this long bits.
         * @returns {util.LongBits} `this`
         */
        LongBits.prototype.zzDecode = function zzDecode() {
          var mask = -(this.lo & 1)
          this.lo = (((this.lo >>> 1) | (this.hi << 31)) ^ mask) >>> 0
          this.hi = ((this.hi >>> 1) ^ mask) >>> 0
          return this
        }

        /**
         * Calculates the length of this longbits when encoded as a varint.
         * @returns {number} Length
         */
        LongBits.prototype.length = function length() {
          var part0 = this.lo,
            part1 = ((this.lo >>> 28) | (this.hi << 4)) >>> 0,
            part2 = this.hi >>> 24
          return part2 === 0
            ? part1 === 0
              ? part0 < 16384
                ? part0 < 128
                  ? 1
                  : 2
                : part0 < 2097152
                  ? 3
                  : 4
              : part1 < 16384
                ? part1 < 128
                  ? 5
                  : 6
                : part1 < 2097152
                  ? 7
                  : 8
            : part2 < 128
              ? 9
              : 10
        }
      },
      {
        '../util/minimal':
          '../../../node_modules/protobufjs/src/util/minimal.js',
      },
    ],
    '../../../node_modules/base64-js/index.js': [
      function(require, module, exports) {
        'use strict'

        exports.byteLength = byteLength
        exports.toByteArray = toByteArray
        exports.fromByteArray = fromByteArray

        var lookup = []
        var revLookup = []
        var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

        var code =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
        for (var i = 0, len = code.length; i < len; ++i) {
          lookup[i] = code[i]
          revLookup[code.charCodeAt(i)] = i
        }

        // Support decoding URL-safe base64 strings, as Node.js does.
        // See: https://en.wikipedia.org/wiki/Base64#URL_applications
        revLookup['-'.charCodeAt(0)] = 62
        revLookup['_'.charCodeAt(0)] = 63

        function getLens(b64) {
          var len = b64.length

          if (len % 4 > 0) {
            throw new Error('Invalid string. Length must be a multiple of 4')
          }

          // Trim off extra bytes after placeholder bytes are found
          // See: https://github.com/beatgammit/base64-js/issues/42
          var validLen = b64.indexOf('=')
          if (validLen === -1) validLen = len

          var placeHoldersLen = validLen === len ? 0 : 4 - (validLen % 4)

          return [validLen, placeHoldersLen]
        }

        // base64 is 4/3 + up to two characters of the original data
        function byteLength(b64) {
          var lens = getLens(b64)
          var validLen = lens[0]
          var placeHoldersLen = lens[1]
          return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen
        }

        function _byteLength(b64, validLen, placeHoldersLen) {
          return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen
        }

        function toByteArray(b64) {
          var tmp
          var lens = getLens(b64)
          var validLen = lens[0]
          var placeHoldersLen = lens[1]

          var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

          var curByte = 0

          // if there are placeholders, only get up to the last complete 4 chars
          var len = placeHoldersLen > 0 ? validLen - 4 : validLen

          for (var i = 0; i < len; i += 4) {
            tmp =
              (revLookup[b64.charCodeAt(i)] << 18) |
              (revLookup[b64.charCodeAt(i + 1)] << 12) |
              (revLookup[b64.charCodeAt(i + 2)] << 6) |
              revLookup[b64.charCodeAt(i + 3)]
            arr[curByte++] = (tmp >> 16) & 0xff
            arr[curByte++] = (tmp >> 8) & 0xff
            arr[curByte++] = tmp & 0xff
          }

          if (placeHoldersLen === 2) {
            tmp =
              (revLookup[b64.charCodeAt(i)] << 2) |
              (revLookup[b64.charCodeAt(i + 1)] >> 4)
            arr[curByte++] = tmp & 0xff
          }

          if (placeHoldersLen === 1) {
            tmp =
              (revLookup[b64.charCodeAt(i)] << 10) |
              (revLookup[b64.charCodeAt(i + 1)] << 4) |
              (revLookup[b64.charCodeAt(i + 2)] >> 2)
            arr[curByte++] = (tmp >> 8) & 0xff
            arr[curByte++] = tmp & 0xff
          }

          return arr
        }

        function tripletToBase64(num) {
          return (
            lookup[(num >> 18) & 0x3f] +
            lookup[(num >> 12) & 0x3f] +
            lookup[(num >> 6) & 0x3f] +
            lookup[num & 0x3f]
          )
        }

        function encodeChunk(uint8, start, end) {
          var tmp
          var output = []
          for (var i = start; i < end; i += 3) {
            tmp =
              ((uint8[i] << 16) & 0xff0000) +
              ((uint8[i + 1] << 8) & 0xff00) +
              (uint8[i + 2] & 0xff)
            output.push(tripletToBase64(tmp))
          }
          return output.join('')
        }

        function fromByteArray(uint8) {
          var tmp
          var len = uint8.length
          var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
          var parts = []
          var maxChunkLength = 16383 // must be multiple of 3

          // go through the array every three bytes, we'll deal with trailing stuff later
          for (
            var i = 0, len2 = len - extraBytes;
            i < len2;
            i += maxChunkLength
          ) {
            parts.push(
              encodeChunk(
                uint8,
                i,
                i + maxChunkLength > len2 ? len2 : i + maxChunkLength
              )
            )
          }

          // pad the end with zeros, but make sure to not forget the extra bytes
          if (extraBytes === 1) {
            tmp = uint8[len - 1]
            parts.push(lookup[tmp >> 2] + lookup[(tmp << 4) & 0x3f] + '==')
          } else if (extraBytes === 2) {
            tmp = (uint8[len - 2] << 8) + uint8[len - 1]
            parts.push(
              lookup[tmp >> 10] +
                lookup[(tmp >> 4) & 0x3f] +
                lookup[(tmp << 2) & 0x3f] +
                '='
            )
          }

          return parts.join('')
        }
      },
      {},
    ],
    '../../../node_modules/ieee754/index.js': [
      function(require, module, exports) {
        exports.read = function(buffer, offset, isLE, mLen, nBytes) {
          var e, m
          var eLen = nBytes * 8 - mLen - 1
          var eMax = (1 << eLen) - 1
          var eBias = eMax >> 1
          var nBits = -7
          var i = isLE ? nBytes - 1 : 0
          var d = isLE ? -1 : 1
          var s = buffer[offset + i]

          i += d

          e = s & ((1 << -nBits) - 1)
          s >>= -nBits
          nBits += eLen
          for (
            ;
            nBits > 0;
            e = e * 256 + buffer[offset + i], i += d, nBits -= 8
          ) {}

          m = e & ((1 << -nBits) - 1)
          e >>= -nBits
          nBits += mLen
          for (
            ;
            nBits > 0;
            m = m * 256 + buffer[offset + i], i += d, nBits -= 8
          ) {}

          if (e === 0) {
            e = 1 - eBias
          } else if (e === eMax) {
            return m ? NaN : (s ? -1 : 1) * Infinity
          } else {
            m = m + Math.pow(2, mLen)
            e = e - eBias
          }
          return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
        }

        exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
          var e, m, c
          var eLen = nBytes * 8 - mLen - 1
          var eMax = (1 << eLen) - 1
          var eBias = eMax >> 1
          var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0
          var i = isLE ? 0 : nBytes - 1
          var d = isLE ? 1 : -1
          var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

          value = Math.abs(value)

          if (isNaN(value) || value === Infinity) {
            m = isNaN(value) ? 1 : 0
            e = eMax
          } else {
            e = Math.floor(Math.log(value) / Math.LN2)
            if (value * (c = Math.pow(2, -e)) < 1) {
              e--
              c *= 2
            }
            if (e + eBias >= 1) {
              value += rt / c
            } else {
              value += rt * Math.pow(2, 1 - eBias)
            }
            if (value * c >= 2) {
              e++
              c /= 2
            }

            if (e + eBias >= eMax) {
              m = 0
              e = eMax
            } else if (e + eBias >= 1) {
              m = (value * c - 1) * Math.pow(2, mLen)
              e = e + eBias
            } else {
              m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
              e = 0
            }
          }

          for (
            ;
            mLen >= 8;
            buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8
          ) {}

          e = (e << mLen) | m
          eLen += mLen
          for (
            ;
            eLen > 0;
            buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8
          ) {}

          buffer[offset + i - d] |= s * 128
        }
      },
      {},
    ],
    '../../../node_modules/isarray/index.js': [
      function(require, module, exports) {
        var toString = {}.toString

        module.exports =
          Array.isArray ||
          function(arr) {
            return toString.call(arr) == '[object Array]'
          }
      },
      {},
    ],
    '../../../node_modules/buffer/index.js': [
      function(require, module, exports) {
        var global = arguments[3]
        /*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
        /* eslint-disable no-proto */
        ;('use strict')

        var base64 = require('base64-js')
        var ieee754 = require('ieee754')
        var isArray = require('isarray')

        exports.Buffer = Buffer
        exports.SlowBuffer = SlowBuffer
        exports.INSPECT_MAX_BYTES = 50

        /**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
        Buffer.TYPED_ARRAY_SUPPORT =
          global.TYPED_ARRAY_SUPPORT !== undefined
            ? global.TYPED_ARRAY_SUPPORT
            : typedArraySupport()

        /*
 * Export kMaxLength after typed array support is determined.
 */
        exports.kMaxLength = kMaxLength()

        function typedArraySupport() {
          try {
            var arr = new Uint8Array(1)
            arr.__proto__ = {
              __proto__: Uint8Array.prototype,
              foo: function() {
                return 42
              },
            }
            return (
              arr.foo() === 42 && // typed array instances can be augmented
              typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
              arr.subarray(1, 1).byteLength === 0
            ) // ie10 has broken `subarray`
          } catch (e) {
            return false
          }
        }

        function kMaxLength() {
          return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff
        }

        function createBuffer(that, length) {
          if (kMaxLength() < length) {
            throw new RangeError('Invalid typed array length')
          }
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            // Return an augmented `Uint8Array` instance, for best performance
            that = new Uint8Array(length)
            that.__proto__ = Buffer.prototype
          } else {
            // Fallback: Return an object instance of the Buffer class
            if (that === null) {
              that = new Buffer(length)
            }
            that.length = length
          }

          return that
        }

        /**
         * The Buffer constructor returns instances of `Uint8Array` that have their
         * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
         * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
         * and the `Uint8Array` methods. Square bracket notation works as expected -- it
         * returns a single octet.
         *
         * The `Uint8Array` prototype remains unmodified.
         */

        function Buffer(arg, encodingOrOffset, length) {
          if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
            return new Buffer(arg, encodingOrOffset, length)
          }

          // Common case.
          if (typeof arg === 'number') {
            if (typeof encodingOrOffset === 'string') {
              throw new Error(
                'If encoding is specified then the first argument must be a string'
              )
            }
            return allocUnsafe(this, arg)
          }
          return from(this, arg, encodingOrOffset, length)
        }

        Buffer.poolSize = 8192 // not used by this implementation

        // TODO: Legacy, not needed anymore. Remove in next major version.
        Buffer._augment = function(arr) {
          arr.__proto__ = Buffer.prototype
          return arr
        }

        function from(that, value, encodingOrOffset, length) {
          if (typeof value === 'number') {
            throw new TypeError('"value" argument must not be a number')
          }

          if (
            typeof ArrayBuffer !== 'undefined' &&
            value instanceof ArrayBuffer
          ) {
            return fromArrayBuffer(that, value, encodingOrOffset, length)
          }

          if (typeof value === 'string') {
            return fromString(that, value, encodingOrOffset)
          }

          return fromObject(that, value)
        }

        /**
         * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
         * if value is a number.
         * Buffer.from(str[, encoding])
         * Buffer.from(array)
         * Buffer.from(buffer)
         * Buffer.from(arrayBuffer[, byteOffset[, length]])
         **/
        Buffer.from = function(value, encodingOrOffset, length) {
          return from(null, value, encodingOrOffset, length)
        }

        if (Buffer.TYPED_ARRAY_SUPPORT) {
          Buffer.prototype.__proto__ = Uint8Array.prototype
          Buffer.__proto__ = Uint8Array
          if (
            typeof Symbol !== 'undefined' &&
            Symbol.species &&
            Buffer[Symbol.species] === Buffer
          ) {
            // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
            Object.defineProperty(Buffer, Symbol.species, {
              value: null,
              configurable: true,
            })
          }
        }

        function assertSize(size) {
          if (typeof size !== 'number') {
            throw new TypeError('"size" argument must be a number')
          } else if (size < 0) {
            throw new RangeError('"size" argument must not be negative')
          }
        }

        function alloc(that, size, fill, encoding) {
          assertSize(size)
          if (size <= 0) {
            return createBuffer(that, size)
          }
          if (fill !== undefined) {
            // Only pay attention to encoding if it's a string. This
            // prevents accidentally sending in a number that would
            // be interpretted as a start offset.
            return typeof encoding === 'string'
              ? createBuffer(that, size).fill(fill, encoding)
              : createBuffer(that, size).fill(fill)
          }
          return createBuffer(that, size)
        }

        /**
         * Creates a new filled Buffer instance.
         * alloc(size[, fill[, encoding]])
         **/
        Buffer.alloc = function(size, fill, encoding) {
          return alloc(null, size, fill, encoding)
        }

        function allocUnsafe(that, size) {
          assertSize(size)
          that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
          if (!Buffer.TYPED_ARRAY_SUPPORT) {
            for (var i = 0; i < size; ++i) {
              that[i] = 0
            }
          }
          return that
        }

        /**
         * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
         * */
        Buffer.allocUnsafe = function(size) {
          return allocUnsafe(null, size)
        }
        /**
         * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
         */
        Buffer.allocUnsafeSlow = function(size) {
          return allocUnsafe(null, size)
        }

        function fromString(that, string, encoding) {
          if (typeof encoding !== 'string' || encoding === '') {
            encoding = 'utf8'
          }

          if (!Buffer.isEncoding(encoding)) {
            throw new TypeError('"encoding" must be a valid string encoding')
          }

          var length = byteLength(string, encoding) | 0
          that = createBuffer(that, length)

          var actual = that.write(string, encoding)

          if (actual !== length) {
            // Writing a hex string, for example, that contains invalid characters will
            // cause everything after the first invalid character to be ignored. (e.g.
            // 'abxxcd' will be treated as 'ab')
            that = that.slice(0, actual)
          }

          return that
        }

        function fromArrayLike(that, array) {
          var length = array.length < 0 ? 0 : checked(array.length) | 0
          that = createBuffer(that, length)
          for (var i = 0; i < length; i += 1) {
            that[i] = array[i] & 255
          }
          return that
        }

        function fromArrayBuffer(that, array, byteOffset, length) {
          array.byteLength // this throws if `array` is not a valid ArrayBuffer

          if (byteOffset < 0 || array.byteLength < byteOffset) {
            throw new RangeError("'offset' is out of bounds")
          }

          if (array.byteLength < byteOffset + (length || 0)) {
            throw new RangeError("'length' is out of bounds")
          }

          if (byteOffset === undefined && length === undefined) {
            array = new Uint8Array(array)
          } else if (length === undefined) {
            array = new Uint8Array(array, byteOffset)
          } else {
            array = new Uint8Array(array, byteOffset, length)
          }

          if (Buffer.TYPED_ARRAY_SUPPORT) {
            // Return an augmented `Uint8Array` instance, for best performance
            that = array
            that.__proto__ = Buffer.prototype
          } else {
            // Fallback: Return an object instance of the Buffer class
            that = fromArrayLike(that, array)
          }
          return that
        }

        function fromObject(that, obj) {
          if (Buffer.isBuffer(obj)) {
            var len = checked(obj.length) | 0
            that = createBuffer(that, len)

            if (that.length === 0) {
              return that
            }

            obj.copy(that, 0, 0, len)
            return that
          }

          if (obj) {
            if (
              (typeof ArrayBuffer !== 'undefined' &&
                obj.buffer instanceof ArrayBuffer) ||
              'length' in obj
            ) {
              if (typeof obj.length !== 'number' || isnan(obj.length)) {
                return createBuffer(that, 0)
              }
              return fromArrayLike(that, obj)
            }

            if (obj.type === 'Buffer' && isArray(obj.data)) {
              return fromArrayLike(that, obj.data)
            }
          }

          throw new TypeError(
            'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
          )
        }

        function checked(length) {
          // Note: cannot use `length < kMaxLength()` here because that fails when
          // length is NaN (which is otherwise coerced to zero.)
          if (length >= kMaxLength()) {
            throw new RangeError(
              'Attempt to allocate Buffer larger than maximum ' +
                'size: 0x' +
                kMaxLength().toString(16) +
                ' bytes'
            )
          }
          return length | 0
        }

        function SlowBuffer(length) {
          if (+length != length) {
            // eslint-disable-line eqeqeq
            length = 0
          }
          return Buffer.alloc(+length)
        }

        Buffer.isBuffer = function isBuffer(b) {
          return !!(b != null && b._isBuffer)
        }

        Buffer.compare = function compare(a, b) {
          if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
            throw new TypeError('Arguments must be Buffers')
          }

          if (a === b) return 0

          var x = a.length
          var y = b.length

          for (var i = 0, len = Math.min(x, y); i < len; ++i) {
            if (a[i] !== b[i]) {
              x = a[i]
              y = b[i]
              break
            }
          }

          if (x < y) return -1
          if (y < x) return 1
          return 0
        }

        Buffer.isEncoding = function isEncoding(encoding) {
          switch (String(encoding).toLowerCase()) {
            case 'hex':
            case 'utf8':
            case 'utf-8':
            case 'ascii':
            case 'latin1':
            case 'binary':
            case 'base64':
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return true
            default:
              return false
          }
        }

        Buffer.concat = function concat(list, length) {
          if (!isArray(list)) {
            throw new TypeError('"list" argument must be an Array of Buffers')
          }

          if (list.length === 0) {
            return Buffer.alloc(0)
          }

          var i
          if (length === undefined) {
            length = 0
            for (i = 0; i < list.length; ++i) {
              length += list[i].length
            }
          }

          var buffer = Buffer.allocUnsafe(length)
          var pos = 0
          for (i = 0; i < list.length; ++i) {
            var buf = list[i]
            if (!Buffer.isBuffer(buf)) {
              throw new TypeError('"list" argument must be an Array of Buffers')
            }
            buf.copy(buffer, pos)
            pos += buf.length
          }
          return buffer
        }

        function byteLength(string, encoding) {
          if (Buffer.isBuffer(string)) {
            return string.length
          }
          if (
            typeof ArrayBuffer !== 'undefined' &&
            typeof ArrayBuffer.isView === 'function' &&
            (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)
          ) {
            return string.byteLength
          }
          if (typeof string !== 'string') {
            string = '' + string
          }

          var len = string.length
          if (len === 0) return 0

          // Use a for loop to avoid recursion
          var loweredCase = false
          for (;;) {
            switch (encoding) {
              case 'ascii':
              case 'latin1':
              case 'binary':
                return len
              case 'utf8':
              case 'utf-8':
              case undefined:
                return utf8ToBytes(string).length
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return len * 2
              case 'hex':
                return len >>> 1
              case 'base64':
                return base64ToBytes(string).length
              default:
                if (loweredCase) return utf8ToBytes(string).length // assume utf8
                encoding = ('' + encoding).toLowerCase()
                loweredCase = true
            }
          }
        }
        Buffer.byteLength = byteLength

        function slowToString(encoding, start, end) {
          var loweredCase = false

          // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
          // property of a typed array.

          // This behaves neither like String nor Uint8Array in that we set start/end
          // to their upper/lower bounds if the value passed is out of range.
          // undefined is handled specially as per ECMA-262 6th Edition,
          // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
          if (start === undefined || start < 0) {
            start = 0
          }
          // Return early if start > this.length. Done here to prevent potential uint32
          // coercion fail below.
          if (start > this.length) {
            return ''
          }

          if (end === undefined || end > this.length) {
            end = this.length
          }

          if (end <= 0) {
            return ''
          }

          // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
          end >>>= 0
          start >>>= 0

          if (end <= start) {
            return ''
          }

          if (!encoding) encoding = 'utf8'

          while (true) {
            switch (encoding) {
              case 'hex':
                return hexSlice(this, start, end)

              case 'utf8':
              case 'utf-8':
                return utf8Slice(this, start, end)

              case 'ascii':
                return asciiSlice(this, start, end)

              case 'latin1':
              case 'binary':
                return latin1Slice(this, start, end)

              case 'base64':
                return base64Slice(this, start, end)

              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return utf16leSlice(this, start, end)

              default:
                if (loweredCase)
                  throw new TypeError('Unknown encoding: ' + encoding)
                encoding = (encoding + '').toLowerCase()
                loweredCase = true
            }
          }
        }

        // The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
        // Buffer instances.
        Buffer.prototype._isBuffer = true

        function swap(b, n, m) {
          var i = b[n]
          b[n] = b[m]
          b[m] = i
        }

        Buffer.prototype.swap16 = function swap16() {
          var len = this.length
          if (len % 2 !== 0) {
            throw new RangeError('Buffer size must be a multiple of 16-bits')
          }
          for (var i = 0; i < len; i += 2) {
            swap(this, i, i + 1)
          }
          return this
        }

        Buffer.prototype.swap32 = function swap32() {
          var len = this.length
          if (len % 4 !== 0) {
            throw new RangeError('Buffer size must be a multiple of 32-bits')
          }
          for (var i = 0; i < len; i += 4) {
            swap(this, i, i + 3)
            swap(this, i + 1, i + 2)
          }
          return this
        }

        Buffer.prototype.swap64 = function swap64() {
          var len = this.length
          if (len % 8 !== 0) {
            throw new RangeError('Buffer size must be a multiple of 64-bits')
          }
          for (var i = 0; i < len; i += 8) {
            swap(this, i, i + 7)
            swap(this, i + 1, i + 6)
            swap(this, i + 2, i + 5)
            swap(this, i + 3, i + 4)
          }
          return this
        }

        Buffer.prototype.toString = function toString() {
          var length = this.length | 0
          if (length === 0) return ''
          if (arguments.length === 0) return utf8Slice(this, 0, length)
          return slowToString.apply(this, arguments)
        }

        Buffer.prototype.equals = function equals(b) {
          if (!Buffer.isBuffer(b))
            throw new TypeError('Argument must be a Buffer')
          if (this === b) return true
          return Buffer.compare(this, b) === 0
        }

        Buffer.prototype.inspect = function inspect() {
          var str = ''
          var max = exports.INSPECT_MAX_BYTES
          if (this.length > 0) {
            str = this.toString('hex', 0, max)
              .match(/.{2}/g)
              .join(' ')
            if (this.length > max) str += ' ... '
          }
          return '<Buffer ' + str + '>'
        }

        Buffer.prototype.compare = function compare(
          target,
          start,
          end,
          thisStart,
          thisEnd
        ) {
          if (!Buffer.isBuffer(target)) {
            throw new TypeError('Argument must be a Buffer')
          }

          if (start === undefined) {
            start = 0
          }
          if (end === undefined) {
            end = target ? target.length : 0
          }
          if (thisStart === undefined) {
            thisStart = 0
          }
          if (thisEnd === undefined) {
            thisEnd = this.length
          }

          if (
            start < 0 ||
            end > target.length ||
            thisStart < 0 ||
            thisEnd > this.length
          ) {
            throw new RangeError('out of range index')
          }

          if (thisStart >= thisEnd && start >= end) {
            return 0
          }
          if (thisStart >= thisEnd) {
            return -1
          }
          if (start >= end) {
            return 1
          }

          start >>>= 0
          end >>>= 0
          thisStart >>>= 0
          thisEnd >>>= 0

          if (this === target) return 0

          var x = thisEnd - thisStart
          var y = end - start
          var len = Math.min(x, y)

          var thisCopy = this.slice(thisStart, thisEnd)
          var targetCopy = target.slice(start, end)

          for (var i = 0; i < len; ++i) {
            if (thisCopy[i] !== targetCopy[i]) {
              x = thisCopy[i]
              y = targetCopy[i]
              break
            }
          }

          if (x < y) return -1
          if (y < x) return 1
          return 0
        }

        // Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
        // OR the last index of `val` in `buffer` at offset <= `byteOffset`.
        //
        // Arguments:
        // - buffer - a Buffer to search
        // - val - a string, Buffer, or number
        // - byteOffset - an index into `buffer`; will be clamped to an int32
        // - encoding - an optional encoding, relevant is val is a string
        // - dir - true for indexOf, false for lastIndexOf
        function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
          // Empty buffer means no match
          if (buffer.length === 0) return -1

          // Normalize byteOffset
          if (typeof byteOffset === 'string') {
            encoding = byteOffset
            byteOffset = 0
          } else if (byteOffset > 0x7fffffff) {
            byteOffset = 0x7fffffff
          } else if (byteOffset < -0x80000000) {
            byteOffset = -0x80000000
          }
          byteOffset = +byteOffset // Coerce to Number.
          if (isNaN(byteOffset)) {
            // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
            byteOffset = dir ? 0 : buffer.length - 1
          }

          // Normalize byteOffset: negative offsets start from the end of the buffer
          if (byteOffset < 0) byteOffset = buffer.length + byteOffset
          if (byteOffset >= buffer.length) {
            if (dir) return -1
            else byteOffset = buffer.length - 1
          } else if (byteOffset < 0) {
            if (dir) byteOffset = 0
            else return -1
          }

          // Normalize val
          if (typeof val === 'string') {
            val = Buffer.from(val, encoding)
          }

          // Finally, search either indexOf (if dir is true) or lastIndexOf
          if (Buffer.isBuffer(val)) {
            // Special case: looking for empty string/buffer always fails
            if (val.length === 0) {
              return -1
            }
            return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
          } else if (typeof val === 'number') {
            val = val & 0xff // Search for a byte value [0-255]
            if (
              Buffer.TYPED_ARRAY_SUPPORT &&
              typeof Uint8Array.prototype.indexOf === 'function'
            ) {
              if (dir) {
                return Uint8Array.prototype.indexOf.call(
                  buffer,
                  val,
                  byteOffset
                )
              } else {
                return Uint8Array.prototype.lastIndexOf.call(
                  buffer,
                  val,
                  byteOffset
                )
              }
            }
            return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
          }

          throw new TypeError('val must be string, number or Buffer')
        }

        function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
          var indexSize = 1
          var arrLength = arr.length
          var valLength = val.length

          if (encoding !== undefined) {
            encoding = String(encoding).toLowerCase()
            if (
              encoding === 'ucs2' ||
              encoding === 'ucs-2' ||
              encoding === 'utf16le' ||
              encoding === 'utf-16le'
            ) {
              if (arr.length < 2 || val.length < 2) {
                return -1
              }
              indexSize = 2
              arrLength /= 2
              valLength /= 2
              byteOffset /= 2
            }
          }

          function read(buf, i) {
            if (indexSize === 1) {
              return buf[i]
            } else {
              return buf.readUInt16BE(i * indexSize)
            }
          }

          var i
          if (dir) {
            var foundIndex = -1
            for (i = byteOffset; i < arrLength; i++) {
              if (
                read(arr, i) ===
                read(val, foundIndex === -1 ? 0 : i - foundIndex)
              ) {
                if (foundIndex === -1) foundIndex = i
                if (i - foundIndex + 1 === valLength)
                  return foundIndex * indexSize
              } else {
                if (foundIndex !== -1) i -= i - foundIndex
                foundIndex = -1
              }
            }
          } else {
            if (byteOffset + valLength > arrLength)
              byteOffset = arrLength - valLength
            for (i = byteOffset; i >= 0; i--) {
              var found = true
              for (var j = 0; j < valLength; j++) {
                if (read(arr, i + j) !== read(val, j)) {
                  found = false
                  break
                }
              }
              if (found) return i
            }
          }

          return -1
        }

        Buffer.prototype.includes = function includes(
          val,
          byteOffset,
          encoding
        ) {
          return this.indexOf(val, byteOffset, encoding) !== -1
        }

        Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
          return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
        }

        Buffer.prototype.lastIndexOf = function lastIndexOf(
          val,
          byteOffset,
          encoding
        ) {
          return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
        }

        function hexWrite(buf, string, offset, length) {
          offset = Number(offset) || 0
          var remaining = buf.length - offset
          if (!length) {
            length = remaining
          } else {
            length = Number(length)
            if (length > remaining) {
              length = remaining
            }
          }

          // must be an even number of digits
          var strLen = string.length
          if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

          if (length > strLen / 2) {
            length = strLen / 2
          }
          for (var i = 0; i < length; ++i) {
            var parsed = parseInt(string.substr(i * 2, 2), 16)
            if (isNaN(parsed)) return i
            buf[offset + i] = parsed
          }
          return i
        }

        function utf8Write(buf, string, offset, length) {
          return blitBuffer(
            utf8ToBytes(string, buf.length - offset),
            buf,
            offset,
            length
          )
        }

        function asciiWrite(buf, string, offset, length) {
          return blitBuffer(asciiToBytes(string), buf, offset, length)
        }

        function latin1Write(buf, string, offset, length) {
          return asciiWrite(buf, string, offset, length)
        }

        function base64Write(buf, string, offset, length) {
          return blitBuffer(base64ToBytes(string), buf, offset, length)
        }

        function ucs2Write(buf, string, offset, length) {
          return blitBuffer(
            utf16leToBytes(string, buf.length - offset),
            buf,
            offset,
            length
          )
        }

        Buffer.prototype.write = function write(
          string,
          offset,
          length,
          encoding
        ) {
          // Buffer#write(string)
          if (offset === undefined) {
            encoding = 'utf8'
            length = this.length
            offset = 0
            // Buffer#write(string, encoding)
          } else if (length === undefined && typeof offset === 'string') {
            encoding = offset
            length = this.length
            offset = 0
            // Buffer#write(string, offset[, length][, encoding])
          } else if (isFinite(offset)) {
            offset = offset | 0
            if (isFinite(length)) {
              length = length | 0
              if (encoding === undefined) encoding = 'utf8'
            } else {
              encoding = length
              length = undefined
            }
            // legacy write(string, encoding, offset, length) - remove in v0.13
          } else {
            throw new Error(
              'Buffer.write(string, encoding, offset[, length]) is no longer supported'
            )
          }

          var remaining = this.length - offset
          if (length === undefined || length > remaining) length = remaining

          if (
            (string.length > 0 && (length < 0 || offset < 0)) ||
            offset > this.length
          ) {
            throw new RangeError('Attempt to write outside buffer bounds')
          }

          if (!encoding) encoding = 'utf8'

          var loweredCase = false
          for (;;) {
            switch (encoding) {
              case 'hex':
                return hexWrite(this, string, offset, length)

              case 'utf8':
              case 'utf-8':
                return utf8Write(this, string, offset, length)

              case 'ascii':
                return asciiWrite(this, string, offset, length)

              case 'latin1':
              case 'binary':
                return latin1Write(this, string, offset, length)

              case 'base64':
                // Warning: maxLength not taken into account in base64Write
                return base64Write(this, string, offset, length)

              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return ucs2Write(this, string, offset, length)

              default:
                if (loweredCase)
                  throw new TypeError('Unknown encoding: ' + encoding)
                encoding = ('' + encoding).toLowerCase()
                loweredCase = true
            }
          }
        }

        Buffer.prototype.toJSON = function toJSON() {
          return {
            type: 'Buffer',
            data: Array.prototype.slice.call(this._arr || this, 0),
          }
        }

        function base64Slice(buf, start, end) {
          if (start === 0 && end === buf.length) {
            return base64.fromByteArray(buf)
          } else {
            return base64.fromByteArray(buf.slice(start, end))
          }
        }

        function utf8Slice(buf, start, end) {
          end = Math.min(buf.length, end)
          var res = []

          var i = start
          while (i < end) {
            var firstByte = buf[i]
            var codePoint = null
            var bytesPerSequence =
              firstByte > 0xef
                ? 4
                : firstByte > 0xdf
                  ? 3
                  : firstByte > 0xbf
                    ? 2
                    : 1

            if (i + bytesPerSequence <= end) {
              var secondByte, thirdByte, fourthByte, tempCodePoint

              switch (bytesPerSequence) {
                case 1:
                  if (firstByte < 0x80) {
                    codePoint = firstByte
                  }
                  break
                case 2:
                  secondByte = buf[i + 1]
                  if ((secondByte & 0xc0) === 0x80) {
                    tempCodePoint =
                      ((firstByte & 0x1f) << 0x6) | (secondByte & 0x3f)
                    if (tempCodePoint > 0x7f) {
                      codePoint = tempCodePoint
                    }
                  }
                  break
                case 3:
                  secondByte = buf[i + 1]
                  thirdByte = buf[i + 2]
                  if (
                    (secondByte & 0xc0) === 0x80 &&
                    (thirdByte & 0xc0) === 0x80
                  ) {
                    tempCodePoint =
                      ((firstByte & 0xf) << 0xc) |
                      ((secondByte & 0x3f) << 0x6) |
                      (thirdByte & 0x3f)
                    if (
                      tempCodePoint > 0x7ff &&
                      (tempCodePoint < 0xd800 || tempCodePoint > 0xdfff)
                    ) {
                      codePoint = tempCodePoint
                    }
                  }
                  break
                case 4:
                  secondByte = buf[i + 1]
                  thirdByte = buf[i + 2]
                  fourthByte = buf[i + 3]
                  if (
                    (secondByte & 0xc0) === 0x80 &&
                    (thirdByte & 0xc0) === 0x80 &&
                    (fourthByte & 0xc0) === 0x80
                  ) {
                    tempCodePoint =
                      ((firstByte & 0xf) << 0x12) |
                      ((secondByte & 0x3f) << 0xc) |
                      ((thirdByte & 0x3f) << 0x6) |
                      (fourthByte & 0x3f)
                    if (tempCodePoint > 0xffff && tempCodePoint < 0x110000) {
                      codePoint = tempCodePoint
                    }
                  }
              }
            }

            if (codePoint === null) {
              // we did not generate a valid codePoint so insert a
              // replacement char (U+FFFD) and advance only 1 byte
              codePoint = 0xfffd
              bytesPerSequence = 1
            } else if (codePoint > 0xffff) {
              // encode to utf16 (surrogate pair dance)
              codePoint -= 0x10000
              res.push(((codePoint >>> 10) & 0x3ff) | 0xd800)
              codePoint = 0xdc00 | (codePoint & 0x3ff)
            }

            res.push(codePoint)
            i += bytesPerSequence
          }

          return decodeCodePointsArray(res)
        }

        // Based on http://stackoverflow.com/a/22747272/680742, the browser with
        // the lowest limit is Chrome, with 0x10000 args.
        // We go 1 magnitude less, for safety
        var MAX_ARGUMENTS_LENGTH = 0x1000

        function decodeCodePointsArray(codePoints) {
          var len = codePoints.length
          if (len <= MAX_ARGUMENTS_LENGTH) {
            return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
          }

          // Decode in chunks to avoid "call stack size exceeded".
          var res = ''
          var i = 0
          while (i < len) {
            res += String.fromCharCode.apply(
              String,
              codePoints.slice(i, (i += MAX_ARGUMENTS_LENGTH))
            )
          }
          return res
        }

        function asciiSlice(buf, start, end) {
          var ret = ''
          end = Math.min(buf.length, end)

          for (var i = start; i < end; ++i) {
            ret += String.fromCharCode(buf[i] & 0x7f)
          }
          return ret
        }

        function latin1Slice(buf, start, end) {
          var ret = ''
          end = Math.min(buf.length, end)

          for (var i = start; i < end; ++i) {
            ret += String.fromCharCode(buf[i])
          }
          return ret
        }

        function hexSlice(buf, start, end) {
          var len = buf.length

          if (!start || start < 0) start = 0
          if (!end || end < 0 || end > len) end = len

          var out = ''
          for (var i = start; i < end; ++i) {
            out += toHex(buf[i])
          }
          return out
        }

        function utf16leSlice(buf, start, end) {
          var bytes = buf.slice(start, end)
          var res = ''
          for (var i = 0; i < bytes.length; i += 2) {
            res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
          }
          return res
        }

        Buffer.prototype.slice = function slice(start, end) {
          var len = this.length
          start = ~~start
          end = end === undefined ? len : ~~end

          if (start < 0) {
            start += len
            if (start < 0) start = 0
          } else if (start > len) {
            start = len
          }

          if (end < 0) {
            end += len
            if (end < 0) end = 0
          } else if (end > len) {
            end = len
          }

          if (end < start) end = start

          var newBuf
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            newBuf = this.subarray(start, end)
            newBuf.__proto__ = Buffer.prototype
          } else {
            var sliceLen = end - start
            newBuf = new Buffer(sliceLen, undefined)
            for (var i = 0; i < sliceLen; ++i) {
              newBuf[i] = this[i + start]
            }
          }

          return newBuf
        }

        /*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
        function checkOffset(offset, ext, length) {
          if (offset % 1 !== 0 || offset < 0)
            throw new RangeError('offset is not uint')
          if (offset + ext > length)
            throw new RangeError('Trying to access beyond buffer length')
        }

        Buffer.prototype.readUIntLE = function readUIntLE(
          offset,
          byteLength,
          noAssert
        ) {
          offset = offset | 0
          byteLength = byteLength | 0
          if (!noAssert) checkOffset(offset, byteLength, this.length)

          var val = this[offset]
          var mul = 1
          var i = 0
          while (++i < byteLength && (mul *= 0x100)) {
            val += this[offset + i] * mul
          }

          return val
        }

        Buffer.prototype.readUIntBE = function readUIntBE(
          offset,
          byteLength,
          noAssert
        ) {
          offset = offset | 0
          byteLength = byteLength | 0
          if (!noAssert) {
            checkOffset(offset, byteLength, this.length)
          }

          var val = this[offset + --byteLength]
          var mul = 1
          while (byteLength > 0 && (mul *= 0x100)) {
            val += this[offset + --byteLength] * mul
          }

          return val
        }

        Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
          if (!noAssert) checkOffset(offset, 1, this.length)
          return this[offset]
        }

        Buffer.prototype.readUInt16LE = function readUInt16LE(
          offset,
          noAssert
        ) {
          if (!noAssert) checkOffset(offset, 2, this.length)
          return this[offset] | (this[offset + 1] << 8)
        }

        Buffer.prototype.readUInt16BE = function readUInt16BE(
          offset,
          noAssert
        ) {
          if (!noAssert) checkOffset(offset, 2, this.length)
          return (this[offset] << 8) | this[offset + 1]
        }

        Buffer.prototype.readUInt32LE = function readUInt32LE(
          offset,
          noAssert
        ) {
          if (!noAssert) checkOffset(offset, 4, this.length)

          return (
            (this[offset] |
              (this[offset + 1] << 8) |
              (this[offset + 2] << 16)) +
            this[offset + 3] * 0x1000000
          )
        }

        Buffer.prototype.readUInt32BE = function readUInt32BE(
          offset,
          noAssert
        ) {
          if (!noAssert) checkOffset(offset, 4, this.length)

          return (
            this[offset] * 0x1000000 +
            ((this[offset + 1] << 16) |
              (this[offset + 2] << 8) |
              this[offset + 3])
          )
        }

        Buffer.prototype.readIntLE = function readIntLE(
          offset,
          byteLength,
          noAssert
        ) {
          offset = offset | 0
          byteLength = byteLength | 0
          if (!noAssert) checkOffset(offset, byteLength, this.length)

          var val = this[offset]
          var mul = 1
          var i = 0
          while (++i < byteLength && (mul *= 0x100)) {
            val += this[offset + i] * mul
          }
          mul *= 0x80

          if (val >= mul) val -= Math.pow(2, 8 * byteLength)

          return val
        }

        Buffer.prototype.readIntBE = function readIntBE(
          offset,
          byteLength,
          noAssert
        ) {
          offset = offset | 0
          byteLength = byteLength | 0
          if (!noAssert) checkOffset(offset, byteLength, this.length)

          var i = byteLength
          var mul = 1
          var val = this[offset + --i]
          while (i > 0 && (mul *= 0x100)) {
            val += this[offset + --i] * mul
          }
          mul *= 0x80

          if (val >= mul) val -= Math.pow(2, 8 * byteLength)

          return val
        }

        Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
          if (!noAssert) checkOffset(offset, 1, this.length)
          if (!(this[offset] & 0x80)) return this[offset]
          return (0xff - this[offset] + 1) * -1
        }

        Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
          if (!noAssert) checkOffset(offset, 2, this.length)
          var val = this[offset] | (this[offset + 1] << 8)
          return val & 0x8000 ? val | 0xffff0000 : val
        }

        Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
          if (!noAssert) checkOffset(offset, 2, this.length)
          var val = this[offset + 1] | (this[offset] << 8)
          return val & 0x8000 ? val | 0xffff0000 : val
        }

        Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
          if (!noAssert) checkOffset(offset, 4, this.length)

          return (
            this[offset] |
            (this[offset + 1] << 8) |
            (this[offset + 2] << 16) |
            (this[offset + 3] << 24)
          )
        }

        Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
          if (!noAssert) checkOffset(offset, 4, this.length)

          return (
            (this[offset] << 24) |
            (this[offset + 1] << 16) |
            (this[offset + 2] << 8) |
            this[offset + 3]
          )
        }

        Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
          if (!noAssert) checkOffset(offset, 4, this.length)
          return ieee754.read(this, offset, true, 23, 4)
        }

        Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
          if (!noAssert) checkOffset(offset, 4, this.length)
          return ieee754.read(this, offset, false, 23, 4)
        }

        Buffer.prototype.readDoubleLE = function readDoubleLE(
          offset,
          noAssert
        ) {
          if (!noAssert) checkOffset(offset, 8, this.length)
          return ieee754.read(this, offset, true, 52, 8)
        }

        Buffer.prototype.readDoubleBE = function readDoubleBE(
          offset,
          noAssert
        ) {
          if (!noAssert) checkOffset(offset, 8, this.length)
          return ieee754.read(this, offset, false, 52, 8)
        }

        function checkInt(buf, value, offset, ext, max, min) {
          if (!Buffer.isBuffer(buf))
            throw new TypeError('"buffer" argument must be a Buffer instance')
          if (value > max || value < min)
            throw new RangeError('"value" argument is out of bounds')
          if (offset + ext > buf.length)
            throw new RangeError('Index out of range')
        }

        Buffer.prototype.writeUIntLE = function writeUIntLE(
          value,
          offset,
          byteLength,
          noAssert
        ) {
          value = +value
          offset = offset | 0
          byteLength = byteLength | 0
          if (!noAssert) {
            var maxBytes = Math.pow(2, 8 * byteLength) - 1
            checkInt(this, value, offset, byteLength, maxBytes, 0)
          }

          var mul = 1
          var i = 0
          this[offset] = value & 0xff
          while (++i < byteLength && (mul *= 0x100)) {
            this[offset + i] = (value / mul) & 0xff
          }

          return offset + byteLength
        }

        Buffer.prototype.writeUIntBE = function writeUIntBE(
          value,
          offset,
          byteLength,
          noAssert
        ) {
          value = +value
          offset = offset | 0
          byteLength = byteLength | 0
          if (!noAssert) {
            var maxBytes = Math.pow(2, 8 * byteLength) - 1
            checkInt(this, value, offset, byteLength, maxBytes, 0)
          }

          var i = byteLength - 1
          var mul = 1
          this[offset + i] = value & 0xff
          while (--i >= 0 && (mul *= 0x100)) {
            this[offset + i] = (value / mul) & 0xff
          }

          return offset + byteLength
        }

        Buffer.prototype.writeUInt8 = function writeUInt8(
          value,
          offset,
          noAssert
        ) {
          value = +value
          offset = offset | 0
          if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
          if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
          this[offset] = value & 0xff
          return offset + 1
        }

        function objectWriteUInt16(buf, value, offset, littleEndian) {
          if (value < 0) value = 0xffff + value + 1
          for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
            buf[offset + i] =
              (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
              ((littleEndian ? i : 1 - i) * 8)
          }
        }

        Buffer.prototype.writeUInt16LE = function writeUInt16LE(
          value,
          offset,
          noAssert
        ) {
          value = +value
          offset = offset | 0
          if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = value & 0xff
            this[offset + 1] = value >>> 8
          } else {
            objectWriteUInt16(this, value, offset, true)
          }
          return offset + 2
        }

        Buffer.prototype.writeUInt16BE = function writeUInt16BE(
          value,
          offset,
          noAssert
        ) {
          value = +value
          offset = offset | 0
          if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = value >>> 8
            this[offset + 1] = value & 0xff
          } else {
            objectWriteUInt16(this, value, offset, false)
          }
          return offset + 2
        }

        function objectWriteUInt32(buf, value, offset, littleEndian) {
          if (value < 0) value = 0xffffffff + value + 1
          for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
            buf[offset + i] =
              (value >>> ((littleEndian ? i : 3 - i) * 8)) & 0xff
          }
        }

        Buffer.prototype.writeUInt32LE = function writeUInt32LE(
          value,
          offset,
          noAssert
        ) {
          value = +value
          offset = offset | 0
          if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset + 3] = value >>> 24
            this[offset + 2] = value >>> 16
            this[offset + 1] = value >>> 8
            this[offset] = value & 0xff
          } else {
            objectWriteUInt32(this, value, offset, true)
          }
          return offset + 4
        }

        Buffer.prototype.writeUInt32BE = function writeUInt32BE(
          value,
          offset,
          noAssert
        ) {
          value = +value
          offset = offset | 0
          if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = value >>> 24
            this[offset + 1] = value >>> 16
            this[offset + 2] = value >>> 8
            this[offset + 3] = value & 0xff
          } else {
            objectWriteUInt32(this, value, offset, false)
          }
          return offset + 4
        }

        Buffer.prototype.writeIntLE = function writeIntLE(
          value,
          offset,
          byteLength,
          noAssert
        ) {
          value = +value
          offset = offset | 0
          if (!noAssert) {
            var limit = Math.pow(2, 8 * byteLength - 1)

            checkInt(this, value, offset, byteLength, limit - 1, -limit)
          }

          var i = 0
          var mul = 1
          var sub = 0
          this[offset] = value & 0xff
          while (++i < byteLength && (mul *= 0x100)) {
            if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
              sub = 1
            }
            this[offset + i] = (((value / mul) >> 0) - sub) & 0xff
          }

          return offset + byteLength
        }

        Buffer.prototype.writeIntBE = function writeIntBE(
          value,
          offset,
          byteLength,
          noAssert
        ) {
          value = +value
          offset = offset | 0
          if (!noAssert) {
            var limit = Math.pow(2, 8 * byteLength - 1)

            checkInt(this, value, offset, byteLength, limit - 1, -limit)
          }

          var i = byteLength - 1
          var mul = 1
          var sub = 0
          this[offset + i] = value & 0xff
          while (--i >= 0 && (mul *= 0x100)) {
            if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
              sub = 1
            }
            this[offset + i] = (((value / mul) >> 0) - sub) & 0xff
          }

          return offset + byteLength
        }

        Buffer.prototype.writeInt8 = function writeInt8(
          value,
          offset,
          noAssert
        ) {
          value = +value
          offset = offset | 0
          if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
          if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
          if (value < 0) value = 0xff + value + 1
          this[offset] = value & 0xff
          return offset + 1
        }

        Buffer.prototype.writeInt16LE = function writeInt16LE(
          value,
          offset,
          noAssert
        ) {
          value = +value
          offset = offset | 0
          if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = value & 0xff
            this[offset + 1] = value >>> 8
          } else {
            objectWriteUInt16(this, value, offset, true)
          }
          return offset + 2
        }

        Buffer.prototype.writeInt16BE = function writeInt16BE(
          value,
          offset,
          noAssert
        ) {
          value = +value
          offset = offset | 0
          if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = value >>> 8
            this[offset + 1] = value & 0xff
          } else {
            objectWriteUInt16(this, value, offset, false)
          }
          return offset + 2
        }

        Buffer.prototype.writeInt32LE = function writeInt32LE(
          value,
          offset,
          noAssert
        ) {
          value = +value
          offset = offset | 0
          if (!noAssert)
            checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = value & 0xff
            this[offset + 1] = value >>> 8
            this[offset + 2] = value >>> 16
            this[offset + 3] = value >>> 24
          } else {
            objectWriteUInt32(this, value, offset, true)
          }
          return offset + 4
        }

        Buffer.prototype.writeInt32BE = function writeInt32BE(
          value,
          offset,
          noAssert
        ) {
          value = +value
          offset = offset | 0
          if (!noAssert)
            checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
          if (value < 0) value = 0xffffffff + value + 1
          if (Buffer.TYPED_ARRAY_SUPPORT) {
            this[offset] = value >>> 24
            this[offset + 1] = value >>> 16
            this[offset + 2] = value >>> 8
            this[offset + 3] = value & 0xff
          } else {
            objectWriteUInt32(this, value, offset, false)
          }
          return offset + 4
        }

        function checkIEEE754(buf, value, offset, ext, max, min) {
          if (offset + ext > buf.length)
            throw new RangeError('Index out of range')
          if (offset < 0) throw new RangeError('Index out of range')
        }

        function writeFloat(buf, value, offset, littleEndian, noAssert) {
          if (!noAssert) {
            checkIEEE754(
              buf,
              value,
              offset,
              4,
              3.4028234663852886e38,
              -3.4028234663852886e38
            )
          }
          ieee754.write(buf, value, offset, littleEndian, 23, 4)
          return offset + 4
        }

        Buffer.prototype.writeFloatLE = function writeFloatLE(
          value,
          offset,
          noAssert
        ) {
          return writeFloat(this, value, offset, true, noAssert)
        }

        Buffer.prototype.writeFloatBE = function writeFloatBE(
          value,
          offset,
          noAssert
        ) {
          return writeFloat(this, value, offset, false, noAssert)
        }

        function writeDouble(buf, value, offset, littleEndian, noAssert) {
          if (!noAssert) {
            checkIEEE754(
              buf,
              value,
              offset,
              8,
              1.7976931348623157e308,
              -1.7976931348623157e308
            )
          }
          ieee754.write(buf, value, offset, littleEndian, 52, 8)
          return offset + 8
        }

        Buffer.prototype.writeDoubleLE = function writeDoubleLE(
          value,
          offset,
          noAssert
        ) {
          return writeDouble(this, value, offset, true, noAssert)
        }

        Buffer.prototype.writeDoubleBE = function writeDoubleBE(
          value,
          offset,
          noAssert
        ) {
          return writeDouble(this, value, offset, false, noAssert)
        }

        // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
        Buffer.prototype.copy = function copy(target, targetStart, start, end) {
          if (!start) start = 0
          if (!end && end !== 0) end = this.length
          if (targetStart >= target.length) targetStart = target.length
          if (!targetStart) targetStart = 0
          if (end > 0 && end < start) end = start

          // Copy 0 bytes; we're done
          if (end === start) return 0
          if (target.length === 0 || this.length === 0) return 0

          // Fatal error conditions
          if (targetStart < 0) {
            throw new RangeError('targetStart out of bounds')
          }
          if (start < 0 || start >= this.length)
            throw new RangeError('sourceStart out of bounds')
          if (end < 0) throw new RangeError('sourceEnd out of bounds')

          // Are we oob?
          if (end > this.length) end = this.length
          if (target.length - targetStart < end - start) {
            end = target.length - targetStart + start
          }

          var len = end - start
          var i

          if (this === target && start < targetStart && targetStart < end) {
            // descending copy from end
            for (i = len - 1; i >= 0; --i) {
              target[i + targetStart] = this[i + start]
            }
          } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
            // ascending copy from start
            for (i = 0; i < len; ++i) {
              target[i + targetStart] = this[i + start]
            }
          } else {
            Uint8Array.prototype.set.call(
              target,
              this.subarray(start, start + len),
              targetStart
            )
          }

          return len
        }

        // Usage:
        //    buffer.fill(number[, offset[, end]])
        //    buffer.fill(buffer[, offset[, end]])
        //    buffer.fill(string[, offset[, end]][, encoding])
        Buffer.prototype.fill = function fill(val, start, end, encoding) {
          // Handle string cases:
          if (typeof val === 'string') {
            if (typeof start === 'string') {
              encoding = start
              start = 0
              end = this.length
            } else if (typeof end === 'string') {
              encoding = end
              end = this.length
            }
            if (val.length === 1) {
              var code = val.charCodeAt(0)
              if (code < 256) {
                val = code
              }
            }
            if (encoding !== undefined && typeof encoding !== 'string') {
              throw new TypeError('encoding must be a string')
            }
            if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
              throw new TypeError('Unknown encoding: ' + encoding)
            }
          } else if (typeof val === 'number') {
            val = val & 255
          }

          // Invalid ranges are not set to a default, so can range check early.
          if (start < 0 || this.length < start || this.length < end) {
            throw new RangeError('Out of range index')
          }

          if (end <= start) {
            return this
          }

          start = start >>> 0
          end = end === undefined ? this.length : end >>> 0

          if (!val) val = 0

          var i
          if (typeof val === 'number') {
            for (i = start; i < end; ++i) {
              this[i] = val
            }
          } else {
            var bytes = Buffer.isBuffer(val)
              ? val
              : utf8ToBytes(new Buffer(val, encoding).toString())
            var len = bytes.length
            for (i = 0; i < end - start; ++i) {
              this[i + start] = bytes[i % len]
            }
          }

          return this
        }

        // HELPER FUNCTIONS
        // ================

        var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

        function base64clean(str) {
          // Node strips out invalid characters like \n and \t from the string, base64-js does not
          str = stringtrim(str).replace(INVALID_BASE64_RE, '')
          // Node converts strings with length < 2 to ''
          if (str.length < 2) return ''
          // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
          while (str.length % 4 !== 0) {
            str = str + '='
          }
          return str
        }

        function stringtrim(str) {
          if (str.trim) return str.trim()
          return str.replace(/^\s+|\s+$/g, '')
        }

        function toHex(n) {
          if (n < 16) return '0' + n.toString(16)
          return n.toString(16)
        }

        function utf8ToBytes(string, units) {
          units = units || Infinity
          var codePoint
          var length = string.length
          var leadSurrogate = null
          var bytes = []

          for (var i = 0; i < length; ++i) {
            codePoint = string.charCodeAt(i)

            // is surrogate component
            if (codePoint > 0xd7ff && codePoint < 0xe000) {
              // last char was a lead
              if (!leadSurrogate) {
                // no lead yet
                if (codePoint > 0xdbff) {
                  // unexpected trail
                  if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd)
                  continue
                } else if (i + 1 === length) {
                  // unpaired lead
                  if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd)
                  continue
                }

                // valid lead
                leadSurrogate = codePoint

                continue
              }

              // 2 leads in a row
              if (codePoint < 0xdc00) {
                if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd)
                leadSurrogate = codePoint
                continue
              }

              // valid surrogate pair
              codePoint =
                (((leadSurrogate - 0xd800) << 10) | (codePoint - 0xdc00)) +
                0x10000
            } else if (leadSurrogate) {
              // valid bmp char, but last char was a lead
              if ((units -= 3) > -1) bytes.push(0xef, 0xbf, 0xbd)
            }

            leadSurrogate = null

            // encode utf8
            if (codePoint < 0x80) {
              if ((units -= 1) < 0) break
              bytes.push(codePoint)
            } else if (codePoint < 0x800) {
              if ((units -= 2) < 0) break
              bytes.push((codePoint >> 0x6) | 0xc0, (codePoint & 0x3f) | 0x80)
            } else if (codePoint < 0x10000) {
              if ((units -= 3) < 0) break
              bytes.push(
                (codePoint >> 0xc) | 0xe0,
                ((codePoint >> 0x6) & 0x3f) | 0x80,
                (codePoint & 0x3f) | 0x80
              )
            } else if (codePoint < 0x110000) {
              if ((units -= 4) < 0) break
              bytes.push(
                (codePoint >> 0x12) | 0xf0,
                ((codePoint >> 0xc) & 0x3f) | 0x80,
                ((codePoint >> 0x6) & 0x3f) | 0x80,
                (codePoint & 0x3f) | 0x80
              )
            } else {
              throw new Error('Invalid code point')
            }
          }

          return bytes
        }

        function asciiToBytes(str) {
          var byteArray = []
          for (var i = 0; i < str.length; ++i) {
            // Node's code seems to be doing this and not & 0x7F..
            byteArray.push(str.charCodeAt(i) & 0xff)
          }
          return byteArray
        }

        function utf16leToBytes(str, units) {
          var c, hi, lo
          var byteArray = []
          for (var i = 0; i < str.length; ++i) {
            if ((units -= 2) < 0) break

            c = str.charCodeAt(i)
            hi = c >> 8
            lo = c % 256
            byteArray.push(lo)
            byteArray.push(hi)
          }

          return byteArray
        }

        function base64ToBytes(str) {
          return base64.toByteArray(base64clean(str))
        }

        function blitBuffer(src, dst, offset, length) {
          for (var i = 0; i < length; ++i) {
            if (i + offset >= dst.length || i >= src.length) break
            dst[i + offset] = src[i]
          }
          return i
        }

        function isnan(val) {
          return val !== val // eslint-disable-line no-self-compare
        }
      },
      {
        'base64-js': '../../../node_modules/base64-js/index.js',
        ieee754: '../../../node_modules/ieee754/index.js',
        isarray: '../../../node_modules/isarray/index.js',
        buffer: '../../../node_modules/buffer/index.js',
      },
    ],
    '../../../node_modules/protobufjs/src/util/minimal.js': [
      function(require, module, exports) {
        var global = arguments[3]
        var Buffer = require('buffer').Buffer
        ;('use strict')
        var util = exports

        // used to return a Promise where callback is omitted
        util.asPromise = require('@protobufjs/aspromise')

        // converts to / from base64 encoded strings
        util.base64 = require('@protobufjs/base64')

        // base class of rpc.Service
        util.EventEmitter = require('@protobufjs/eventemitter')

        // float handling accross browsers
        util.float = require('@protobufjs/float')

        // requires modules optionally and hides the call from bundlers
        util.inquire = require('@protobufjs/inquire')

        // converts to / from utf8 encoded strings
        util.utf8 = require('@protobufjs/utf8')

        // provides a node-like buffer pool in the browser
        util.pool = require('@protobufjs/pool')

        // utility to work with the low and high bits of a 64 bit value
        util.LongBits = require('./longbits')

        // global object reference
        util.global =
          (typeof window !== 'undefined' && window) ||
          (typeof global !== 'undefined' && global) ||
          (typeof self !== 'undefined' && self) ||
          this // eslint-disable-line no-invalid-this

        /**
         * An immuable empty array.
         * @memberof util
         * @type {Array.<*>}
         * @const
         */
        util.emptyArray = Object.freeze
          ? Object.freeze([])
          : /* istanbul ignore next */ [] // used on prototypes

        /**
         * An immutable empty object.
         * @type {Object}
         * @const
         */
        util.emptyObject = Object.freeze
          ? Object.freeze({})
          : /* istanbul ignore next */ {} // used on prototypes

        /**
         * Whether running within node or not.
         * @memberof util
         * @type {boolean}
         * @const
         */
        util.isNode = Boolean(
          util.global.process &&
            util.global.process.versions &&
            util.global.process.versions.node
        )

        /**
         * Tests if the specified value is an integer.
         * @function
         * @param {*} value Value to test
         * @returns {boolean} `true` if the value is an integer
         */
        util.isInteger =
          Number.isInteger ||
          /* istanbul ignore next */ function isInteger(value) {
            return (
              typeof value === 'number' &&
              isFinite(value) &&
              Math.floor(value) === value
            )
          }

        /**
         * Tests if the specified value is a string.
         * @param {*} value Value to test
         * @returns {boolean} `true` if the value is a string
         */
        util.isString = function isString(value) {
          return typeof value === 'string' || value instanceof String
        }

        /**
         * Tests if the specified value is a non-null object.
         * @param {*} value Value to test
         * @returns {boolean} `true` if the value is a non-null object
         */
        util.isObject = function isObject(value) {
          return value && typeof value === 'object'
        }

        /**
         * Checks if a property on a message is considered to be present.
         * This is an alias of {@link util.isSet}.
         * @function
         * @param {Object} obj Plain object or message instance
         * @param {string} prop Property name
         * @returns {boolean} `true` if considered to be present, otherwise `false`
         */
        util.isset =
          /**
           * Checks if a property on a message is considered to be present.
           * @param {Object} obj Plain object or message instance
           * @param {string} prop Property name
           * @returns {boolean} `true` if considered to be present, otherwise `false`
           */
          util.isSet = function isSet(obj, prop) {
            var value = obj[prop]
            if (value != null && obj.hasOwnProperty(prop))
              // eslint-disable-line eqeqeq, no-prototype-builtins
              return (
                typeof value !== 'object' ||
                (Array.isArray(value)
                  ? value.length
                  : Object.keys(value).length) > 0
              )
            return false
          }

        /**
         * Any compatible Buffer instance.
         * This is a minimal stand-alone definition of a Buffer instance. The actual type is that exported by node's typings.
         * @interface Buffer
         * @extends Uint8Array
         */

        /**
         * Node's Buffer class if available.
         * @type {Constructor<Buffer>}
         */
        util.Buffer = (function() {
          try {
            var Buffer = util.inquire('buffer').Buffer
            // refuse to use non-node buffers if not explicitly assigned (perf reasons):
            return Buffer.prototype.utf8Write
              ? Buffer
              : /* istanbul ignore next */ null
          } catch (e) {
            /* istanbul ignore next */
            return null
          }
        })()

        // Internal alias of or polyfull for Buffer.from.
        util._Buffer_from = null

        // Internal alias of or polyfill for Buffer.allocUnsafe.
        util._Buffer_allocUnsafe = null

        /**
         * Creates a new buffer of whatever type supported by the environment.
         * @param {number|number[]} [sizeOrArray=0] Buffer size or number array
         * @returns {Uint8Array|Buffer} Buffer
         */
        util.newBuffer = function newBuffer(sizeOrArray) {
          /* istanbul ignore next */
          return typeof sizeOrArray === 'number'
            ? util.Buffer
              ? util._Buffer_allocUnsafe(sizeOrArray)
              : new util.Array(sizeOrArray)
            : util.Buffer
              ? util._Buffer_from(sizeOrArray)
              : typeof Uint8Array === 'undefined'
                ? sizeOrArray
                : new Uint8Array(sizeOrArray)
        }

        /**
         * Array implementation used in the browser. `Uint8Array` if supported, otherwise `Array`.
         * @type {Constructor<Uint8Array>}
         */
        util.Array =
          typeof Uint8Array !== 'undefined'
            ? Uint8Array /* istanbul ignore next */
            : Array

        /**
         * Any compatible Long instance.
         * This is a minimal stand-alone definition of a Long instance. The actual type is that exported by long.js.
         * @interface Long
         * @property {number} low Low bits
         * @property {number} high High bits
         * @property {boolean} unsigned Whether unsigned or not
         */

        /**
         * Long.js's Long class if available.
         * @type {Constructor<Long>}
         */
        util.Long =
          /* istanbul ignore next */ (util.global.dcodeIO &&
            /* istanbul ignore next */ util.global.dcodeIO.Long) ||
          /* istanbul ignore next */ util.global.Long ||
          util.inquire('long')

        /**
         * Regular expression used to verify 2 bit (`bool`) map keys.
         * @type {RegExp}
         * @const
         */
        util.key2Re = /^true|false|0|1$/

        /**
         * Regular expression used to verify 32 bit (`int32` etc.) map keys.
         * @type {RegExp}
         * @const
         */
        util.key32Re = /^-?(?:0|[1-9][0-9]*)$/

        /**
         * Regular expression used to verify 64 bit (`int64` etc.) map keys.
         * @type {RegExp}
         * @const
         */
        util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/

        /**
         * Converts a number or long to an 8 characters long hash string.
         * @param {Long|number} value Value to convert
         * @returns {string} Hash
         */
        util.longToHash = function longToHash(value) {
          return value
            ? util.LongBits.from(value).toHash()
            : util.LongBits.zeroHash
        }

        /**
         * Converts an 8 characters long hash string to a long or number.
         * @param {string} hash Hash
         * @param {boolean} [unsigned=false] Whether unsigned or not
         * @returns {Long|number} Original value
         */
        util.longFromHash = function longFromHash(hash, unsigned) {
          var bits = util.LongBits.fromHash(hash)
          if (util.Long) return util.Long.fromBits(bits.lo, bits.hi, unsigned)
          return bits.toNumber(Boolean(unsigned))
        }

        /**
         * Merges the properties of the source object into the destination object.
         * @memberof util
         * @param {Object.<string,*>} dst Destination object
         * @param {Object.<string,*>} src Source object
         * @param {boolean} [ifNotSet=false] Merges only if the key is not already set
         * @returns {Object.<string,*>} Destination object
         */
        function merge(dst, src, ifNotSet) {
          // used by converters
          for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
            if (dst[keys[i]] === undefined || !ifNotSet)
              dst[keys[i]] = src[keys[i]]
          return dst
        }

        util.merge = merge

        /**
         * Converts the first character of a string to lower case.
         * @param {string} str String to convert
         * @returns {string} Converted string
         */
        util.lcFirst = function lcFirst(str) {
          return str.charAt(0).toLowerCase() + str.substring(1)
        }

        /**
         * Creates a custom error constructor.
         * @memberof util
         * @param {string} name Error name
         * @returns {Constructor<Error>} Custom error constructor
         */
        function newError(name) {
          function CustomError(message, properties) {
            if (!(this instanceof CustomError))
              return new CustomError(message, properties)

            // Error.call(this, message);
            // ^ just returns a new error instance because the ctor can be called as a function

            Object.defineProperty(this, 'message', {
              get: function() {
                return message
              },
            })

            /* istanbul ignore next */
            if (Error.captureStackTrace)
              // node
              Error.captureStackTrace(this, CustomError)
            else
              Object.defineProperty(this, 'stack', {
                value: new Error().stack || '',
              })

            if (properties) merge(this, properties)
          }

          ;(CustomError.prototype = Object.create(
            Error.prototype
          )).constructor = CustomError

          Object.defineProperty(CustomError.prototype, 'name', {
            get: function() {
              return name
            },
          })

          CustomError.prototype.toString = function toString() {
            return this.name + ': ' + this.message
          }

          return CustomError
        }

        util.newError = newError

        /**
         * Constructs a new protocol error.
         * @classdesc Error subclass indicating a protocol specifc error.
         * @memberof util
         * @extends Error
         * @template T extends Message<T>
         * @constructor
         * @param {string} message Error message
         * @param {Object.<string,*>} [properties] Additional properties
         * @example
         * try {
         *     MyMessage.decode(someBuffer); // throws if required fields are missing
         * } catch (e) {
         *     if (e instanceof ProtocolError && e.instance)
         *         console.log("decoded so far: " + JSON.stringify(e.instance));
         * }
         */
        util.ProtocolError = newError('ProtocolError')

        /**
         * So far decoded message instance.
         * @name util.ProtocolError#instance
         * @type {Message<T>}
         */

        /**
         * A OneOf getter as returned by {@link util.oneOfGetter}.
         * @typedef OneOfGetter
         * @type {function}
         * @returns {string|undefined} Set field name, if any
         */

        /**
         * Builds a getter for a oneof's present field name.
         * @param {string[]} fieldNames Field names
         * @returns {OneOfGetter} Unbound getter
         */
        util.oneOfGetter = function getOneOf(fieldNames) {
          var fieldMap = {}
          for (var i = 0; i < fieldNames.length; ++i)
            fieldMap[fieldNames[i]] = 1

          /**
           * @returns {string|undefined} Set field name, if any
           * @this Object
           * @ignore
           */
          return function() {
            // eslint-disable-line consistent-return
            for (var keys = Object.keys(this), i = keys.length - 1; i > -1; --i)
              if (
                fieldMap[keys[i]] === 1 &&
                this[keys[i]] !== undefined &&
                this[keys[i]] !== null
              )
                return keys[i]
          }
        }

        /**
         * A OneOf setter as returned by {@link util.oneOfSetter}.
         * @typedef OneOfSetter
         * @type {function}
         * @param {string|undefined} value Field name
         * @returns {undefined}
         */

        /**
         * Builds a setter for a oneof's present field name.
         * @param {string[]} fieldNames Field names
         * @returns {OneOfSetter} Unbound setter
         */
        util.oneOfSetter = function setOneOf(fieldNames) {
          /**
           * @param {string} name Field name
           * @returns {undefined}
           * @this Object
           * @ignore
           */
          return function(name) {
            for (var i = 0; i < fieldNames.length; ++i)
              if (fieldNames[i] !== name) delete this[fieldNames[i]]
          }
        }

        /**
         * Default conversion options used for {@link Message#toJSON} implementations.
         *
         * These options are close to proto3's JSON mapping with the exception that internal types like Any are handled just like messages. More precisely:
         *
         * - Longs become strings
         * - Enums become string keys
         * - Bytes become base64 encoded strings
         * - (Sub-)Messages become plain objects
         * - Maps become plain objects with all string keys
         * - Repeated fields become arrays
         * - NaN and Infinity for float and double fields become strings
         *
         * @type {IConversionOptions}
         * @see https://developers.google.com/protocol-buffers/docs/proto3?hl=en#json
         */
        util.toJSONOptions = {
          longs: String,
          enums: String,
          bytes: String,
          json: true,
        }

        // Sets up buffer utility according to the environment (called in index-minimal)
        util._configure = function() {
          var Buffer = util.Buffer
          /* istanbul ignore if */
          if (!Buffer) {
            util._Buffer_from = util._Buffer_allocUnsafe = null
            return
          }
          // because node 4.x buffers are incompatible & immutable
          // see: https://github.com/dcodeIO/protobuf.js/pull/665
          util._Buffer_from =
            (Buffer.from !== Uint8Array.from && Buffer.from) ||
            /* istanbul ignore next */
            function Buffer_from(value, encoding) {
              return new Buffer(value, encoding)
            }
          util._Buffer_allocUnsafe =
            Buffer.allocUnsafe ||
            /* istanbul ignore next */
            function Buffer_allocUnsafe(size) {
              return new Buffer(size)
            }
        }
      },
      {
        '@protobufjs/aspromise':
          '../../../node_modules/@protobufjs/aspromise/index.js',
        '@protobufjs/base64':
          '../../../node_modules/@protobufjs/base64/index.js',
        '@protobufjs/eventemitter':
          '../../../node_modules/@protobufjs/eventemitter/index.js',
        '@protobufjs/float': '../../../node_modules/@protobufjs/float/index.js',
        '@protobufjs/inquire':
          '../../../node_modules/@protobufjs/inquire/index.js',
        '@protobufjs/utf8': '../../../node_modules/@protobufjs/utf8/index.js',
        '@protobufjs/pool': '../../../node_modules/@protobufjs/pool/index.js',
        './longbits': '../../../node_modules/protobufjs/src/util/longbits.js',
        buffer: '../../../node_modules/buffer/index.js',
      },
    ],
    '../../../node_modules/protobufjs/src/writer.js': [
      function(require, module, exports) {
        'use strict'
        module.exports = Writer

        var util = require('./util/minimal')

        var BufferWriter // cyclic

        var LongBits = util.LongBits,
          base64 = util.base64,
          utf8 = util.utf8

        /**
         * Constructs a new writer operation instance.
         * @classdesc Scheduled writer operation.
         * @constructor
         * @param {function(*, Uint8Array, number)} fn Function to call
         * @param {number} len Value byte length
         * @param {*} val Value to write
         * @ignore
         */
        function Op(fn, len, val) {
          /**
           * Function to call.
           * @type {function(Uint8Array, number, *)}
           */
          this.fn = fn

          /**
           * Value byte length.
           * @type {number}
           */
          this.len = len

          /**
           * Next operation.
           * @type {Writer.Op|undefined}
           */
          this.next = undefined

          /**
           * Value to write.
           * @type {*}
           */
          this.val = val // type varies
        }

        /* istanbul ignore next */
        function noop() {} // eslint-disable-line no-empty-function

        /**
         * Constructs a new writer state instance.
         * @classdesc Copied writer state.
         * @memberof Writer
         * @constructor
         * @param {Writer} writer Writer to copy state from
         * @ignore
         */
        function State(writer) {
          /**
           * Current head.
           * @type {Writer.Op}
           */
          this.head = writer.head

          /**
           * Current tail.
           * @type {Writer.Op}
           */
          this.tail = writer.tail

          /**
           * Current buffer length.
           * @type {number}
           */
          this.len = writer.len

          /**
           * Next state.
           * @type {State|null}
           */
          this.next = writer.states
        }

        /**
         * Constructs a new writer instance.
         * @classdesc Wire format writer using `Uint8Array` if available, otherwise `Array`.
         * @constructor
         */
        function Writer() {
          /**
           * Current length.
           * @type {number}
           */
          this.len = 0

          /**
           * Operations head.
           * @type {Object}
           */
          this.head = new Op(noop, 0, 0)

          /**
           * Operations tail
           * @type {Object}
           */
          this.tail = this.head

          /**
           * Linked forked states.
           * @type {Object|null}
           */
          this.states = null

          // When a value is written, the writer calculates its byte length and puts it into a linked
          // list of operations to perform when finish() is called. This both allows us to allocate
          // buffers of the exact required size and reduces the amount of work we have to do compared
          // to first calculating over objects and then encoding over objects. In our case, the encoding
          // part is just a linked list walk calling operations with already prepared values.
        }

        /**
         * Creates a new writer.
         * @function
         * @returns {BufferWriter|Writer} A {@link BufferWriter} when Buffers are supported, otherwise a {@link Writer}
         */
        Writer.create = util.Buffer
          ? function create_buffer_setup() {
              return (Writer.create = function create_buffer() {
                return new BufferWriter()
              })()
            }
          : /* istanbul ignore next */
            function create_array() {
              return new Writer()
            }

        /**
         * Allocates a buffer of the specified size.
         * @param {number} size Buffer size
         * @returns {Uint8Array} Buffer
         */
        Writer.alloc = function alloc(size) {
          return new util.Array(size)
        }

        // Use Uint8Array buffer pool in the browser, just like node does with buffers
        /* istanbul ignore else */
        if (util.Array !== Array)
          Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray)

        /**
         * Pushes a new operation to the queue.
         * @param {function(Uint8Array, number, *)} fn Function to call
         * @param {number} len Value byte length
         * @param {number} val Value to write
         * @returns {Writer} `this`
         * @private
         */
        Writer.prototype._push = function push(fn, len, val) {
          this.tail = this.tail.next = new Op(fn, len, val)
          this.len += len
          return this
        }

        function writeByte(val, buf, pos) {
          buf[pos] = val & 255
        }

        function writeVarint32(val, buf, pos) {
          while (val > 127) {
            buf[pos++] = (val & 127) | 128
            val >>>= 7
          }
          buf[pos] = val
        }

        /**
         * Constructs a new varint writer operation instance.
         * @classdesc Scheduled varint writer operation.
         * @extends Op
         * @constructor
         * @param {number} len Value byte length
         * @param {number} val Value to write
         * @ignore
         */
        function VarintOp(len, val) {
          this.len = len
          this.next = undefined
          this.val = val
        }

        VarintOp.prototype = Object.create(Op.prototype)
        VarintOp.prototype.fn = writeVarint32

        /**
         * Writes an unsigned 32 bit value as a varint.
         * @param {number} value Value to write
         * @returns {Writer} `this`
         */
        Writer.prototype.uint32 = function write_uint32(value) {
          // here, the call to this.push has been inlined and a varint specific Op subclass is used.
          // uint32 is by far the most frequently used operation and benefits significantly from this.
          this.len += (this.tail = this.tail.next = new VarintOp(
            (value = value >>> 0) < 128
              ? 1
              : value < 16384
                ? 2
                : value < 2097152
                  ? 3
                  : value < 268435456
                    ? 4
                    : 5,
            value
          )).len
          return this
        }

        /**
         * Writes a signed 32 bit value as a varint.
         * @function
         * @param {number} value Value to write
         * @returns {Writer} `this`
         */
        Writer.prototype.int32 = function write_int32(value) {
          return value < 0
            ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) // 10 bytes per spec
            : this.uint32(value)
        }

        /**
         * Writes a 32 bit value as a varint, zig-zag encoded.
         * @param {number} value Value to write
         * @returns {Writer} `this`
         */
        Writer.prototype.sint32 = function write_sint32(value) {
          return this.uint32(((value << 1) ^ (value >> 31)) >>> 0)
        }

        function writeVarint64(val, buf, pos) {
          while (val.hi) {
            buf[pos++] = (val.lo & 127) | 128
            val.lo = ((val.lo >>> 7) | (val.hi << 25)) >>> 0
            val.hi >>>= 7
          }
          while (val.lo > 127) {
            buf[pos++] = (val.lo & 127) | 128
            val.lo = val.lo >>> 7
          }
          buf[pos++] = val.lo
        }

        /**
         * Writes an unsigned 64 bit value as a varint.
         * @param {Long|number|string} value Value to write
         * @returns {Writer} `this`
         * @throws {TypeError} If `value` is a string and no long library is present.
         */
        Writer.prototype.uint64 = function write_uint64(value) {
          var bits = LongBits.from(value)
          return this._push(writeVarint64, bits.length(), bits)
        }

        /**
         * Writes a signed 64 bit value as a varint.
         * @function
         * @param {Long|number|string} value Value to write
         * @returns {Writer} `this`
         * @throws {TypeError} If `value` is a string and no long library is present.
         */
        Writer.prototype.int64 = Writer.prototype.uint64

        /**
         * Writes a signed 64 bit value as a varint, zig-zag encoded.
         * @param {Long|number|string} value Value to write
         * @returns {Writer} `this`
         * @throws {TypeError} If `value` is a string and no long library is present.
         */
        Writer.prototype.sint64 = function write_sint64(value) {
          var bits = LongBits.from(value).zzEncode()
          return this._push(writeVarint64, bits.length(), bits)
        }

        /**
         * Writes a boolish value as a varint.
         * @param {boolean} value Value to write
         * @returns {Writer} `this`
         */
        Writer.prototype.bool = function write_bool(value) {
          return this._push(writeByte, 1, value ? 1 : 0)
        }

        function writeFixed32(val, buf, pos) {
          buf[pos] = val & 255
          buf[pos + 1] = (val >>> 8) & 255
          buf[pos + 2] = (val >>> 16) & 255
          buf[pos + 3] = val >>> 24
        }

        /**
         * Writes an unsigned 32 bit value as fixed 32 bits.
         * @param {number} value Value to write
         * @returns {Writer} `this`
         */
        Writer.prototype.fixed32 = function write_fixed32(value) {
          return this._push(writeFixed32, 4, value >>> 0)
        }

        /**
         * Writes a signed 32 bit value as fixed 32 bits.
         * @function
         * @param {number} value Value to write
         * @returns {Writer} `this`
         */
        Writer.prototype.sfixed32 = Writer.prototype.fixed32

        /**
         * Writes an unsigned 64 bit value as fixed 64 bits.
         * @param {Long|number|string} value Value to write
         * @returns {Writer} `this`
         * @throws {TypeError} If `value` is a string and no long library is present.
         */
        Writer.prototype.fixed64 = function write_fixed64(value) {
          var bits = LongBits.from(value)
          return this._push(writeFixed32, 4, bits.lo)._push(
            writeFixed32,
            4,
            bits.hi
          )
        }

        /**
         * Writes a signed 64 bit value as fixed 64 bits.
         * @function
         * @param {Long|number|string} value Value to write
         * @returns {Writer} `this`
         * @throws {TypeError} If `value` is a string and no long library is present.
         */
        Writer.prototype.sfixed64 = Writer.prototype.fixed64

        /**
         * Writes a float (32 bit).
         * @function
         * @param {number} value Value to write
         * @returns {Writer} `this`
         */
        Writer.prototype.float = function write_float(value) {
          return this._push(util.float.writeFloatLE, 4, value)
        }

        /**
         * Writes a double (64 bit float).
         * @function
         * @param {number} value Value to write
         * @returns {Writer} `this`
         */
        Writer.prototype.double = function write_double(value) {
          return this._push(util.float.writeDoubleLE, 8, value)
        }

        var writeBytes = util.Array.prototype.set
          ? function writeBytes_set(val, buf, pos) {
              buf.set(val, pos) // also works for plain array values
            }
          : /* istanbul ignore next */
            function writeBytes_for(val, buf, pos) {
              for (var i = 0; i < val.length; ++i) buf[pos + i] = val[i]
            }

        /**
         * Writes a sequence of bytes.
         * @param {Uint8Array|string} value Buffer or base64 encoded string to write
         * @returns {Writer} `this`
         */
        Writer.prototype.bytes = function write_bytes(value) {
          var len = value.length >>> 0
          if (!len) return this._push(writeByte, 1, 0)
          if (util.isString(value)) {
            var buf = Writer.alloc((len = base64.length(value)))
            base64.decode(value, buf, 0)
            value = buf
          }
          return this.uint32(len)._push(writeBytes, len, value)
        }

        /**
         * Writes a string.
         * @param {string} value Value to write
         * @returns {Writer} `this`
         */
        Writer.prototype.string = function write_string(value) {
          var len = utf8.length(value)
          return len
            ? this.uint32(len)._push(utf8.write, len, value)
            : this._push(writeByte, 1, 0)
        }

        /**
         * Forks this writer's state by pushing it to a stack.
         * Calling {@link Writer#reset|reset} or {@link Writer#ldelim|ldelim} resets the writer to the previous state.
         * @returns {Writer} `this`
         */
        Writer.prototype.fork = function fork() {
          this.states = new State(this)
          this.head = this.tail = new Op(noop, 0, 0)
          this.len = 0
          return this
        }

        /**
         * Resets this instance to the last state.
         * @returns {Writer} `this`
         */
        Writer.prototype.reset = function reset() {
          if (this.states) {
            this.head = this.states.head
            this.tail = this.states.tail
            this.len = this.states.len
            this.states = this.states.next
          } else {
            this.head = this.tail = new Op(noop, 0, 0)
            this.len = 0
          }
          return this
        }

        /**
         * Resets to the last state and appends the fork state's current write length as a varint followed by its operations.
         * @returns {Writer} `this`
         */
        Writer.prototype.ldelim = function ldelim() {
          var head = this.head,
            tail = this.tail,
            len = this.len
          this.reset().uint32(len)
          if (len) {
            this.tail.next = head.next // skip noop
            this.tail = tail
            this.len += len
          }
          return this
        }

        /**
         * Finishes the write operation.
         * @returns {Uint8Array} Finished buffer
         */
        Writer.prototype.finish = function finish() {
          var head = this.head.next, // skip noop
            buf = this.constructor.alloc(this.len),
            pos = 0
          while (head) {
            head.fn(head.val, buf, pos)
            pos += head.len
            head = head.next
          }
          // this.head = this.tail = null;
          return buf
        }

        Writer._configure = function(BufferWriter_) {
          BufferWriter = BufferWriter_
        }
      },
      {
        './util/minimal':
          '../../../node_modules/protobufjs/src/util/minimal.js',
      },
    ],
    '../../../node_modules/protobufjs/src/writer_buffer.js': [
      function(require, module, exports) {
        'use strict'
        module.exports = BufferWriter

        // extends Writer
        var Writer = require('./writer')
        ;(BufferWriter.prototype = Object.create(
          Writer.prototype
        )).constructor = BufferWriter

        var util = require('./util/minimal')

        var Buffer = util.Buffer

        /**
         * Constructs a new buffer writer instance.
         * @classdesc Wire format writer using node buffers.
         * @extends Writer
         * @constructor
         */
        function BufferWriter() {
          Writer.call(this)
        }

        /**
         * Allocates a buffer of the specified size.
         * @param {number} size Buffer size
         * @returns {Buffer} Buffer
         */
        BufferWriter.alloc = function alloc_buffer(size) {
          return (BufferWriter.alloc = util._Buffer_allocUnsafe)(size)
        }

        var writeBytesBuffer =
          Buffer &&
          Buffer.prototype instanceof Uint8Array &&
          Buffer.prototype.set.name === 'set'
            ? function writeBytesBuffer_set(val, buf, pos) {
                buf.set(val, pos) // faster than copy (requires node >= 4 where Buffers extend Uint8Array and set is properly inherited)
                // also works for plain array values
              }
            : /* istanbul ignore next */
              function writeBytesBuffer_copy(val, buf, pos) {
                if (val.copy)
                  // Buffer values
                  val.copy(buf, pos, 0, val.length)
                else
                  for (
                    var i = 0;
                    i < val.length; // plain array values

                  )
                    buf[pos++] = val[i++]
              }

        /**
         * @override
         */
        BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
          if (util.isString(value)) value = util._Buffer_from(value, 'base64')
          var len = value.length >>> 0
          this.uint32(len)
          if (len) this._push(writeBytesBuffer, len, value)
          return this
        }

        function writeStringBuffer(val, buf, pos) {
          if (val.length < 40)
            // plain js is faster for short strings (probably due to redundant assertions)
            util.utf8.write(val, buf, pos)
          else buf.utf8Write(val, pos)
        }

        /**
         * @override
         */
        BufferWriter.prototype.string = function write_string_buffer(value) {
          var len = Buffer.byteLength(value)
          this.uint32(len)
          if (len) this._push(writeStringBuffer, len, value)
          return this
        }

        /**
         * Finishes the write operation.
         * @name BufferWriter#finish
         * @function
         * @returns {Buffer} Finished buffer
         */
      },
      {
        './writer': '../../../node_modules/protobufjs/src/writer.js',
        './util/minimal':
          '../../../node_modules/protobufjs/src/util/minimal.js',
      },
    ],
    '../../../node_modules/protobufjs/src/reader.js': [
      function(require, module, exports) {
        'use strict'
        module.exports = Reader

        var util = require('./util/minimal')

        var BufferReader // cyclic

        var LongBits = util.LongBits,
          utf8 = util.utf8

        /* istanbul ignore next */
        function indexOutOfRange(reader, writeLength) {
          return RangeError(
            'index out of range: ' +
              reader.pos +
              ' + ' +
              (writeLength || 1) +
              ' > ' +
              reader.len
          )
        }

        /**
         * Constructs a new reader instance using the specified buffer.
         * @classdesc Wire format reader using `Uint8Array` if available, otherwise `Array`.
         * @constructor
         * @param {Uint8Array} buffer Buffer to read from
         */
        function Reader(buffer) {
          /**
           * Read buffer.
           * @type {Uint8Array}
           */
          this.buf = buffer

          /**
           * Read buffer position.
           * @type {number}
           */
          this.pos = 0

          /**
           * Read buffer length.
           * @type {number}
           */
          this.len = buffer.length
        }

        var create_array =
          typeof Uint8Array !== 'undefined'
            ? function create_typed_array(buffer) {
                if (buffer instanceof Uint8Array || Array.isArray(buffer))
                  return new Reader(buffer)
                throw Error('illegal buffer')
              }
            : /* istanbul ignore next */
              function create_array(buffer) {
                if (Array.isArray(buffer)) return new Reader(buffer)
                throw Error('illegal buffer')
              }

        /**
         * Creates a new reader using the specified buffer.
         * @function
         * @param {Uint8Array|Buffer} buffer Buffer to read from
         * @returns {Reader|BufferReader} A {@link BufferReader} if `buffer` is a Buffer, otherwise a {@link Reader}
         * @throws {Error} If `buffer` is not a valid buffer
         */
        Reader.create = util.Buffer
          ? function create_buffer_setup(buffer) {
              return (Reader.create = function create_buffer(buffer) {
                return util.Buffer.isBuffer(buffer)
                  ? new BufferReader(buffer)
                  : /* istanbul ignore next */
                    create_array(buffer)
              })(buffer)
            }
          : /* istanbul ignore next */
            create_array

        Reader.prototype._slice =
          util.Array.prototype.subarray ||
          /* istanbul ignore next */ util.Array.prototype.slice

        /**
         * Reads a varint as an unsigned 32 bit value.
         * @function
         * @returns {number} Value read
         */
        Reader.prototype.uint32 = (function read_uint32_setup() {
          var value = 4294967295 // optimizer type-hint, tends to deopt otherwise (?!)
          return function read_uint32() {
            value = (this.buf[this.pos] & 127) >>> 0
            if (this.buf[this.pos++] < 128) return value
            value = (value | ((this.buf[this.pos] & 127) << 7)) >>> 0
            if (this.buf[this.pos++] < 128) return value
            value = (value | ((this.buf[this.pos] & 127) << 14)) >>> 0
            if (this.buf[this.pos++] < 128) return value
            value = (value | ((this.buf[this.pos] & 127) << 21)) >>> 0
            if (this.buf[this.pos++] < 128) return value
            value = (value | ((this.buf[this.pos] & 15) << 28)) >>> 0
            if (this.buf[this.pos++] < 128) return value

            /* istanbul ignore if */
            if ((this.pos += 5) > this.len) {
              this.pos = this.len
              throw indexOutOfRange(this, 10)
            }
            return value
          }
        })()

        /**
         * Reads a varint as a signed 32 bit value.
         * @returns {number} Value read
         */
        Reader.prototype.int32 = function read_int32() {
          return this.uint32() | 0
        }

        /**
         * Reads a zig-zag encoded varint as a signed 32 bit value.
         * @returns {number} Value read
         */
        Reader.prototype.sint32 = function read_sint32() {
          var value = this.uint32()
          return ((value >>> 1) ^ -(value & 1)) | 0
        }

        /* eslint-disable no-invalid-this */

        function readLongVarint() {
          // tends to deopt with local vars for octet etc.
          var bits = new LongBits(0, 0)
          var i = 0
          if (this.len - this.pos > 4) {
            // fast route (lo)
            for (; i < 4; ++i) {
              // 1st..4th
              bits.lo =
                (bits.lo | ((this.buf[this.pos] & 127) << (i * 7))) >>> 0
              if (this.buf[this.pos++] < 128) return bits
            }
            // 5th
            bits.lo = (bits.lo | ((this.buf[this.pos] & 127) << 28)) >>> 0
            bits.hi = (bits.hi | ((this.buf[this.pos] & 127) >> 4)) >>> 0
            if (this.buf[this.pos++] < 128) return bits
            i = 0
          } else {
            for (; i < 3; ++i) {
              /* istanbul ignore if */
              if (this.pos >= this.len) throw indexOutOfRange(this)
              // 1st..3th
              bits.lo =
                (bits.lo | ((this.buf[this.pos] & 127) << (i * 7))) >>> 0
              if (this.buf[this.pos++] < 128) return bits
            }
            // 4th
            bits.lo =
              (bits.lo | ((this.buf[this.pos++] & 127) << (i * 7))) >>> 0
            return bits
          }
          if (this.len - this.pos > 4) {
            // fast route (hi)
            for (; i < 5; ++i) {
              // 6th..10th
              bits.hi =
                (bits.hi | ((this.buf[this.pos] & 127) << (i * 7 + 3))) >>> 0
              if (this.buf[this.pos++] < 128) return bits
            }
          } else {
            for (; i < 5; ++i) {
              /* istanbul ignore if */
              if (this.pos >= this.len) throw indexOutOfRange(this)
              // 6th..10th
              bits.hi =
                (bits.hi | ((this.buf[this.pos] & 127) << (i * 7 + 3))) >>> 0
              if (this.buf[this.pos++] < 128) return bits
            }
          }
          /* istanbul ignore next */
          throw Error('invalid varint encoding')
        }

        /* eslint-enable no-invalid-this */

        /**
         * Reads a varint as a signed 64 bit value.
         * @name Reader#int64
         * @function
         * @returns {Long} Value read
         */

        /**
         * Reads a varint as an unsigned 64 bit value.
         * @name Reader#uint64
         * @function
         * @returns {Long} Value read
         */

        /**
         * Reads a zig-zag encoded varint as a signed 64 bit value.
         * @name Reader#sint64
         * @function
         * @returns {Long} Value read
         */

        /**
         * Reads a varint as a boolean.
         * @returns {boolean} Value read
         */
        Reader.prototype.bool = function read_bool() {
          return this.uint32() !== 0
        }

        function readFixed32_end(buf, end) {
          // note that this uses `end`, not `pos`
          return (
            (buf[end - 4] |
              (buf[end - 3] << 8) |
              (buf[end - 2] << 16) |
              (buf[end - 1] << 24)) >>>
            0
          )
        }

        /**
         * Reads fixed 32 bits as an unsigned 32 bit integer.
         * @returns {number} Value read
         */
        Reader.prototype.fixed32 = function read_fixed32() {
          /* istanbul ignore if */
          if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4)

          return readFixed32_end(this.buf, (this.pos += 4))
        }

        /**
         * Reads fixed 32 bits as a signed 32 bit integer.
         * @returns {number} Value read
         */
        Reader.prototype.sfixed32 = function read_sfixed32() {
          /* istanbul ignore if */
          if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4)

          return readFixed32_end(this.buf, (this.pos += 4)) | 0
        }

        /* eslint-disable no-invalid-this */

        function readFixed64(/* this: Reader */) {
          /* istanbul ignore if */
          if (this.pos + 8 > this.len) throw indexOutOfRange(this, 8)

          return new LongBits(
            readFixed32_end(this.buf, (this.pos += 4)),
            readFixed32_end(this.buf, (this.pos += 4))
          )
        }

        /* eslint-enable no-invalid-this */

        /**
         * Reads fixed 64 bits.
         * @name Reader#fixed64
         * @function
         * @returns {Long} Value read
         */

        /**
         * Reads zig-zag encoded fixed 64 bits.
         * @name Reader#sfixed64
         * @function
         * @returns {Long} Value read
         */

        /**
         * Reads a float (32 bit) as a number.
         * @function
         * @returns {number} Value read
         */
        Reader.prototype.float = function read_float() {
          /* istanbul ignore if */
          if (this.pos + 4 > this.len) throw indexOutOfRange(this, 4)

          var value = util.float.readFloatLE(this.buf, this.pos)
          this.pos += 4
          return value
        }

        /**
         * Reads a double (64 bit float) as a number.
         * @function
         * @returns {number} Value read
         */
        Reader.prototype.double = function read_double() {
          /* istanbul ignore if */
          if (this.pos + 8 > this.len) throw indexOutOfRange(this, 4)

          var value = util.float.readDoubleLE(this.buf, this.pos)
          this.pos += 8
          return value
        }

        /**
         * Reads a sequence of bytes preceeded by its length as a varint.
         * @returns {Uint8Array} Value read
         */
        Reader.prototype.bytes = function read_bytes() {
          var length = this.uint32(),
            start = this.pos,
            end = this.pos + length

          /* istanbul ignore if */
          if (end > this.len) throw indexOutOfRange(this, length)

          this.pos += length
          if (Array.isArray(this.buf))
            // plain array
            return this.buf.slice(start, end)
          return start === end // fix for IE 10/Win8 and others' subarray returning array of size 1
            ? new this.buf.constructor(0)
            : this._slice.call(this.buf, start, end)
        }

        /**
         * Reads a string preceeded by its byte length as a varint.
         * @returns {string} Value read
         */
        Reader.prototype.string = function read_string() {
          var bytes = this.bytes()
          return utf8.read(bytes, 0, bytes.length)
        }

        /**
         * Skips the specified number of bytes if specified, otherwise skips a varint.
         * @param {number} [length] Length if known, otherwise a varint is assumed
         * @returns {Reader} `this`
         */
        Reader.prototype.skip = function skip(length) {
          if (typeof length === 'number') {
            /* istanbul ignore if */
            if (this.pos + length > this.len)
              throw indexOutOfRange(this, length)
            this.pos += length
          } else {
            do {
              /* istanbul ignore if */
              if (this.pos >= this.len) throw indexOutOfRange(this)
            } while (this.buf[this.pos++] & 128)
          }
          return this
        }

        /**
         * Skips the next element of the specified wire type.
         * @param {number} wireType Wire type received
         * @returns {Reader} `this`
         */
        Reader.prototype.skipType = function(wireType) {
          switch (wireType) {
            case 0:
              this.skip()
              break
            case 1:
              this.skip(8)
              break
            case 2:
              this.skip(this.uint32())
              break
            case 3:
              while ((wireType = this.uint32() & 7) !== 4) {
                this.skipType(wireType)
              }
              break
            case 5:
              this.skip(4)
              break

            /* istanbul ignore next */
            default:
              throw Error(
                'invalid wire type ' + wireType + ' at offset ' + this.pos
              )
          }
          return this
        }

        Reader._configure = function(BufferReader_) {
          BufferReader = BufferReader_

          var fn = util.Long ? 'toLong' : /* istanbul ignore next */ 'toNumber'
          util.merge(Reader.prototype, {
            int64: function read_int64() {
              return readLongVarint.call(this)[fn](false)
            },

            uint64: function read_uint64() {
              return readLongVarint.call(this)[fn](true)
            },

            sint64: function read_sint64() {
              return readLongVarint
                .call(this)
                .zzDecode()
                [fn](false)
            },

            fixed64: function read_fixed64() {
              return readFixed64.call(this)[fn](true)
            },

            sfixed64: function read_sfixed64() {
              return readFixed64.call(this)[fn](false)
            },
          })
        }
      },
      {
        './util/minimal':
          '../../../node_modules/protobufjs/src/util/minimal.js',
      },
    ],
    '../../../node_modules/protobufjs/src/reader_buffer.js': [
      function(require, module, exports) {
        'use strict'
        module.exports = BufferReader

        // extends Reader
        var Reader = require('./reader')
        ;(BufferReader.prototype = Object.create(
          Reader.prototype
        )).constructor = BufferReader

        var util = require('./util/minimal')

        /**
         * Constructs a new buffer reader instance.
         * @classdesc Wire format reader using node buffers.
         * @extends Reader
         * @constructor
         * @param {Buffer} buffer Buffer to read from
         */
        function BufferReader(buffer) {
          Reader.call(this, buffer)

          /**
           * Read buffer.
           * @name BufferReader#buf
           * @type {Buffer}
           */
        }

        /* istanbul ignore else */
        if (util.Buffer)
          BufferReader.prototype._slice = util.Buffer.prototype.slice

        /**
         * @override
         */
        BufferReader.prototype.string = function read_string_buffer() {
          var len = this.uint32() // modifies pos
          return this.buf.utf8Slice(
            this.pos,
            (this.pos = Math.min(this.pos + len, this.len))
          )
        }

        /**
         * Reads a sequence of bytes preceeded by its length as a varint.
         * @name BufferReader#bytes
         * @function
         * @returns {Buffer} Value read
         */
      },
      {
        './reader': '../../../node_modules/protobufjs/src/reader.js',
        './util/minimal':
          '../../../node_modules/protobufjs/src/util/minimal.js',
      },
    ],
    '../../../node_modules/protobufjs/src/rpc/service.js': [
      function(require, module, exports) {
        'use strict'
        module.exports = Service

        var util = require('../util/minimal')

        // Extends EventEmitter
        ;(Service.prototype = Object.create(
          util.EventEmitter.prototype
        )).constructor = Service

        /**
         * A service method callback as used by {@link rpc.ServiceMethod|ServiceMethod}.
         *
         * Differs from {@link RPCImplCallback} in that it is an actual callback of a service method which may not return `response = null`.
         * @typedef rpc.ServiceMethodCallback
         * @template TRes extends Message<TRes>
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {TRes} [response] Response message
         * @returns {undefined}
         */

        /**
         * A service method part of a {@link rpc.Service} as created by {@link Service.create}.
         * @typedef rpc.ServiceMethod
         * @template TReq extends Message<TReq>
         * @template TRes extends Message<TRes>
         * @type {function}
         * @param {TReq|Properties<TReq>} request Request message or plain object
         * @param {rpc.ServiceMethodCallback<TRes>} [callback] Node-style callback called with the error, if any, and the response message
         * @returns {Promise<Message<TRes>>} Promise if `callback` has been omitted, otherwise `undefined`
         */

        /**
         * Constructs a new RPC service instance.
         * @classdesc An RPC service as returned by {@link Service#create}.
         * @exports rpc.Service
         * @extends util.EventEmitter
         * @constructor
         * @param {RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function Service(rpcImpl, requestDelimited, responseDelimited) {
          if (typeof rpcImpl !== 'function')
            throw TypeError('rpcImpl must be a function')

          util.EventEmitter.call(this)

          /**
           * RPC implementation. Becomes `null` once the service is ended.
           * @type {RPCImpl|null}
           */
          this.rpcImpl = rpcImpl

          /**
           * Whether requests are length-delimited.
           * @type {boolean}
           */
          this.requestDelimited = Boolean(requestDelimited)

          /**
           * Whether responses are length-delimited.
           * @type {boolean}
           */
          this.responseDelimited = Boolean(responseDelimited)
        }

        /**
         * Calls a service method through {@link rpc.Service#rpcImpl|rpcImpl}.
         * @param {Method|rpc.ServiceMethod<TReq,TRes>} method Reflected or static method
         * @param {Constructor<TReq>} requestCtor Request constructor
         * @param {Constructor<TRes>} responseCtor Response constructor
         * @param {TReq|Properties<TReq>} request Request message or plain object
         * @param {rpc.ServiceMethodCallback<TRes>} callback Service callback
         * @returns {undefined}
         * @template TReq extends Message<TReq>
         * @template TRes extends Message<TRes>
         */
        Service.prototype.rpcCall = function rpcCall(
          method,
          requestCtor,
          responseCtor,
          request,
          callback
        ) {
          if (!request) throw TypeError('request must be specified')

          var self = this
          if (!callback)
            return util.asPromise(
              rpcCall,
              self,
              method,
              requestCtor,
              responseCtor,
              request
            )

          if (!self.rpcImpl) {
            setTimeout(function() {
              callback(Error('already ended'))
            }, 0)
            return undefined
          }

          try {
            return self.rpcImpl(
              method,
              requestCtor[self.requestDelimited ? 'encodeDelimited' : 'encode'](
                request
              ).finish(),
              function rpcCallback(err, response) {
                if (err) {
                  self.emit('error', err, method)
                  return callback(err)
                }

                if (response === null) {
                  self.end(/* endedByRPC */ true)
                  return undefined
                }

                if (!(response instanceof responseCtor)) {
                  try {
                    response = responseCtor[
                      self.responseDelimited ? 'decodeDelimited' : 'decode'
                    ](response)
                  } catch (err) {
                    self.emit('error', err, method)
                    return callback(err)
                  }
                }

                self.emit('data', response, method)
                return callback(null, response)
              }
            )
          } catch (err) {
            self.emit('error', err, method)
            setTimeout(function() {
              callback(err)
            }, 0)
            return undefined
          }
        }

        /**
         * Ends this service and emits the `end` event.
         * @param {boolean} [endedByRPC=false] Whether the service has been ended by the RPC implementation.
         * @returns {rpc.Service} `this`
         */
        Service.prototype.end = function end(endedByRPC) {
          if (this.rpcImpl) {
            if (!endedByRPC)
              // signal end to rpcImpl
              this.rpcImpl(null, null, null)
            this.rpcImpl = null
            this.emit('end').off()
          }
          return this
        }
      },
      {
        '../util/minimal':
          '../../../node_modules/protobufjs/src/util/minimal.js',
      },
    ],
    '../../../node_modules/protobufjs/src/rpc.js': [
      function(require, module, exports) {
        'use strict'

        /**
         * Streaming RPC helpers.
         * @namespace
         */
        var rpc = exports

        /**
         * RPC implementation passed to {@link Service#create} performing a service request on network level, i.e. by utilizing http requests or websockets.
         * @typedef RPCImpl
         * @type {function}
         * @param {Method|rpc.ServiceMethod<Message<{}>,Message<{}>>} method Reflected or static method being called
         * @param {Uint8Array} requestData Request data
         * @param {RPCImplCallback} callback Callback function
         * @returns {undefined}
         * @example
         * function rpcImpl(method, requestData, callback) {
         *     if (protobuf.util.lcFirst(method.name) !== "myMethod") // compatible with static code
         *         throw Error("no such method");
         *     asynchronouslyObtainAResponse(requestData, function(err, responseData) {
         *         callback(err, responseData);
         *     });
         * }
         */

        /**
         * Node-style callback as used by {@link RPCImpl}.
         * @typedef RPCImplCallback
         * @type {function}
         * @param {Error|null} error Error, if any, otherwise `null`
         * @param {Uint8Array|null} [response] Response data or `null` to signal end of stream, if there hasn't been an error
         * @returns {undefined}
         */

        rpc.Service = require('./rpc/service')
      },
      {
        './rpc/service': '../../../node_modules/protobufjs/src/rpc/service.js',
      },
    ],
    '../../../node_modules/protobufjs/src/roots.js': [
      function(require, module, exports) {
        'use strict'
        module.exports = {}

        /**
         * Named roots.
         * This is where pbjs stores generated structures (the option `-r, --root` specifies a name).
         * Can also be used manually to make roots available accross modules.
         * @name roots
         * @type {Object.<string,Root>}
         * @example
         * // pbjs -r myroot -o compiled.js ...
         *
         * // in another module:
         * require("./compiled.js");
         *
         * // in any subsequent module:
         * var root = protobuf.roots["myroot"];
         */
      },
      {},
    ],
    '../../../node_modules/protobufjs/src/index-minimal.js': [
      function(require, module, exports) {
        'use strict'
        var protobuf = exports

        /**
         * Build type, one of `"full"`, `"light"` or `"minimal"`.
         * @name build
         * @type {string}
         * @const
         */
        protobuf.build = 'minimal'

        // Serialization
        protobuf.Writer = require('./writer')
        protobuf.BufferWriter = require('./writer_buffer')
        protobuf.Reader = require('./reader')
        protobuf.BufferReader = require('./reader_buffer')

        // Utility
        protobuf.util = require('./util/minimal')
        protobuf.rpc = require('./rpc')
        protobuf.roots = require('./roots')
        protobuf.configure = configure

        /* istanbul ignore next */
        /**
         * Reconfigures the library according to the environment.
         * @returns {undefined}
         */
        function configure() {
          protobuf.Reader._configure(protobuf.BufferReader)
          protobuf.util._configure()
        }

        // Set up buffer utility according to the environment
        protobuf.Writer._configure(protobuf.BufferWriter)
        configure()
      },
      {
        './writer': '../../../node_modules/protobufjs/src/writer.js',
        './writer_buffer':
          '../../../node_modules/protobufjs/src/writer_buffer.js',
        './reader': '../../../node_modules/protobufjs/src/reader.js',
        './reader_buffer':
          '../../../node_modules/protobufjs/src/reader_buffer.js',
        './util/minimal':
          '../../../node_modules/protobufjs/src/util/minimal.js',
        './rpc': '../../../node_modules/protobufjs/src/rpc.js',
        './roots': '../../../node_modules/protobufjs/src/roots.js',
      },
    ],
    '../../../node_modules/protobufjs/minimal.js': [
      function(require, module, exports) {
        // minimal library entry point.

        'use strict'
        module.exports = require('./src/index-minimal')
      },
      {
        './src/index-minimal':
          '../../../node_modules/protobufjs/src/index-minimal.js',
      },
    ],
    '../src/generated/index.js': [
      function(require, module, exports) {
        /*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
        'use strict'

        function _typeof(obj) {
          if (
            typeof Symbol === 'function' &&
            typeof Symbol.iterator === 'symbol'
          ) {
            _typeof = function _typeof(obj) {
              return typeof obj
            }
          } else {
            _typeof = function _typeof(obj) {
              return obj &&
                typeof Symbol === 'function' &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? 'symbol'
                : typeof obj
            }
          }
          return _typeof(obj)
        }

        var $protobuf = require('protobufjs/minimal') // Common aliases

        var $Reader = $protobuf.Reader,
          $Writer = $protobuf.Writer,
          $util = $protobuf.util // Exported root namespace

        var $root =
          $protobuf.roots['default'] || ($protobuf.roots['default'] = {})

        $root.commands = (function() {
          /**
           * Namespace commands.
           * @exports commands
           * @namespace
           */
          var commands = {}

          commands.PressKeyRequest = (function() {
            /**
             * Properties of a PressKeyRequest.
             * @memberof commands
             * @interface IPressKeyRequest
             * @property {number|null} [keyCode] PressKeyRequest keyCode
             */

            /**
             * Constructs a new PressKeyRequest.
             * @memberof commands
             * @classdesc Represents a PressKeyRequest.
             * @implements IPressKeyRequest
             * @constructor
             * @param {commands.IPressKeyRequest=} [properties] Properties to set
             */
            function PressKeyRequest(properties) {
              if (properties)
                for (
                  var keys = Object.keys(properties), i = 0;
                  i < keys.length;
                  ++i
                ) {
                  if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]]
                }
            }
            /**
             * PressKeyRequest keyCode.
             * @member {number} keyCode
             * @memberof commands.PressKeyRequest
             * @instance
             */

            PressKeyRequest.prototype.keyCode = 0
            /**
             * Creates a new PressKeyRequest instance using the specified properties.
             * @function create
             * @memberof commands.PressKeyRequest
             * @static
             * @param {commands.IPressKeyRequest=} [properties] Properties to set
             * @returns {commands.PressKeyRequest} PressKeyRequest instance
             */

            PressKeyRequest.create = function create(properties) {
              return new PressKeyRequest(properties)
            }
            /**
             * Encodes the specified PressKeyRequest message. Does not implicitly {@link commands.PressKeyRequest.verify|verify} messages.
             * @function encode
             * @memberof commands.PressKeyRequest
             * @static
             * @param {commands.IPressKeyRequest} message PressKeyRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */

            PressKeyRequest.encode = function encode(message, writer) {
              if (!writer) writer = $Writer.create()
              if (message.keyCode != null && message.hasOwnProperty('keyCode'))
                writer
                  .uint32(
                    /* id 1, wireType 0 =*/
                    8
                  )
                  .int32(message.keyCode)
              return writer
            }
            /**
             * Encodes the specified PressKeyRequest message, length delimited. Does not implicitly {@link commands.PressKeyRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof commands.PressKeyRequest
             * @static
             * @param {commands.IPressKeyRequest} message PressKeyRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */

            PressKeyRequest.encodeDelimited = function encodeDelimited(
              message,
              writer
            ) {
              return this.encode(message, writer).ldelim()
            }
            /**
             * Decodes a PressKeyRequest message from the specified reader or buffer.
             * @function decode
             * @memberof commands.PressKeyRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {commands.PressKeyRequest} PressKeyRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */

            PressKeyRequest.decode = function decode(reader, length) {
              if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
              var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.commands.PressKeyRequest()

              while (reader.pos < end) {
                var tag = reader.uint32()

                switch (tag >>> 3) {
                  case 1:
                    message.keyCode = reader.int32()
                    break

                  default:
                    reader.skipType(tag & 7)
                    break
                }
              }

              return message
            }
            /**
             * Decodes a PressKeyRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof commands.PressKeyRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {commands.PressKeyRequest} PressKeyRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */

            PressKeyRequest.decodeDelimited = function decodeDelimited(reader) {
              if (!(reader instanceof $Reader)) reader = new $Reader(reader)
              return this.decode(reader, reader.uint32())
            }
            /**
             * Verifies a PressKeyRequest message.
             * @function verify
             * @memberof commands.PressKeyRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */

            PressKeyRequest.verify = function verify(message) {
              if (_typeof(message) !== 'object' || message === null)
                return 'object expected'
              if (message.keyCode != null && message.hasOwnProperty('keyCode'))
                if (!$util.isInteger(message.keyCode))
                  return 'keyCode: integer expected'
              return null
            }
            /**
             * Creates a PressKeyRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof commands.PressKeyRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {commands.PressKeyRequest} PressKeyRequest
             */

            PressKeyRequest.fromObject = function fromObject(object) {
              if (object instanceof $root.commands.PressKeyRequest)
                return object
              var message = new $root.commands.PressKeyRequest()
              if (object.keyCode != null) message.keyCode = object.keyCode | 0
              return message
            }
            /**
             * Creates a plain object from a PressKeyRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof commands.PressKeyRequest
             * @static
             * @param {commands.PressKeyRequest} message PressKeyRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */

            PressKeyRequest.toObject = function toObject(message, options) {
              if (!options) options = {}
              var object = {}
              if (options.defaults) object.keyCode = 0
              if (message.keyCode != null && message.hasOwnProperty('keyCode'))
                object.keyCode = message.keyCode
              return object
            }
            /**
             * Converts this PressKeyRequest to JSON.
             * @function toJSON
             * @memberof commands.PressKeyRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */

            PressKeyRequest.prototype.toJSON = function toJSON() {
              return this.constructor.toObject(
                this,
                $protobuf.util.toJSONOptions
              )
            }

            return PressKeyRequest
          })()

          commands.TypeTextRequest = (function() {
            /**
             * Properties of a TypeTextRequest.
             * @memberof commands
             * @interface ITypeTextRequest
             * @property {string|null} [text] TypeTextRequest text
             */

            /**
             * Constructs a new TypeTextRequest.
             * @memberof commands
             * @classdesc Represents a TypeTextRequest.
             * @implements ITypeTextRequest
             * @constructor
             * @param {commands.ITypeTextRequest=} [properties] Properties to set
             */
            function TypeTextRequest(properties) {
              if (properties)
                for (
                  var keys = Object.keys(properties), i = 0;
                  i < keys.length;
                  ++i
                ) {
                  if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]]
                }
            }
            /**
             * TypeTextRequest text.
             * @member {string} text
             * @memberof commands.TypeTextRequest
             * @instance
             */

            TypeTextRequest.prototype.text = ''
            /**
             * Creates a new TypeTextRequest instance using the specified properties.
             * @function create
             * @memberof commands.TypeTextRequest
             * @static
             * @param {commands.ITypeTextRequest=} [properties] Properties to set
             * @returns {commands.TypeTextRequest} TypeTextRequest instance
             */

            TypeTextRequest.create = function create(properties) {
              return new TypeTextRequest(properties)
            }
            /**
             * Encodes the specified TypeTextRequest message. Does not implicitly {@link commands.TypeTextRequest.verify|verify} messages.
             * @function encode
             * @memberof commands.TypeTextRequest
             * @static
             * @param {commands.ITypeTextRequest} message TypeTextRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */

            TypeTextRequest.encode = function encode(message, writer) {
              if (!writer) writer = $Writer.create()
              if (message.text != null && message.hasOwnProperty('text'))
                writer
                  .uint32(
                    /* id 1, wireType 2 =*/
                    10
                  )
                  .string(message.text)
              return writer
            }
            /**
             * Encodes the specified TypeTextRequest message, length delimited. Does not implicitly {@link commands.TypeTextRequest.verify|verify} messages.
             * @function encodeDelimited
             * @memberof commands.TypeTextRequest
             * @static
             * @param {commands.ITypeTextRequest} message TypeTextRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */

            TypeTextRequest.encodeDelimited = function encodeDelimited(
              message,
              writer
            ) {
              return this.encode(message, writer).ldelim()
            }
            /**
             * Decodes a TypeTextRequest message from the specified reader or buffer.
             * @function decode
             * @memberof commands.TypeTextRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {commands.TypeTextRequest} TypeTextRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */

            TypeTextRequest.decode = function decode(reader, length) {
              if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
              var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.commands.TypeTextRequest()

              while (reader.pos < end) {
                var tag = reader.uint32()

                switch (tag >>> 3) {
                  case 1:
                    message.text = reader.string()
                    break

                  default:
                    reader.skipType(tag & 7)
                    break
                }
              }

              return message
            }
            /**
             * Decodes a TypeTextRequest message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof commands.TypeTextRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {commands.TypeTextRequest} TypeTextRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */

            TypeTextRequest.decodeDelimited = function decodeDelimited(reader) {
              if (!(reader instanceof $Reader)) reader = new $Reader(reader)
              return this.decode(reader, reader.uint32())
            }
            /**
             * Verifies a TypeTextRequest message.
             * @function verify
             * @memberof commands.TypeTextRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */

            TypeTextRequest.verify = function verify(message) {
              if (_typeof(message) !== 'object' || message === null)
                return 'object expected'
              if (message.text != null && message.hasOwnProperty('text'))
                if (!$util.isString(message.text))
                  return 'text: string expected'
              return null
            }
            /**
             * Creates a TypeTextRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof commands.TypeTextRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {commands.TypeTextRequest} TypeTextRequest
             */

            TypeTextRequest.fromObject = function fromObject(object) {
              if (object instanceof $root.commands.TypeTextRequest)
                return object
              var message = new $root.commands.TypeTextRequest()
              if (object.text != null) message.text = String(object.text)
              return message
            }
            /**
             * Creates a plain object from a TypeTextRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof commands.TypeTextRequest
             * @static
             * @param {commands.TypeTextRequest} message TypeTextRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */

            TypeTextRequest.toObject = function toObject(message, options) {
              if (!options) options = {}
              var object = {}
              if (options.defaults) object.text = ''
              if (message.text != null && message.hasOwnProperty('text'))
                object.text = message.text
              return object
            }
            /**
             * Converts this TypeTextRequest to JSON.
             * @function toJSON
             * @memberof commands.TypeTextRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */

            TypeTextRequest.prototype.toJSON = function toJSON() {
              return this.constructor.toObject(
                this,
                $protobuf.util.toJSONOptions
              )
            }

            return TypeTextRequest
          })()

          commands.Commands = (function() {
            /**
             * Constructs a new Commands service.
             * @memberof commands
             * @classdesc Represents a Commands
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function Commands(rpcImpl, requestDelimited, responseDelimited) {
              $protobuf.rpc.Service.call(
                this,
                rpcImpl,
                requestDelimited,
                responseDelimited
              )
            }

            ;(Commands.prototype = Object.create(
              $protobuf.rpc.Service.prototype
            )).constructor = Commands
            /**
             * Creates new Commands service using the specified rpc implementation.
             * @function create
             * @memberof commands.Commands
             * @static
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             * @returns {Commands} RPC service. Useful where requests and/or responses are streamed.
             */

            Commands.create = function create(
              rpcImpl,
              requestDelimited,
              responseDelimited
            ) {
              return new this(rpcImpl, requestDelimited, responseDelimited)
            }
            /**
             * Callback as used by {@link commands.Commands#pressKey}.
             * @memberof commands.Commands
             * @typedef PressKeyCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {google.protobuf.Empty} [response] Empty
             */

            /**
             * Calls PressKey.
             * @function pressKey
             * @memberof commands.Commands
             * @instance
             * @param {commands.IPressKeyRequest} request PressKeyRequest message or plain object
             * @param {commands.Commands.PressKeyCallback} callback Node-style callback called with the error, if any, and Empty
             * @returns {undefined}
             * @variation 1
             */

            Object.defineProperty(
              (Commands.prototype.pressKey = function pressKey(
                request,
                callback
              ) {
                return this.rpcCall(
                  pressKey,
                  $root.commands.PressKeyRequest,
                  $root.google.protobuf.Empty,
                  request,
                  callback
                )
              }),
              'name',
              {
                value: 'PressKey',
              }
            )
            /**
             * Calls PressKey.
             * @function pressKey
             * @memberof commands.Commands
             * @instance
             * @param {commands.IPressKeyRequest} request PressKeyRequest message or plain object
             * @returns {Promise<google.protobuf.Empty>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link commands.Commands#typeText}.
             * @memberof commands.Commands
             * @typedef TypeTextCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {google.protobuf.Empty} [response] Empty
             */

            /**
             * Calls TypeText.
             * @function typeText
             * @memberof commands.Commands
             * @instance
             * @param {commands.ITypeTextRequest} request TypeTextRequest message or plain object
             * @param {commands.Commands.TypeTextCallback} callback Node-style callback called with the error, if any, and Empty
             * @returns {undefined}
             * @variation 1
             */

            Object.defineProperty(
              (Commands.prototype.typeText = function typeText(
                request,
                callback
              ) {
                return this.rpcCall(
                  typeText,
                  $root.commands.TypeTextRequest,
                  $root.google.protobuf.Empty,
                  request,
                  callback
                )
              }),
              'name',
              {
                value: 'TypeText',
              }
            )
            /**
             * Calls TypeText.
             * @function typeText
             * @memberof commands.Commands
             * @instance
             * @param {commands.ITypeTextRequest} request TypeTextRequest message or plain object
             * @returns {Promise<google.protobuf.Empty>} Promise
             * @variation 2
             */

            return Commands
          })()

          commands.MessageEvent = (function() {
            /**
             * Properties of a MessageEvent.
             * @memberof commands
             * @interface IMessageEvent
             * @property {commands.MessageEvent.EventName|null} [event] MessageEvent event
             * @property {number|null} [id] MessageEvent id
             * @property {Uint8Array|null} [message] MessageEvent message
             */

            /**
             * Constructs a new MessageEvent.
             * @memberof commands
             * @classdesc Represents a MessageEvent.
             * @implements IMessageEvent
             * @constructor
             * @param {commands.IMessageEvent=} [properties] Properties to set
             */
            function MessageEvent(properties) {
              if (properties)
                for (
                  var keys = Object.keys(properties), i = 0;
                  i < keys.length;
                  ++i
                ) {
                  if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]]
                }
            }
            /**
             * MessageEvent event.
             * @member {commands.MessageEvent.EventName} event
             * @memberof commands.MessageEvent
             * @instance
             */

            MessageEvent.prototype.event = 1
            /**
             * MessageEvent id.
             * @member {number} id
             * @memberof commands.MessageEvent
             * @instance
             */

            MessageEvent.prototype.id = 0
            /**
             * MessageEvent message.
             * @member {Uint8Array} message
             * @memberof commands.MessageEvent
             * @instance
             */

            MessageEvent.prototype.message = $util.newBuffer([])
            /**
             * Creates a new MessageEvent instance using the specified properties.
             * @function create
             * @memberof commands.MessageEvent
             * @static
             * @param {commands.IMessageEvent=} [properties] Properties to set
             * @returns {commands.MessageEvent} MessageEvent instance
             */

            MessageEvent.create = function create(properties) {
              return new MessageEvent(properties)
            }
            /**
             * Encodes the specified MessageEvent message. Does not implicitly {@link commands.MessageEvent.verify|verify} messages.
             * @function encode
             * @memberof commands.MessageEvent
             * @static
             * @param {commands.IMessageEvent} message MessageEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */

            MessageEvent.encode = function encode(message, writer) {
              if (!writer) writer = $Writer.create()
              if (message.event != null && message.hasOwnProperty('event'))
                writer
                  .uint32(
                    /* id 1, wireType 0 =*/
                    8
                  )
                  .int32(message.event)
              if (message.id != null && message.hasOwnProperty('id'))
                writer
                  .uint32(
                    /* id 2, wireType 0 =*/
                    16
                  )
                  .int32(message.id)
              if (message.message != null && message.hasOwnProperty('message'))
                writer
                  .uint32(
                    /* id 3, wireType 2 =*/
                    26
                  )
                  .bytes(message.message)
              return writer
            }
            /**
             * Encodes the specified MessageEvent message, length delimited. Does not implicitly {@link commands.MessageEvent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof commands.MessageEvent
             * @static
             * @param {commands.IMessageEvent} message MessageEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */

            MessageEvent.encodeDelimited = function encodeDelimited(
              message,
              writer
            ) {
              return this.encode(message, writer).ldelim()
            }
            /**
             * Decodes a MessageEvent message from the specified reader or buffer.
             * @function decode
             * @memberof commands.MessageEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {commands.MessageEvent} MessageEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */

            MessageEvent.decode = function decode(reader, length) {
              if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
              var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.commands.MessageEvent()

              while (reader.pos < end) {
                var tag = reader.uint32()

                switch (tag >>> 3) {
                  case 1:
                    message.event = reader.int32()
                    break

                  case 2:
                    message.id = reader.int32()
                    break

                  case 3:
                    message.message = reader.bytes()
                    break

                  default:
                    reader.skipType(tag & 7)
                    break
                }
              }

              return message
            }
            /**
             * Decodes a MessageEvent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof commands.MessageEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {commands.MessageEvent} MessageEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */

            MessageEvent.decodeDelimited = function decodeDelimited(reader) {
              if (!(reader instanceof $Reader)) reader = new $Reader(reader)
              return this.decode(reader, reader.uint32())
            }
            /**
             * Verifies a MessageEvent message.
             * @function verify
             * @memberof commands.MessageEvent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */

            MessageEvent.verify = function verify(message) {
              if (_typeof(message) !== 'object' || message === null)
                return 'object expected'
              if (message.event != null && message.hasOwnProperty('event'))
                switch (message.event) {
                  default:
                    return 'event: enum value expected'

                  case 1:
                  case 2:
                    break
                }
              if (message.id != null && message.hasOwnProperty('id'))
                if (!$util.isInteger(message.id)) return 'id: integer expected'
              if (message.message != null && message.hasOwnProperty('message'))
                if (
                  !(
                    (message.message &&
                      typeof message.message.length === 'number') ||
                    $util.isString(message.message)
                  )
                )
                  return 'message: buffer expected'
              return null
            }
            /**
             * Creates a MessageEvent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof commands.MessageEvent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {commands.MessageEvent} MessageEvent
             */

            MessageEvent.fromObject = function fromObject(object) {
              if (object instanceof $root.commands.MessageEvent) return object
              var message = new $root.commands.MessageEvent()

              switch (object.event) {
                case 'PressKey':
                case 1:
                  message.event = 1
                  break

                case 'TypeText':
                case 2:
                  message.event = 2
                  break
              }

              if (object.id != null) message.id = object.id | 0
              if (object.message != null)
                if (typeof object.message === 'string')
                  $util.base64.decode(
                    object.message,
                    (message.message = $util.newBuffer(
                      $util.base64.length(object.message)
                    )),
                    0
                  )
                else if (object.message.length) message.message = object.message
              return message
            }
            /**
             * Creates a plain object from a MessageEvent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof commands.MessageEvent
             * @static
             * @param {commands.MessageEvent} message MessageEvent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */

            MessageEvent.toObject = function toObject(message, options) {
              if (!options) options = {}
              var object = {}

              if (options.defaults) {
                object.event = options.enums === String ? 'PressKey' : 1
                object.id = 0
                if (options.bytes === String) object.message = ''
                else {
                  object.message = []
                  if (options.bytes !== Array)
                    object.message = $util.newBuffer(object.message)
                }
              }

              if (message.event != null && message.hasOwnProperty('event'))
                object.event =
                  options.enums === String
                    ? $root.commands.MessageEvent.EventName[message.event]
                    : message.event
              if (message.id != null && message.hasOwnProperty('id'))
                object.id = message.id
              if (message.message != null && message.hasOwnProperty('message'))
                object.message =
                  options.bytes === String
                    ? $util.base64.encode(
                        message.message,
                        0,
                        message.message.length
                      )
                    : options.bytes === Array
                      ? Array.prototype.slice.call(message.message)
                      : message.message
              return object
            }
            /**
             * Converts this MessageEvent to JSON.
             * @function toJSON
             * @memberof commands.MessageEvent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */

            MessageEvent.prototype.toJSON = function toJSON() {
              return this.constructor.toObject(
                this,
                $protobuf.util.toJSONOptions
              )
            }
            /**
             * EventName enum.
             * @name commands.MessageEvent.EventName
             * @enum {string}
             * @property {number} PressKey=1 PressKey value
             * @property {number} TypeText=2 TypeText value
             */

            MessageEvent.EventName = (function() {
              var valuesById = {},
                values = Object.create(valuesById)
              values[(valuesById[1] = 'PressKey')] = 1
              values[(valuesById[2] = 'TypeText')] = 2
              return values
            })()

            return MessageEvent
          })()

          return commands
        })()

        $root.google = (function() {
          /**
           * Namespace google.
           * @exports google
           * @namespace
           */
          var google = {}

          google.protobuf = (function() {
            /**
             * Namespace protobuf.
             * @memberof google
             * @namespace
             */
            var protobuf = {}

            protobuf.Empty = (function() {
              /**
               * Properties of an Empty.
               * @memberof google.protobuf
               * @interface IEmpty
               */

              /**
               * Constructs a new Empty.
               * @memberof google.protobuf
               * @classdesc Represents an Empty.
               * @implements IEmpty
               * @constructor
               * @param {google.protobuf.IEmpty=} [properties] Properties to set
               */
              function Empty(properties) {
                if (properties)
                  for (
                    var keys = Object.keys(properties), i = 0;
                    i < keys.length;
                    ++i
                  ) {
                    if (properties[keys[i]] != null)
                      this[keys[i]] = properties[keys[i]]
                  }
              }
              /**
               * Creates a new Empty instance using the specified properties.
               * @function create
               * @memberof google.protobuf.Empty
               * @static
               * @param {google.protobuf.IEmpty=} [properties] Properties to set
               * @returns {google.protobuf.Empty} Empty instance
               */

              Empty.create = function create(properties) {
                return new Empty(properties)
              }
              /**
               * Encodes the specified Empty message. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
               * @function encode
               * @memberof google.protobuf.Empty
               * @static
               * @param {google.protobuf.IEmpty} message Empty message or plain object to encode
               * @param {$protobuf.Writer} [writer] Writer to encode to
               * @returns {$protobuf.Writer} Writer
               */

              Empty.encode = function encode(message, writer) {
                if (!writer) writer = $Writer.create()
                return writer
              }
              /**
               * Encodes the specified Empty message, length delimited. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
               * @function encodeDelimited
               * @memberof google.protobuf.Empty
               * @static
               * @param {google.protobuf.IEmpty} message Empty message or plain object to encode
               * @param {$protobuf.Writer} [writer] Writer to encode to
               * @returns {$protobuf.Writer} Writer
               */

              Empty.encodeDelimited = function encodeDelimited(
                message,
                writer
              ) {
                return this.encode(message, writer).ldelim()
              }
              /**
               * Decodes an Empty message from the specified reader or buffer.
               * @function decode
               * @memberof google.protobuf.Empty
               * @static
               * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
               * @param {number} [length] Message length if known beforehand
               * @returns {google.protobuf.Empty} Empty
               * @throws {Error} If the payload is not a reader or valid buffer
               * @throws {$protobuf.util.ProtocolError} If required fields are missing
               */

              Empty.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                  reader = $Reader.create(reader)
                var end =
                    length === undefined ? reader.len : reader.pos + length,
                  message = new $root.google.protobuf.Empty()

                while (reader.pos < end) {
                  var tag = reader.uint32()

                  switch (tag >>> 3) {
                    default:
                      reader.skipType(tag & 7)
                      break
                  }
                }

                return message
              }
              /**
               * Decodes an Empty message from the specified reader or buffer, length delimited.
               * @function decodeDelimited
               * @memberof google.protobuf.Empty
               * @static
               * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
               * @returns {google.protobuf.Empty} Empty
               * @throws {Error} If the payload is not a reader or valid buffer
               * @throws {$protobuf.util.ProtocolError} If required fields are missing
               */

              Empty.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader)) reader = new $Reader(reader)
                return this.decode(reader, reader.uint32())
              }
              /**
               * Verifies an Empty message.
               * @function verify
               * @memberof google.protobuf.Empty
               * @static
               * @param {Object.<string,*>} message Plain object to verify
               * @returns {string|null} `null` if valid, otherwise the reason why it is not
               */

              Empty.verify = function verify(message) {
                if (_typeof(message) !== 'object' || message === null)
                  return 'object expected'
                return null
              }
              /**
               * Creates an Empty message from a plain object. Also converts values to their respective internal types.
               * @function fromObject
               * @memberof google.protobuf.Empty
               * @static
               * @param {Object.<string,*>} object Plain object
               * @returns {google.protobuf.Empty} Empty
               */

              Empty.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Empty) return object
                return new $root.google.protobuf.Empty()
              }
              /**
               * Creates a plain object from an Empty message. Also converts values to other types if specified.
               * @function toObject
               * @memberof google.protobuf.Empty
               * @static
               * @param {google.protobuf.Empty} message Empty
               * @param {$protobuf.IConversionOptions} [options] Conversion options
               * @returns {Object.<string,*>} Plain object
               */

              Empty.toObject = function toObject() {
                return {}
              }
              /**
               * Converts this Empty to JSON.
               * @function toJSON
               * @memberof google.protobuf.Empty
               * @instance
               * @returns {Object.<string,*>} JSON object
               */

              Empty.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(
                  this,
                  $protobuf.util.toJSONOptions
                )
              }

              return Empty
            })()

            return protobuf
          })()

          return google
        })()

        $root.events = (function() {
          /**
           * Namespace events.
           * @exports events
           * @namespace
           */
          var events = {}

          events.KeyPress = (function() {
            /**
             * Properties of a KeyPress.
             * @memberof events
             * @interface IKeyPress
             * @property {number|null} [keyCode] KeyPress keyCode
             */

            /**
             * Constructs a new KeyPress.
             * @memberof events
             * @classdesc Represents a KeyPress.
             * @implements IKeyPress
             * @constructor
             * @param {events.IKeyPress=} [properties] Properties to set
             */
            function KeyPress(properties) {
              if (properties)
                for (
                  var keys = Object.keys(properties), i = 0;
                  i < keys.length;
                  ++i
                ) {
                  if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]]
                }
            }
            /**
             * KeyPress keyCode.
             * @member {number} keyCode
             * @memberof events.KeyPress
             * @instance
             */

            KeyPress.prototype.keyCode = 0
            /**
             * Creates a new KeyPress instance using the specified properties.
             * @function create
             * @memberof events.KeyPress
             * @static
             * @param {events.IKeyPress=} [properties] Properties to set
             * @returns {events.KeyPress} KeyPress instance
             */

            KeyPress.create = function create(properties) {
              return new KeyPress(properties)
            }
            /**
             * Encodes the specified KeyPress message. Does not implicitly {@link events.KeyPress.verify|verify} messages.
             * @function encode
             * @memberof events.KeyPress
             * @static
             * @param {events.IKeyPress} message KeyPress message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */

            KeyPress.encode = function encode(message, writer) {
              if (!writer) writer = $Writer.create()
              if (message.keyCode != null && message.hasOwnProperty('keyCode'))
                writer
                  .uint32(
                    /* id 1, wireType 0 =*/
                    8
                  )
                  .int32(message.keyCode)
              return writer
            }
            /**
             * Encodes the specified KeyPress message, length delimited. Does not implicitly {@link events.KeyPress.verify|verify} messages.
             * @function encodeDelimited
             * @memberof events.KeyPress
             * @static
             * @param {events.IKeyPress} message KeyPress message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */

            KeyPress.encodeDelimited = function encodeDelimited(
              message,
              writer
            ) {
              return this.encode(message, writer).ldelim()
            }
            /**
             * Decodes a KeyPress message from the specified reader or buffer.
             * @function decode
             * @memberof events.KeyPress
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {events.KeyPress} KeyPress
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */

            KeyPress.decode = function decode(reader, length) {
              if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
              var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.events.KeyPress()

              while (reader.pos < end) {
                var tag = reader.uint32()

                switch (tag >>> 3) {
                  case 1:
                    message.keyCode = reader.int32()
                    break

                  default:
                    reader.skipType(tag & 7)
                    break
                }
              }

              return message
            }
            /**
             * Decodes a KeyPress message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof events.KeyPress
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {events.KeyPress} KeyPress
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */

            KeyPress.decodeDelimited = function decodeDelimited(reader) {
              if (!(reader instanceof $Reader)) reader = new $Reader(reader)
              return this.decode(reader, reader.uint32())
            }
            /**
             * Verifies a KeyPress message.
             * @function verify
             * @memberof events.KeyPress
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */

            KeyPress.verify = function verify(message) {
              if (_typeof(message) !== 'object' || message === null)
                return 'object expected'
              if (message.keyCode != null && message.hasOwnProperty('keyCode'))
                if (!$util.isInteger(message.keyCode))
                  return 'keyCode: integer expected'
              return null
            }
            /**
             * Creates a KeyPress message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof events.KeyPress
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {events.KeyPress} KeyPress
             */

            KeyPress.fromObject = function fromObject(object) {
              if (object instanceof $root.events.KeyPress) return object
              var message = new $root.events.KeyPress()
              if (object.keyCode != null) message.keyCode = object.keyCode | 0
              return message
            }
            /**
             * Creates a plain object from a KeyPress message. Also converts values to other types if specified.
             * @function toObject
             * @memberof events.KeyPress
             * @static
             * @param {events.KeyPress} message KeyPress
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */

            KeyPress.toObject = function toObject(message, options) {
              if (!options) options = {}
              var object = {}
              if (options.defaults) object.keyCode = 0
              if (message.keyCode != null && message.hasOwnProperty('keyCode'))
                object.keyCode = message.keyCode
              return object
            }
            /**
             * Converts this KeyPress to JSON.
             * @function toJSON
             * @memberof events.KeyPress
             * @instance
             * @returns {Object.<string,*>} JSON object
             */

            KeyPress.prototype.toJSON = function toJSON() {
              return this.constructor.toObject(
                this,
                $protobuf.util.toJSONOptions
              )
            }

            return KeyPress
          })()

          events.MessageEvent = (function() {
            /**
             * Properties of a MessageEvent.
             * @memberof events
             * @interface IMessageEvent
             * @property {events.MessageEvent.EventName|null} [event] MessageEvent event
             * @property {number|null} [id] MessageEvent id
             * @property {Uint8Array|null} [message] MessageEvent message
             */

            /**
             * Constructs a new MessageEvent.
             * @memberof events
             * @classdesc Represents a MessageEvent.
             * @implements IMessageEvent
             * @constructor
             * @param {events.IMessageEvent=} [properties] Properties to set
             */
            function MessageEvent(properties) {
              if (properties)
                for (
                  var keys = Object.keys(properties), i = 0;
                  i < keys.length;
                  ++i
                ) {
                  if (properties[keys[i]] != null)
                    this[keys[i]] = properties[keys[i]]
                }
            }
            /**
             * MessageEvent event.
             * @member {events.MessageEvent.EventName} event
             * @memberof events.MessageEvent
             * @instance
             */

            MessageEvent.prototype.event = 1
            /**
             * MessageEvent id.
             * @member {number} id
             * @memberof events.MessageEvent
             * @instance
             */

            MessageEvent.prototype.id = 0
            /**
             * MessageEvent message.
             * @member {Uint8Array} message
             * @memberof events.MessageEvent
             * @instance
             */

            MessageEvent.prototype.message = $util.newBuffer([])
            /**
             * Creates a new MessageEvent instance using the specified properties.
             * @function create
             * @memberof events.MessageEvent
             * @static
             * @param {events.IMessageEvent=} [properties] Properties to set
             * @returns {events.MessageEvent} MessageEvent instance
             */

            MessageEvent.create = function create(properties) {
              return new MessageEvent(properties)
            }
            /**
             * Encodes the specified MessageEvent message. Does not implicitly {@link events.MessageEvent.verify|verify} messages.
             * @function encode
             * @memberof events.MessageEvent
             * @static
             * @param {events.IMessageEvent} message MessageEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */

            MessageEvent.encode = function encode(message, writer) {
              if (!writer) writer = $Writer.create()
              if (message.event != null && message.hasOwnProperty('event'))
                writer
                  .uint32(
                    /* id 1, wireType 0 =*/
                    8
                  )
                  .int32(message.event)
              if (message.id != null && message.hasOwnProperty('id'))
                writer
                  .uint32(
                    /* id 2, wireType 0 =*/
                    16
                  )
                  .int32(message.id)
              if (message.message != null && message.hasOwnProperty('message'))
                writer
                  .uint32(
                    /* id 3, wireType 2 =*/
                    26
                  )
                  .bytes(message.message)
              return writer
            }
            /**
             * Encodes the specified MessageEvent message, length delimited. Does not implicitly {@link events.MessageEvent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof events.MessageEvent
             * @static
             * @param {events.IMessageEvent} message MessageEvent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */

            MessageEvent.encodeDelimited = function encodeDelimited(
              message,
              writer
            ) {
              return this.encode(message, writer).ldelim()
            }
            /**
             * Decodes a MessageEvent message from the specified reader or buffer.
             * @function decode
             * @memberof events.MessageEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {events.MessageEvent} MessageEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */

            MessageEvent.decode = function decode(reader, length) {
              if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
              var end = length === undefined ? reader.len : reader.pos + length,
                message = new $root.events.MessageEvent()

              while (reader.pos < end) {
                var tag = reader.uint32()

                switch (tag >>> 3) {
                  case 1:
                    message.event = reader.int32()
                    break

                  case 2:
                    message.id = reader.int32()
                    break

                  case 3:
                    message.message = reader.bytes()
                    break

                  default:
                    reader.skipType(tag & 7)
                    break
                }
              }

              return message
            }
            /**
             * Decodes a MessageEvent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof events.MessageEvent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {events.MessageEvent} MessageEvent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */

            MessageEvent.decodeDelimited = function decodeDelimited(reader) {
              if (!(reader instanceof $Reader)) reader = new $Reader(reader)
              return this.decode(reader, reader.uint32())
            }
            /**
             * Verifies a MessageEvent message.
             * @function verify
             * @memberof events.MessageEvent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */

            MessageEvent.verify = function verify(message) {
              if (_typeof(message) !== 'object' || message === null)
                return 'object expected'
              if (message.event != null && message.hasOwnProperty('event'))
                switch (message.event) {
                  default:
                    return 'event: enum value expected'

                  case 1:
                    break
                }
              if (message.id != null && message.hasOwnProperty('id'))
                if (!$util.isInteger(message.id)) return 'id: integer expected'
              if (message.message != null && message.hasOwnProperty('message'))
                if (
                  !(
                    (message.message &&
                      typeof message.message.length === 'number') ||
                    $util.isString(message.message)
                  )
                )
                  return 'message: buffer expected'
              return null
            }
            /**
             * Creates a MessageEvent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof events.MessageEvent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {events.MessageEvent} MessageEvent
             */

            MessageEvent.fromObject = function fromObject(object) {
              if (object instanceof $root.events.MessageEvent) return object
              var message = new $root.events.MessageEvent()

              switch (object.event) {
                case 'KeyPress':
                case 1:
                  message.event = 1
                  break
              }

              if (object.id != null) message.id = object.id | 0
              if (object.message != null)
                if (typeof object.message === 'string')
                  $util.base64.decode(
                    object.message,
                    (message.message = $util.newBuffer(
                      $util.base64.length(object.message)
                    )),
                    0
                  )
                else if (object.message.length) message.message = object.message
              return message
            }
            /**
             * Creates a plain object from a MessageEvent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof events.MessageEvent
             * @static
             * @param {events.MessageEvent} message MessageEvent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */

            MessageEvent.toObject = function toObject(message, options) {
              if (!options) options = {}
              var object = {}

              if (options.defaults) {
                object.event = options.enums === String ? 'KeyPress' : 1
                object.id = 0
                if (options.bytes === String) object.message = ''
                else {
                  object.message = []
                  if (options.bytes !== Array)
                    object.message = $util.newBuffer(object.message)
                }
              }

              if (message.event != null && message.hasOwnProperty('event'))
                object.event =
                  options.enums === String
                    ? $root.events.MessageEvent.EventName[message.event]
                    : message.event
              if (message.id != null && message.hasOwnProperty('id'))
                object.id = message.id
              if (message.message != null && message.hasOwnProperty('message'))
                object.message =
                  options.bytes === String
                    ? $util.base64.encode(
                        message.message,
                        0,
                        message.message.length
                      )
                    : options.bytes === Array
                      ? Array.prototype.slice.call(message.message)
                      : message.message
              return object
            }
            /**
             * Converts this MessageEvent to JSON.
             * @function toJSON
             * @memberof events.MessageEvent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */

            MessageEvent.prototype.toJSON = function toJSON() {
              return this.constructor.toObject(
                this,
                $protobuf.util.toJSONOptions
              )
            }
            /**
             * EventName enum.
             * @name events.MessageEvent.EventName
             * @enum {string}
             * @property {number} KeyPress=1 KeyPress value
             */

            MessageEvent.EventName = (function() {
              var valuesById = {},
                values = Object.create(valuesById)
              values[(valuesById[1] = 'KeyPress')] = 1
              return values
            })()

            return MessageEvent
          })()

          return events
        })()

        module.exports = $root
      },
      { 'protobufjs/minimal': '../../../node_modules/protobufjs/minimal.js' },
    ],
    'index.ts': [
      function(require, module, exports) {
        'use strict'

        var __awaiter =
          (this && this.__awaiter) ||
          function(thisArg, _arguments, P, generator) {
            return new (P || (P = Promise))(function(resolve, reject) {
              function fulfilled(value) {
                try {
                  step(generator.next(value))
                } catch (e) {
                  reject(e)
                }
              }

              function rejected(value) {
                try {
                  step(generator['throw'](value))
                } catch (e) {
                  reject(e)
                }
              }

              function step(result) {
                result.done
                  ? resolve(result.value)
                  : new P(function(resolve) {
                      resolve(result.value)
                    }).then(fulfilled, rejected)
              }

              step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
              )
            })
          }

        var __generator =
          (this && this.__generator) ||
          function(thisArg, body) {
            var _ = {
                label: 0,
                sent: function sent() {
                  if (t[0] & 1) throw t[1]
                  return t[1]
                },
                trys: [],
                ops: [],
              },
              f,
              y,
              t,
              g
            return (
              (g = {
                next: verb(0),
                throw: verb(1),
                return: verb(2),
              }),
              typeof Symbol === 'function' &&
                (g[Symbol.iterator] = function() {
                  return this
                }),
              g
            )

            function verb(n) {
              return function(v) {
                return step([n, v])
              }
            }

            function step(op) {
              if (f) throw new TypeError('Generator is already executing.')

              while (_) {
                try {
                  if (
                    ((f = 1),
                    y &&
                      (t =
                        op[0] & 2
                          ? y['return']
                          : op[0]
                            ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                            : y.next) &&
                      !(t = t.call(y, op[1])).done)
                  )
                    return t
                  if (((y = 0), t)) op = [op[0] & 2, t.value]

                  switch (op[0]) {
                    case 0:
                    case 1:
                      t = op
                      break

                    case 4:
                      _.label++
                      return {
                        value: op[1],
                        done: false,
                      }

                    case 5:
                      _.label++
                      y = op[1]
                      op = [0]
                      continue

                    case 7:
                      op = _.ops.pop()

                      _.trys.pop()

                      continue

                    default:
                      if (
                        !((t = _.trys),
                        (t = t.length > 0 && t[t.length - 1])) &&
                        (op[0] === 6 || op[0] === 2)
                      ) {
                        _ = 0
                        continue
                      }

                      if (
                        op[0] === 3 &&
                        (!t || (op[1] > t[0] && op[1] < t[3]))
                      ) {
                        _.label = op[1]
                        break
                      }

                      if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1]
                        t = op
                        break
                      }

                      if (t && _.label < t[2]) {
                        _.label = t[2]

                        _.ops.push(op)

                        break
                      }

                      if (t[2]) _.ops.pop()

                      _.trys.pop()

                      continue
                  }

                  op = body.call(thisArg, _)
                } catch (e) {
                  op = [6, e]
                  y = 0
                } finally {
                  f = t = 0
                }
              }

              if (op[0] & 5) throw op[1]
              return {
                value: op[0] ? op[1] : void 0,
                done: true,
              }
            }
          }

        exports.__esModule = true

        var generated_1 = require('../src/generated')

        function bootstrap() {
          return __awaiter(this, void 0, void 0, function() {
            var packEvent,
              unpackEvent,
              on,
              keypress,
              message,
              encoded,
              decoded,
              service
            return __generator(this, function(_a) {
              packEvent = function packEvent(message) {
                var event = Object.entries(generated_1.events).find(function(
                  _a
                ) {
                  var name = _a[0],
                    type = _a[1]
                  return type === message.constructor
                })
                if (!event) throw new Error() // console.log(message.constructor)

                var eventId =
                  generated_1.events.MessageEvent.EventName[event[0]]
                return generated_1.events.MessageEvent.create({
                  event: eventId,
                  message: message.constructor.encode(message).finish(),
                })
              }

              unpackEvent = function unpackEvent(_a) {
                var event = _a.event,
                  message = _a.message
                var eventName = generated_1.events.MessageEvent.EventName[event]
                var Type = generated_1.events[eventName]
                if (!Type || typeof Type.decode !== 'function')
                  throw new Error()
                return Type.decode(message)
              }

              on = function on(event, callback) {}

              on(generated_1.events.KeyPress, function(data, messageEvent) {})
              keypress = generated_1.events.KeyPress.create({
                keyCode: 1001101010,
              })
              message = packEvent(keypress)
              encoded = generated_1.events.MessageEvent.encode(message).finish()
              decoded = unpackEvent(
                generated_1.events.MessageEvent.decode(encoded)
              )
              console.log(encoded, decoded)
              service = generated_1.commands.Commands.create(function(
                method,
                requestData,
                callback
              ) {
                var eventId =
                  generated_1.commands.MessageEvent.EventName[method.name]
                var message = generated_1.commands.MessageEvent.create({
                  event: eventId,
                  message: requestData,
                }) // callback(
                //   null,
                //   TestResp.encode(
                //     new TestResp({
                //       result: 'HELLo',f
                //     })
                //   ).finish()
                // )
              })
              service.typeText({
                text: 'hello world',
              })
              return [
                2,
                /*return*/
              ]
            })
          })
        }

        bootstrap()
      },
      { '../src/generated': '../src/generated/index.js' },
    ],
    '../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js': [
      function(require, module, exports) {
        var global = arguments[3]
        var OVERLAY_ID = '__parcel__error__overlay__'
        var OldModule = module.bundle.Module

        function Module(moduleName) {
          OldModule.call(this, moduleName)
          this.hot = {
            data: module.bundle.hotData,
            _acceptCallbacks: [],
            _disposeCallbacks: [],
            accept: function(fn) {
              this._acceptCallbacks.push(fn || function() {})
            },
            dispose: function(fn) {
              this._disposeCallbacks.push(fn)
            },
          }
          module.bundle.hotData = null
        }

        module.bundle.Module = Module
        var parent = module.bundle.parent

        if (
          (!parent || !parent.isParcelRequire) &&
          typeof WebSocket !== 'undefined'
        ) {
          var hostname = '' || location.hostname
          var protocol = location.protocol === 'https:' ? 'wss' : 'ws'
          var ws = new WebSocket(
            protocol + '://' + hostname + ':' + '56007' + '/'
          )

          ws.onmessage = function(event) {
            var data = JSON.parse(event.data)

            if (data.type === 'update') {
              console.clear()
              data.assets.forEach(function(asset) {
                hmrApply(global.parcelRequire, asset)
              })
              data.assets.forEach(function(asset) {
                if (!asset.isNew) {
                  hmrAccept(global.parcelRequire, asset.id)
                }
              })
            }

            if (data.type === 'reload') {
              ws.close()

              ws.onclose = function() {
                location.reload()
              }
            }

            if (data.type === 'error-resolved') {
              console.log('[parcel] ✨ Error resolved')
              removeErrorOverlay()
            }

            if (data.type === 'error') {
              console.error(
                '[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack
              )
              removeErrorOverlay()
              var overlay = createErrorOverlay(data)
              document.body.appendChild(overlay)
            }
          }
        }

        function removeErrorOverlay() {
          var overlay = document.getElementById(OVERLAY_ID)

          if (overlay) {
            overlay.remove()
          }
        }

        function createErrorOverlay(data) {
          var overlay = document.createElement('div')
          overlay.id = OVERLAY_ID // html encode message and stack trace

          var message = document.createElement('div')
          var stackTrace = document.createElement('pre')
          message.innerText = data.error.message
          stackTrace.innerText = data.error.stack
          overlay.innerHTML =
            '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' +
            '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' +
            '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' +
            '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' +
            message.innerHTML +
            '</div>' +
            '<pre>' +
            stackTrace.innerHTML +
            '</pre>' +
            '</div>'
          return overlay
        }

        function getParents(bundle, id) {
          var modules = bundle.modules

          if (!modules) {
            return []
          }

          var parents = []
          var k, d, dep

          for (k in modules) {
            for (d in modules[k][1]) {
              dep = modules[k][1][d]

              if (
                dep === id ||
                (Array.isArray(dep) && dep[dep.length - 1] === id)
              ) {
                parents.push(k)
              }
            }
          }

          if (bundle.parent) {
            parents = parents.concat(getParents(bundle.parent, id))
          }

          return parents
        }

        function hmrApply(bundle, asset) {
          var modules = bundle.modules

          if (!modules) {
            return
          }

          if (modules[asset.id] || !bundle.parent) {
            var fn = new Function(
              'require',
              'module',
              'exports',
              asset.generated.js
            )
            asset.isNew = !modules[asset.id]
            modules[asset.id] = [fn, asset.deps]
          } else if (bundle.parent) {
            hmrApply(bundle.parent, asset)
          }
        }

        function hmrAccept(bundle, id) {
          var modules = bundle.modules

          if (!modules) {
            return
          }

          if (!modules[id] && bundle.parent) {
            return hmrAccept(bundle.parent, id)
          }

          var cached = bundle.cache[id]
          bundle.hotData = {}

          if (cached) {
            cached.hot.data = bundle.hotData
          }

          if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
            cached.hot._disposeCallbacks.forEach(function(cb) {
              cb(bundle.hotData)
            })
          }

          delete bundle.cache[id]
          bundle(id)
          cached = bundle.cache[id]

          if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
            cached.hot._acceptCallbacks.forEach(function(cb) {
              cb()
            })

            return true
          }

          return getParents(global.parcelRequire, id).some(function(id) {
            return hmrAccept(global.parcelRequire, id)
          })
        }
      },
      {},
    ],
  },
  {},
  [
    '../../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js',
    'index.ts',
  ],
  null
)
//# sourceMappingURL=/demo.77de5100.map
