import * as $protobuf from 'protobufjs'
/** Namespace commands. */
export namespace commands {
  /** Properties of a PressKeyRequest. */
  interface IPressKeyRequest {
    /** PressKeyRequest keyCode */
    keyCode?: number | null
  }

  /** Represents a PressKeyRequest. */
  class PressKeyRequest implements IPressKeyRequest {
    /**
     * Constructs a new PressKeyRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: commands.IPressKeyRequest)

    /** PressKeyRequest keyCode. */
    public keyCode: number

    /**
     * Creates a new PressKeyRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns PressKeyRequest instance
     */
    public static create(
      properties?: commands.IPressKeyRequest
    ): commands.PressKeyRequest

    /**
     * Encodes the specified PressKeyRequest message. Does not implicitly {@link commands.PressKeyRequest.verify|verify} messages.
     * @param message PressKeyRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: commands.IPressKeyRequest,
      writer?: $protobuf.Writer
    ): $protobuf.Writer

    /**
     * Encodes the specified PressKeyRequest message, length delimited. Does not implicitly {@link commands.PressKeyRequest.verify|verify} messages.
     * @param message PressKeyRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: commands.IPressKeyRequest,
      writer?: $protobuf.Writer
    ): $protobuf.Writer

    /**
     * Decodes a PressKeyRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns PressKeyRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): commands.PressKeyRequest

    /**
     * Decodes a PressKeyRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns PressKeyRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): commands.PressKeyRequest

    /**
     * Verifies a PressKeyRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null

    /**
     * Creates a PressKeyRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns PressKeyRequest
     */
    public static fromObject(object: {
      [k: string]: any
    }): commands.PressKeyRequest

    /**
     * Creates a plain object from a PressKeyRequest message. Also converts values to other types if specified.
     * @param message PressKeyRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: commands.PressKeyRequest,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any }

    /**
     * Converts this PressKeyRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any }
  }

  /** Properties of a TypeTextRequest. */
  interface ITypeTextRequest {
    /** TypeTextRequest text */
    text?: string | null
  }

  /** Represents a TypeTextRequest. */
  class TypeTextRequest implements ITypeTextRequest {
    /**
     * Constructs a new TypeTextRequest.
     * @param [properties] Properties to set
     */
    constructor(properties?: commands.ITypeTextRequest)

    /** TypeTextRequest text. */
    public text: string

    /**
     * Creates a new TypeTextRequest instance using the specified properties.
     * @param [properties] Properties to set
     * @returns TypeTextRequest instance
     */
    public static create(
      properties?: commands.ITypeTextRequest
    ): commands.TypeTextRequest

    /**
     * Encodes the specified TypeTextRequest message. Does not implicitly {@link commands.TypeTextRequest.verify|verify} messages.
     * @param message TypeTextRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: commands.ITypeTextRequest,
      writer?: $protobuf.Writer
    ): $protobuf.Writer

    /**
     * Encodes the specified TypeTextRequest message, length delimited. Does not implicitly {@link commands.TypeTextRequest.verify|verify} messages.
     * @param message TypeTextRequest message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: commands.ITypeTextRequest,
      writer?: $protobuf.Writer
    ): $protobuf.Writer

    /**
     * Decodes a TypeTextRequest message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns TypeTextRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): commands.TypeTextRequest

    /**
     * Decodes a TypeTextRequest message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns TypeTextRequest
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): commands.TypeTextRequest

    /**
     * Verifies a TypeTextRequest message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null

    /**
     * Creates a TypeTextRequest message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns TypeTextRequest
     */
    public static fromObject(object: {
      [k: string]: any
    }): commands.TypeTextRequest

