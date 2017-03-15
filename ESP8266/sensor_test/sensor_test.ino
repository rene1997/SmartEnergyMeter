#define sensorInput A0  

void setup() {
  Serial.begin(9600);
  pinMode(sensorInput, INPUT);

}

void loop() {
  int sensorValue = analogRead(sensorInput); 
  Serial.println(String("currenty value: ") + sensorValue);
  delay(5);
}
