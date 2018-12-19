#include <Arduino.h>
#include <WebSocketsServer.h>
#include <ArduinoJson.h>

extern double reqCount;

class DirectConnection {
public:
  DirectConnection();

  void setup();
  void loop();
  bool connected();

  void emit(String topic, DynamicJsonBuffer& jsonBuffer,
                            JsonVariant data,
                            int num = 0,
                            double id = ++reqCount
                            );

private:
  String serialize(String  topic, DynamicJsonBuffer& jsonBuffer,
                                   JsonVariant data, double id);
  void websocketEvent(uint8_t num, WStype_t type, uint8_t* payload,
                    size_t length);
};
