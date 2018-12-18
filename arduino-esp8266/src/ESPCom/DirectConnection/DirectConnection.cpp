#include "DirectConnection.h"
#include "../ESPCom.h"
#include <WebSocketsServer.h>

extern ESPCom espCom;

WebSocketsServer websocket = WebSocketsServer(81);

DirectConnection::DirectConnection() {}

void DirectConnection::loop() {
  websocket.loop();
}

void DirectConnection::setup() {
  websocket.begin();
  websocket.onEvent(
      [=](uint8_t num, WStype_t type, uint8_t* payload, size_t length) {
        return this->websocketEvent(num, type, payload, length);
      });
}

bool DirectConnection::connected() {
  return websocket.connectedClients() != 0;
}

void DirectConnection::emit(String topic, DynamicJsonBuffer& jsonBuffer,
                            JsonVariant data, int num, double id) {
  String json = serialize(topic, jsonBuffer, data, id);

  if (num == 0) {
    // Send event to all open websockets
    websocket.broadcastTXT(json);
  } else {
    // Send to specific websocket
    websocket.sendTXT(num, json);
  }
}



void DirectConnection::websocketEvent(uint8_t num, WStype_t type,
                                      uint8_t* payload, size_t length) {
  if (type == WStype_TEXT) {
    // Allocate memory for json deserializing / serializing
    DynamicJsonBuffer jsonBuffer;

    // Parse message
    JsonArray& message = jsonBuffer.parseArray(payload);

    String topic = message[0];
    short int reqId = message[1];

    // Capture and serialize acknowledgement
    JsonVariant data = espCom.handleMessage(topic, message[2], jsonBuffer);

    // Emit to websocket
    emit("ack", jsonBuffer, data, num, reqId);
  }
}

String DirectConnection::serialize(String topic, DynamicJsonBuffer& jsonBuffer,
                                   JsonVariant data, double id) {
  JsonArray& message = jsonBuffer.createArray();

  // Add to array, format: [topic, id, data]
  message.add(topic);
  message.add(id);
  message.add(data);

  // Serialize to JSON
  String json;
  message.printTo(json);

  return json;
}