    /**
     * Creates a plain object from a TypeTextRequest message. Also converts values to other types if specified.
     * @param message TypeTextRequest
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: commands.TypeTextRequest,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any }

    /**
     * Converts this TypeTextRequest to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any }
  }

  /** Represents a Commands */
  class Commands extends $protobuf.rpc.Service {
    /**
     * Constructs a new Commands service.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     */
    constructor(
      rpcImpl: $protobuf.RPCImpl,
      requestDelimited?: boolean,
      responseDelimited?: boolean
    )

    /**
     * Creates new Commands service using the specified rpc implementation.
     * @param rpcImpl RPC implementation
     * @param [requestDelimited=false] Whether requests are length-delimited
     * @param [responseDelimited=false] Whether responses are length-delimited
     * @returns RPC service. Useful where requests and/or responses are streamed.
     */
    public static create(
      rpcImpl: $protobuf.RPCImpl,
      requestDelimited?: boolean,
      responseDelimited?: boolean
    ): Commands

    /**
     * Calls PressKey.
     * @param request PressKeyRequest message or plain object
     * @param callback Node-style callback called with the error, if any, and Empty
     */
    public pressKey(
      request: commands.IPressKeyRequest,
      callback: commands.Commands.PressKeyCallback
    ): void

    /**
     * Calls PressKey.
     * @param request PressKeyRequest message or plain object
     * @returns Promise
     */
    public pressKey(
      request: commands.IPressKeyRequest
    ): Promise<google.protobuf.Empty>

    /**
     * Calls TypeText.
     * @param request TypeTextRequest message or plain object
     * @param callback Node-style callback called with the error, if any, and Empty
     */
    public typeText(
      request: commands.ITypeTextRequest,
      callback: commands.Commands.TypeTextCallback
    ): void

    /**
     * Calls TypeText.
     * @param request TypeTextRequest message or plain object
     * @returns Promise
     */
    public typeText(
      request: commands.ITypeTextRequest
    ): Promise<google.protobuf.Empty>
  }

  namespace Commands {
    /**
     * Callback as used by {@link commands.Commands#pressKey}.
     * @param error Error, if any
     * @param [response] Empty
     */
    type PressKeyCallback = (
      error: Error | null,
      response?: google.protobuf.Empty
    ) => void

    /**
     * Callback as used by {@link commands.Commands#typeText}.
     * @param error Error, if any
     * @param [response] Empty
     */
    type TypeTextCallback = (
      error: Error | null,
      response?: google.protobuf.Empty
    ) => void
  }

  /** Properties of a MessageEvent. */
  interface IMessageEvent {
    /** MessageEvent event */
    event?: commands.MessageEvent.EventName | null

    /** MessageEvent id */
    id?: number | null

    /** MessageEvent message */
    message?: Uint8Array | null
  }

  /** Represents a MessageEvent. */
  class MessageEvent implements IMessageEvent {
    /**
     * Constructs a new MessageEvent.
     * @param [properties] Properties to set
     */
    constructor(properties?: commands.IMessageEvent)

    /** MessageEvent event. */
    public event: commands.MessageEvent.EventName

    /** MessageEvent id. */
    public id: number

    /** MessageEvent message. */
    public message: Uint8Array

    /**
     * Creates a new MessageEvent instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MessageEvent instance
     */
    public static create(
      properties?: commands.IMessageEvent
    ): commands.MessageEvent

    /**
     * Encodes the specified MessageEvent message. Does not implicitly {@link commands.MessageEvent.verify|verify} messages.
     * @param message MessageEvent message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: commands.IMessageEvent,
      writer?: $protobuf.Writer
    ): $protobuf.Writer

    /**
     * Encodes the specified MessageEvent message, length delimited. Does not implicitly {@link commands.MessageEvent.verify|verify} messages.
     * @param message MessageEvent message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: commands.IMessageEvent,
      writer?: $protobuf.Writer
    ): $protobuf.Writer

    /**
     * Decodes a MessageEvent message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MessageEvent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): commands.MessageEvent

    /**
     * Decodes a MessageEvent message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MessageEvent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): commands.MessageEvent

    /**
     * Verifies a MessageEvent message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null

    /**
     * Creates a MessageEvent message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MessageEvent
     */
    public static fromObject(object: {
      [k: string]: any
    }): commands.MessageEvent

