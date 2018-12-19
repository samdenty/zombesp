#include <Arduino.h>

class HostCom {
public:
  HostCom();

  void setup();
  void loop();

private:
  bool prevFrame;

  bool getState(uint8_t keyNum);
  bool setState(uint8_t keyNum, uint8_t ledNum, bool state, bool ensureState = true);
};
