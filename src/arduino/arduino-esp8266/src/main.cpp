#include "./ESPCom/ESPCom.h"
#include <Timer.h>
#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>

#include <pb_encode.h>
#include <pb_decode.h>
#include <protobuf.pb.h>

Timer timer;
ESP8266WebServer server(80);
ESPCom espCom;

const char* ssid = "testing-iot";
const char* password = "testing-iot";


void print_buffer(byte buffer[], unsigned int len) {
  Serial.print("[");
  for (int i = 0; i < len; i++) {
    Serial.print(+buffer[i]);
    Serial.print(", ");
  }
  Serial.print("]");
}

String WebPage =
    "<!DOCTYPE html><html><style>input[type=\"text\"]{width: 90%; height: "
    "3vh;}input[type=\"button\"]{width: 9%; height: 3.6vh;}.rxd{height: "
    "90vh;}textarea{width: 99%; height: 100%; resize: "
    "none;}</style><script>var Socket;function start(){Socket=new "
    "WebSocket('ws://' + window.location.hostname + ':81/'); "
    "Socket.onmessage=function(evt){document.getElementById(\"rxConsole\")."
    "value +=evt.data;}}function "
    "enterpressed(){Socket.send(document.getElementById(\"txbuff\").value); "
    "document.getElementById(\"txbuff\").value=\"\";}</script><body "
    "onload=\"javascript:start();\"> <div><input class=\"txd\" type=\"text\" "
    "id=\"txbuff\" onkeydown=\"if(event.keyCode==13) enterpressed();\"><input "
    "class=\"txd\" type=\"button\" onclick=\"enterpressed();\" value=\"Send\" "
    "> </div><br><div class=\"rxd\"> <textarea id=\"rxConsole\" "
    "readonly></textarea> </div></body></html>";



struct EmitArgs {
  const pb_field_t *fields;
  const void *src_struct;
};

void emit(const pb_field_t fields[], const void *src_struct) {
  uint8_t buffer[128];
  events_MessageEvent messageEvent = events_MessageEvent_init_zero;
  messageEvent.event = events_MessageEvent_EventName_KeyPress;
  pb_ostream_t stream = pb_ostream_from_buffer(buffer, sizeof(buffer));

  EmitArgs emitArgs = {fields, src_struct};
  messageEvent.message.arg = &emitArgs;

  messageEvent.message.funcs.encode = [](pb_ostream_t *stream, const pb_field_t *field, void * const *arg) {
    EmitArgs * emitArgs = (EmitArgs*)(*arg);

    pb_encode_tag_for_field(stream, field);
    pb_encode_submessage(stream, emitArgs->fields, emitArgs->src_struct);

    return true;
 };

  pb_encode(&stream, events_MessageEvent_fields, &messageEvent);

  print_buffer(buffer, stream.bytes_written);
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  Serial.println("");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/", []() { server.send(200, "text/html", WebPage); });

  server.begin();

  espCom.setup();

  events_KeyPress keyPress = events_KeyPress_init_zero;
  keyPress.key_code = 1089;

  emit(events_KeyPress_fields, &keyPress);
}



void loop() {
  espCom.loop();
  timer.run();
  server.handleClient();
}