    /**
     * Creates a plain object from a MessageEvent message. Also converts values to other types if specified.
     * @param message MessageEvent
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: commands.MessageEvent,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any }

    /**
     * Converts this MessageEvent to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any }
  }

  namespace MessageEvent {
    /** EventName enum. */
    enum EventName {
      PressKey = 1,
      TypeText = 2,
    }
  }
}

/** Namespace google. */
export namespace google {
  /** Namespace protobuf. */
  namespace protobuf {
    /** Properties of an Empty. */
    interface IEmpty {}

    /** Represents an Empty. */
    class Empty implements IEmpty {
      /**
       * Constructs a new Empty.
       * @param [properties] Properties to set
       */
      constructor(properties?: google.protobuf.IEmpty)

      /**
       * Creates a new Empty instance using the specified properties.
       * @param [properties] Properties to set
       * @returns Empty instance
       */
      public static create(
        properties?: google.protobuf.IEmpty
      ): google.protobuf.Empty

      /**
       * Encodes the specified Empty message. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
       * @param message Empty message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encode(
        message: google.protobuf.IEmpty,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Encodes the specified Empty message, length delimited. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
       * @param message Empty message or plain object to encode
       * @param [writer] Writer to encode to
       * @returns Writer
       */
      public static encodeDelimited(
        message: google.protobuf.IEmpty,
        writer?: $protobuf.Writer
      ): $protobuf.Writer

      /**
       * Decodes an Empty message from the specified reader or buffer.
       * @param reader Reader or buffer to decode from
       * @param [length] Message length if known beforehand
       * @returns Empty
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        reader: $protobuf.Reader | Uint8Array,
        length?: number
      ): google.protobuf.Empty

      /**
       * Decodes an Empty message from the specified reader or buffer, length delimited.
       * @param reader Reader or buffer to decode from
       * @returns Empty
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decodeDelimited(
        reader: $protobuf.Reader | Uint8Array
      ): google.protobuf.Empty

      /**
       * Verifies an Empty message.
       * @param message Plain object to verify
       * @returns `null` if valid, otherwise the reason why it is not
       */
      public static verify(message: { [k: string]: any }): string | null

      /**
       * Creates an Empty message from a plain object. Also converts values to their respective internal types.
       * @param object Plain object
       * @returns Empty
       */
      public static fromObject(object: {
        [k: string]: any
      }): google.protobuf.Empty

      /**
       * Creates a plain object from an Empty message. Also converts values to other types if specified.
       * @param message Empty
       * @param [options] Conversion options
       * @returns Plain object
       */
      public static toObject(
        message: google.protobuf.Empty,
        options?: $protobuf.IConversionOptions
      ): { [k: string]: any }

      /**
       * Converts this Empty to JSON.
       * @returns JSON object
       */
      public toJSON(): { [k: string]: any }
    }
  }
}

/** Namespace events. */
export namespace events {
  /** Properties of a KeyPress. */
  interface IKeyPress {
    /** KeyPress keyCode */
    keyCode?: number | null
  }

  /** Represents a KeyPress. */
  class KeyPress implements IKeyPress {
    /**
     * Constructs a new KeyPress.
     * @param [properties] Properties to set
     */
    constructor(properties?: events.IKeyPress)

    /** KeyPress keyCode. */
    public keyCode: number

    /**
     * Creates a new KeyPress instance using the specified properties.
     * @param [properties] Properties to set
     * @returns KeyPress instance
     */
    public static create(properties?: events.IKeyPress): events.KeyPress

