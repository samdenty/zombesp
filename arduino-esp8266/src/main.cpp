#include "./ESPCom/ESPCom.h"
#include <Timer.h>
#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>
#include <WiFiClient.h>

Timer timer;
ESP8266WebServer server(80);
ESPCom espCom;

const char* ssid = "network";
const char* password = "pass";

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
}

void loop() {
  espCom.loop();
  timer.run();
  server.handleClient();
}
