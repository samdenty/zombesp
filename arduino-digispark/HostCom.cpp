#include <TrinketKeyboard.h>
#include <Arduino.h>
#include "HostCom.h"
#include "Keycodes.h"

const int LED_PIN = 1;
const int MIN_FRAME_THRESHOLD = 20;


const int BIT_LED = KB_LED_SCROLL;
const int FRAME_LED = KB_LED_NUM;

const int BIT_KEY = KEY_SCROLLLOCK;
const int FRAME_KEY = KEY_NUMLOCK;

HostCom::HostCom() {}

void HostCom::setup() {
  TrinketKeyboard.begin();
  pinMode(LED_PIN, OUTPUT);
}

bool HostCom::getState(uint8_t  ledNum) {
  return TrinketKeyboard.getLEDstate() & ledNum;
}

void TrinketHidCompatibleDelay(unsigned int desiredDelay)
{
  unsigned long t_start = millis(); //ms
  while (millis()-t_start<desiredDelay)
  {
    TrinketKeyboard.poll();
  }
}

bool HostCom::setState(uint8_t keyNum, uint8_t ledNum, bool state, bool ensureState) {
  if (getState(ledNum) != state) {
    TrinketKeyboard.pressKey(0, keyNum);
    TrinketKeyboard.pressKey(0, 0);
  }

  if (ensureState) {
    unsigned long t_start = millis();
    while (getState(ledNum) != state) {
      TrinketKeyboard.poll();
      unsigned long timeTaken = millis() - t_start;

      // If it's taking too long, retry
      if (timeTaken > 100) {
        return setState(keyNum, ledNum, state, ensureState);
      }
    }
  }

  return state;
}

char currentByte = 0;
int byteIndex = 0;


void HostCom::loop() {
  TrinketKeyboard.poll();

  bool frame = getState(FRAME_LED);

  // If the Frame has just been set HIGH
  if (frame) {
    // Sometimes the bit key flickers when both keys are pressed at once
    int remainingThreshold = MIN_FRAME_THRESHOLD;
    while(remainingThreshold--) {
      if (frame != getState(FRAME_LED)) return;
      TrinketHidCompatibleDelay(1);
    }

    bool bit = getState(BIT_LED);

    currentByte |= bit<<(7-byteIndex);
    // TrinketKeyboard.print((String)byteIndex+":"+bit+ " ; ");

    byteIndex++;
    if (byteIndex == 8) {
      TrinketKeyboard.print(currentByte);

      currentByte = 0;
      byteIndex = 0;
    }

    // TrinketKeyboard.print(bit ? "1" : "0");

    setState(FRAME_KEY, FRAME_LED, false);
    prevFrame = frame;

    // String t = bit ? "1" : "0";
    // TrinketKeyboard.print(t);
  }

  // uint8_t buttonLEDstate = TrinketKeyboard.getLEDstate();
  /*TrinketKeyboard.print(buttonLEDstate,BIN); TrinketKeyboard.print(", "); TrinketKeyboard.println(buttonLEDstate);
  TrinketKeyboard.print("test"); TrinketKeyboard.print(", "); TrinketKeyboard.println(buttonLEDstate);
  TrinketKeyboard.println();*/

  // digitalWrite(LED_PIN, frame ? HIGH : LOW);
}
