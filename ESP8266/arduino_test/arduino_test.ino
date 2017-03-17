#define sensorInput A0

void setup() {
  Serial.begin(9600);
  setupHardware();

}

void loop() {
   Serial.println(String("current value:") + analogRead(sensorInput));
   delay(500);

}

void setupHardware(){
  pinMode(sensorInput, INPUT);
  Serial.println(String("default value:") + analogRead(sensorInput));
}