    /**
     * Encodes the specified KeyPress message. Does not implicitly {@link events.KeyPress.verify|verify} messages.
     * @param message KeyPress message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: events.IKeyPress,
      writer?: $protobuf.Writer
    ): $protobuf.Writer

    /**
     * Encodes the specified KeyPress message, length delimited. Does not implicitly {@link events.KeyPress.verify|verify} messages.
     * @param message KeyPress message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: events.IKeyPress,
      writer?: $protobuf.Writer
    ): $protobuf.Writer

    /**
     * Decodes a KeyPress message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns KeyPress
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): events.KeyPress

    /**
     * Decodes a KeyPress message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns KeyPress
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): events.KeyPress

    /**
     * Verifies a KeyPress message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null

    /**
     * Creates a KeyPress message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns KeyPress
     */
    public static fromObject(object: { [k: string]: any }): events.KeyPress

    /**
     * Creates a plain object from a KeyPress message. Also converts values to other types if specified.
     * @param message KeyPress
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: events.KeyPress,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any }

    /**
     * Converts this KeyPress to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any }
  }

  /** Properties of a MessageEvent. */
  interface IMessageEvent {
    /** MessageEvent event */
    event?: events.MessageEvent.EventName | null

    /** MessageEvent id */
    id?: number | null

    /** MessageEvent message */
    message?: Uint8Array | null
  }

  /** Represents a MessageEvent. */
  class MessageEvent implements IMessageEvent {
    /**
     * Constructs a new MessageEvent.
     * @param [properties] Properties to set
     */
    constructor(properties?: events.IMessageEvent)

    /** MessageEvent event. */
    public event: events.MessageEvent.EventName

    /** MessageEvent id. */
    public id: number

    /** MessageEvent message. */
    public message: Uint8Array

    /**
     * Creates a new MessageEvent instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MessageEvent instance
     */
    public static create(properties?: events.IMessageEvent): events.MessageEvent

    /**
     * Encodes the specified MessageEvent message. Does not implicitly {@link events.MessageEvent.verify|verify} messages.
     * @param message MessageEvent message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encode(
      message: events.IMessageEvent,
      writer?: $protobuf.Writer
    ): $protobuf.Writer

    /**
     * Encodes the specified MessageEvent message, length delimited. Does not implicitly {@link events.MessageEvent.verify|verify} messages.
     * @param message MessageEvent message or plain object to encode
     * @param [writer] Writer to encode to
     * @returns Writer
     */
    public static encodeDelimited(
      message: events.IMessageEvent,
      writer?: $protobuf.Writer
    ): $protobuf.Writer

    /**
     * Decodes a MessageEvent message from the specified reader or buffer.
     * @param reader Reader or buffer to decode from
     * @param [length] Message length if known beforehand
     * @returns MessageEvent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(
      reader: $protobuf.Reader | Uint8Array,
      length?: number
    ): events.MessageEvent

    /**
     * Decodes a MessageEvent message from the specified reader or buffer, length delimited.
     * @param reader Reader or buffer to decode from
     * @returns MessageEvent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decodeDelimited(
      reader: $protobuf.Reader | Uint8Array
    ): events.MessageEvent

    /**
     * Verifies a MessageEvent message.
     * @param message Plain object to verify
     * @returns `null` if valid, otherwise the reason why it is not
     */
    public static verify(message: { [k: string]: any }): string | null

    /**
     * Creates a MessageEvent message from a plain object. Also converts values to their respective internal types.
     * @param object Plain object
     * @returns MessageEvent
     */
    public static fromObject(object: { [k: string]: any }): events.MessageEvent

    /**
     * Creates a plain object from a MessageEvent message. Also converts values to other types if specified.
     * @param message MessageEvent
     * @param [options] Conversion options
     * @returns Plain object
     */
    public static toObject(
      message: events.MessageEvent,
      options?: $protobuf.IConversionOptions
    ): { [k: string]: any }

    /**
     * Converts this MessageEvent to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any }
  }

  namespace MessageEvent {
    /** EventName enum. */
    enum EventName {
      KeyPress = 1,
    }
  }
}
