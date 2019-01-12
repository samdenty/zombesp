#include "MQTTConnection.h"
#include "../ESPCom.h"
#include <Timer.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

extern ESPCom espCom;
extern Timer timer;

WiFiClient wifiClient;
PubSubClient client(wifiClient);

String clientId = "esp8266";
const char* mqttServer = "192.168.1.104";
const int mqttPort = 1883;

int reconnectTimer = -1;

MQTTConnection::MQTTConnection() {}

void MQTTConnection::loop() {
  if (!connected() && reconnectTimer == -1) reconnect();

  client.loop();
}

void MQTTConnection::setup() {
  client.setServer(mqttServer, mqttPort);
  client.setCallback([=](char* topic, byte* payload, unsigned int length) {
    return this->mqttEvent(topic, payload, length);
  });
}

bool MQTTConnection::connected() {
  return client.connected();
}

// TODO: Check how long ago we was previously connected to the server to calculate the interval between retries.
// Possibly randomize it as well, to make the network traffic look inconspicuous.
void MQTTConnection::reconnect() {
  Serial.print("Attempting to connect to MQTT...");

  if (client.connect(clientId.c_str())) {
    client.subscribe((clientId + "/command/hello").c_str());
    reconnectTimer = -1;
  } else {
    // If connected via different protocol, slow down
    // the reconnection attempts as it blocks the CPU up.
    reconnectTimer = timer.setTimeout((espCom.connected() ? 30 : 1) * 1000, reconnect);
  }
}

void MQTTConnection::emit(String topic, DynamicJsonBuffer& jsonBuffer,
                           JsonVariant data, double id) {
  String mqttTopic = encodeStatusTopic(clientId, topic);
  String mqttMessage = serialize(jsonBuffer, data, id);

  client.publish(mqttTopic.c_str(), (const char*)mqttMessage.c_str());
}

String MQTTConnection::encodeCommandTopic(String clientId, String topic) {
  return clientId + "/command/" + topic;
}

String MQTTConnection::encodeStatusTopic(String clientId, String topic) {
  return clientId + "/status/" + topic;
}

String MQTTConnection::decodeCommandTopic(String clientId, String mqttTopic) {
  String before = encodeCommandTopic(clientId, "");
  if (!mqttTopic.startsWith(before))
    return "";

  String topic = mqttTopic.substring(before.length());
  return topic;
}

void MQTTConnection::mqttEvent(String mqttTopic, byte* payload,
                                unsigned int length) {
  String topic = decodeCommandTopic(clientId, mqttTopic);

  if (topic != "") {
    // Allocate memory for json deserializing / serializing
    DynamicJsonBuffer jsonBuffer;

    // Parse message
    JsonArray& message = jsonBuffer.parseArray(payload);

    String clientRef = message[0];
    double reqId = message[1];

    // Capture and serialize acknowledgement
    JsonVariant data = espCom.handleMessage(topic, message[2], jsonBuffer);

    Serial.print(topic);

    emit("ack/" + clientRef, jsonBuffer, data, reqId);
  }
}

String MQTTConnection::serialize(DynamicJsonBuffer& jsonBuffer,
                                  JsonVariant data,
                                  double id) {
  JsonArray& message = jsonBuffer.createArray();

  // Add to array, format: [topic, id, data]
  message.add(id);
  message.add(data);

  // Serialize to JSON
  String json;
  message.printTo(json);

  return json;
}
