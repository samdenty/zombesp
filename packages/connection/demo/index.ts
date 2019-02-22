import { events, commands } from '../src/generated'

async function bootstrap() {
  const packEvent = (message: { constructor: any }) => {
    const event = Object.entries(events).find(
      ([name, type]) => type === message.constructor
    )
    if (!event) throw new Error()

    // console.log(message.constructor)
    const eventId: events.MessageEvent.EventName = events.MessageEvent
      .EventName[event[0]] as any

    return events.MessageEvent.create({
      event: eventId,
      message: message.constructor.encode(message).finish(),
    })
  }

  const unpackEvent = ({ event, message }: events.MessageEvent) => {
    const eventName = events.MessageEvent.EventName[event]
    const Type = events[eventName]

    if (!Type || typeof Type.decode !== 'function') throw new Error()

    return Type.decode(message)
  }

  const on = <Event extends typeof events[keyof typeof events]>(
    event: Event,
    callback: (event: Event['prototype'], message: events.MessageEvent) => void
  ) => {}

  on(events.KeyPress, (data, messageEvent) => {})

  const keypress = events.KeyPress.create({ keyCode: 1001101010 })

  const message = packEvent(keypress)

  const encoded = events.MessageEvent.encode(message).finish()

  const decoded = unpackEvent(events.MessageEvent.decode(encoded))

  console.log(
    events.MessageEvent.encode(
      events.MessageEvent.create({
        event: events.MessageEvent.EventName.KeyPress,
        message: events.KeyPress.encode(
          events.KeyPress.create({
            keyCode: 7445,
          })
        ).finish(),
      })
    ).finish()
  )

  const messageEvent = unpackEvent(
    events.MessageEvent.decode(Uint8Array.from([26, 3, 8, 193, 8]))
  )

  console.log(messageEvent)

  console.log(encoded, decoded)
  const service = commands.Commands.create((method, requestData, callback) => {
    const eventId = commands.MessageEvent.EventName[method.name]

    const message = commands.MessageEvent.create({
      event: eventId,
      message: requestData,
    })

    // callback(
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

  // const result = await keyboard.pressKey({
  //   keyCode: 10,
  // })

  // console.log(result)
}

bootstrap()
