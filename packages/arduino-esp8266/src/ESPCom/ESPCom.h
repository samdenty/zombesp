#include <Arduino.h>
#include <ArduinoJson.h>

class ESPCom {
public:
  ESPCom();

  void setup();
  void loop();
  bool connected();

  JsonVariant handleMessage(String topic, JsonVariant data,
                            DynamicJsonBuffer& jsonBuffer);

  void emit(String topic, DynamicJsonBuffer& jsonBuffer, JsonVariant data);
  JsonVariant on(String topic, void (*callback)(JsonVariant data, DynamicJsonBuffer& jsonBuffer));

private:
  const static int MAX_LISTENERS = 5;

  typedef struct {
    String topic;
    void* callback;
  } listener_t;

  listener_t listeners[MAX_LISTENERS];
};
