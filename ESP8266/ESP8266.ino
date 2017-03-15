#include <ESP8266WiFi.h>
#define sensorInput A0  

//WIFI fields:
const char* ssid = "Keijzer";
const char* password = "bassuselirenbar5";

//rest service fields:
const char* host = "87.195.159.225";
const int httpPort = 8081;
const char* sendDataUrl = "/apiV1/sendData";
const int deviceId = 1;

//pin fields
const int checkValue = 20;
bool sensorValue = false;
int amountOfInterrupts = 0;

//time fields for sending data to server
const int checkTimeSeconds = 60;
int timer = 0;


void setup() {
  Serial.begin(9600);
  setupHardware();
  setupWIFI();
}

void loop() {
  checkSensor();
  delay(5);
  timer ++;
  if(timer >= checkTimeSeconds * 200){
    Serial.println(String("sending data to server \namount of interrupts: ") + amountOfInterrupts);
    sendSensorData();
    //reset values
    timer = amountOfInterrupts =0;
  }
}

//function to set the pin layout
void setupHardware(){
  pinMode(sensorInput, INPUT);
  pinMode(2, OUTPUT);
  Serial.println(String("default analog value: ") + analogRead(sensorInput));
  sensorValue = analogRead(sensorInput) > checkValue; 
  Serial.println(String("currenty value: ") + sensorValue);
}

//function to check the light sensor from analog pin 0 (A0)
void checkSensor(){
  bool newSensorValue = analogRead(sensorInput) > checkValue;
  if(sensorValue == newSensorValue)
    return;         //nothing changed go sleep
    
  //Serial.println(String("new sensor data: ") + newSensorValue);
  sensorValue = newSensorValue;
  digitalWrite(2, !sensorValue);
  if(sensorValue)
    amountOfInterrupts ++;  
}

//function to send the sensor data to the server
void sendSensorData(){
  String data = String("SensorValue=") + amountOfInterrupts + "&DeviceId=" + deviceId;
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

  





