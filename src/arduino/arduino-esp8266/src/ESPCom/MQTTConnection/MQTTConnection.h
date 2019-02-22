#include <Arduino.h>
#include <ArduinoJson.h>
#include <WebSocketsServer.h>

extern double reqCount;

class MQTTConnection {
public:
  MQTTConnection();

  static void reconnect();

  void setup();
  void loop();
  bool connected();

  void emit(String topic, DynamicJsonBuffer& jsonBuffer, JsonVariant data, double id = ++reqCount);

private:
  String serialize(DynamicJsonBuffer& jsonBuffer,
                                       JsonVariant data,
                                       double id);
  void mqttEvent(String topic, byte* payload, unsigned int length);

  String encodeCommandTopic(String deviceId, String topic);
  String encodeStatusTopic(String deviceId, String topic);

  String decodeCommandTopic(String deviceId, String mqttTopic);
};
