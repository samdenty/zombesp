/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
'use strict'

var $protobuf = require('protobufjs/minimal')

// Common aliases
var $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util

// Exported root namespace
var $root = $protobuf.roots['default'] || ($protobuf.roots['default'] = {})

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
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
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
        writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.keyCode)
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
      if (typeof message !== 'object' || message === null)
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
      if (object instanceof $root.commands.PressKeyRequest) return object
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
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
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
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
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
        writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.text)
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
      if (typeof message !== 'object' || message === null)
        return 'object expected'
      if (message.text != null && message.hasOwnProperty('text'))
        if (!$util.isString(message.text)) return 'text: string expected'
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
      if (object instanceof $root.commands.TypeTextRequest) return object
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
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
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
      (Commands.prototype.pressKey = function pressKey(request, callback) {
        return this.rpcCall(
          pressKey,
          $root.commands.PressKeyRequest,
          $root.google.protobuf.Empty,
          request,
          callback
        )
      }),
      'name',
      { value: 'PressKey' }
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
      (Commands.prototype.typeText = function typeText(request, callback) {
        return this.rpcCall(
          typeText,
          $root.commands.TypeTextRequest,
          $root.google.protobuf.Empty,
          request,
          callback
        )
      }),
      'name',
      { value: 'TypeText' }
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
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
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
        writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.event)
      if (message.id != null && message.hasOwnProperty('id'))
        writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.id)
      if (message.message != null && message.hasOwnProperty('message'))
        writer.uint32(/* id 3, wireType 2 =*/ 26).bytes(message.message)
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
    MessageEvent.encodeDelimited = function encodeDelimited(message, writer) {
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
      if (typeof message !== 'object' || message === null)
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
            (message.message && typeof message.message.length === 'number') ||
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
            ? $util.base64.encode(message.message, 0, message.message.length)
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
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
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
          for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
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
      Empty.encodeDelimited = function encodeDelimited(message, writer) {
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
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader)
        var end = length === undefined ? reader.len : reader.pos + length,
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
        if (typeof message !== 'object' || message === null)
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
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
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
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
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
        writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.keyCode)
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
    KeyPress.encodeDelimited = function encodeDelimited(message, writer) {
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
      if (typeof message !== 'object' || message === null)
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
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
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
        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
          if (properties[keys[i]] != null) this[keys[i]] = properties[keys[i]]
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
        writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.event)
      if (message.id != null && message.hasOwnProperty('id'))
        writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.id)
      if (message.message != null && message.hasOwnProperty('message'))
        writer.uint32(/* id 3, wireType 2 =*/ 26).bytes(message.message)
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
    MessageEvent.encodeDelimited = function encodeDelimited(message, writer) {
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
      if (typeof message !== 'object' || message === null)
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
            (message.message && typeof message.message.length === 'number') ||
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
            ? $util.base64.encode(message.message, 0, message.message.length)
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
      return this.constructor.toObject(this, $protobuf.util.toJSONOptions)
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
