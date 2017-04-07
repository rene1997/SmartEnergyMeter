#define sensorInput A0  

void setup() {
  Serial.begin(9600);
  pinMode(sensorInput, INPUT);
  pinMode(2,OUTPUT);

}

void loop() {
  int sensorValue = analogRead(sensorInput); 
  Serial.println(String("currenty value: ") + sensorValue);
  digitalWrite(2, sensorValue != 1024);
  delay(50);
}
