#include <Arduino.h>
#include <ArduinoJson.h>
#include <Timer.h>

#include "./MQTTConnection/MQTTConnection.h"
#include "./DirectConnection/DirectConnection.h"
#include "ESPCom.h"

extern Timer timer;
extern ESPCom espCom;

DirectConnection directConnection;
MQTTConnection mqttConnection;

double reqCount;

ESPCom::ESPCom() { Serial.print("Constructor called"); }


// void testie() {
//   DynamicJsonBuffer emitBuffer;
//   JsonObject& emitMsg = emitBuffer.createObject();
//   emitMsg["test"] = "hello";
//   espCom.emit("hello", emitBuffer, emitMsg);
//   Serial.print(timer.hasElapsed(testA) ? "a" : "b");
// }

void ESPCom::setup() {
  directConnection.setup();
  mqttConnection.setup();
}

void ESPCom::loop() {
  directConnection.loop();
  mqttConnection.loop();
}

JsonVariant ESPCom::handleMessage(String topic, JsonVariant data,
                                  DynamicJsonBuffer& jsonBuffer) {
  if (topic == "hello") {
    JsonObject& reply = jsonBuffer.createObject();
    String test = data;
    reply["message"] = "Ayy " + test;

    return reply;
  }

  if (topic == "millis") {
    return millis();
  }

  if (topic == "input") {
    String string = data["string"];
    int interval = data["interval"];

    Serial.print("Typing " + string + " at " + interval + " interval");
  }

  if (topic == "restart") {
    ESP.restart();
  }

  return (char*)NULL;
}

bool ESPCom::connected() {
  return mqttConnection.connected() || directConnection.connected();
}

void ESPCom::emit(String topic, DynamicJsonBuffer& jsonBuffer,
                  JsonVariant data = 0) {
  directConnection.emit(topic, jsonBuffer, data);
  mqttConnection.emit(topic, jsonBuffer, data);
}

JsonVariant ESPCom::on(String topic, void (*callback)(JsonVariant data, DynamicJsonBuffer& jsonBuffer)) {

};
