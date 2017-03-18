# SmartEnergyMeter
3e jaars project Technisch Informatica Bachelor Sensornetwerken

#installation

to install this application, checkout the server branche
* make sure you have installed nodjes, npm and mongodb
* run the following commands:
	cd Rest_Service && npm install
	cd Anguler_Applicatie && npm install

* to run the server on startup place the following lines in /etc/rc.local
	forever <dir to repo>/Rest_Service/ >> <dir to repo>/Rest_Service/log/log.log &
	sudo npm start --prefix <dir to repo>/Angular_Applicatie >> <dir to repo>/Angular_Applicatie/log/log.log &

