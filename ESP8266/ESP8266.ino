#include <ESP8266WiFi.h>
#define sensorInput A0  

//WIFI fields:
const char* ssid = "AndroidAP";
const char* password = "7e3f8e8c95de";

//rest service fields:
const char* host = "87.195.159.225";
const int httpPort = 8081;
const char* sendDataUrl = "/apiV1/addmeasurement";
const char* serverkey = "175d6c2c2632e0f87a07f32e88a690104f921b517c7af1c6333de2dfad9be8e3";
const int deviceId = 1;
const int defaultkwh = 375;

//pin fields
const int checkValue = 200;
bool isBlackLine = false;

void setup() {
  Serial.begin(9600);
  pinMode(sensorInput, INPUT);
  pinMode(2, OUTPUT);
  setupWIFI();
}

void loop() {
  delay(2);
  checkSensor();
}

//function to check the light sensor from analog pin 0 (A0)
void checkSensor(){
  bool sensorValue = analogRead(sensorInput) > checkValue;
  
  if(isBlackLine == sensorValue)
    return;
  isBlackLine = sensorValue;

  //burn onboard led
  digitalWrite(2, !isBlackLine);
  
  if(isBlackLine)
    sendSensorData();
}


//function to send the sensor data to the server
void sendSensorData(){
  String data = String("kwh=") + defaultkwh + 
    "&hardwareId=" + deviceId +
    "&serverKey=" + serverkey
    ;
  SendPostRequest(data, sendDataUrl);
}

void setupWIFI(){
  Serial.print("Connecting to "); Serial.println(ssid);
  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED){
    delay(500); Serial.print(".");
  }
  Serial.print("\n WiFi connected \nIP address: ");
  Serial.println(WiFi.localIP());
  //blink short
  for(int i = 0; i <6; i++){
    digitalWrite(2,i %2);
    delay(500); 
  } 
}

void SendPostRequest(String data, String url){
  Serial.println(String("sending post request to: ") + url);
  WiFiClient client;
  if(!client.connect(host, httpPort)){
    Serial.println("connection failed");
    return;
  }
  client.println(String("POST ") + url + " HTTP/1.1");
  client.println(String("Host: ") + host);
  client.println("Cache-Conrol: no-cache");
  client.println("Connection: close");
  client.println("Content-Type:application/x-www-form-urlencoded");
  client.println(String("Content-Length: ") + data.length());
  client.println(String("\n") + data);
  delay(500);
  
  Serial.println("response: ");

  while(client.connected()){
    if(client.available()){
      char line = client.read();
      Serial.print(line);
    }  
  }
  Serial.println("\nClosing connection");
}

  





