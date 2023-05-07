
# ishaprawy Admin Dashboard


## Up and running


You have two ways to get this app up and running.

*At first, you have to provide a `.env` file in the root directory that contains a single environment variable `NEXT_PUBLIC_API_URL`*
  

 1. **Directly**

	For this, you need to be sure; that you are using **node version <= 14** and **yarn** as a package manager.

	  

	And open your terminal and run the following command.

	  

	```bash
	yarn
	```
---  

 1. **Through docker** *(Recommeded)*

	Visit [docker official page](https://www.docker.com/) to install a copy of docker on your computer


	Once installed all you need to do is to open the terminal and run the following command.
	  
	```bash
	docker-compose -f docker-compose.dev.yml up --build
	```

	For **installing any new packages**, open a new terminal window and run.

	```bash
	docker exec -it ishaprawy-dashboad sh
	```

	You are now *inside the container*; you can **run your regular commands**, for instance.

	```bash
	yarn add <your package name>
	```