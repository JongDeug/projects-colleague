package com.joinus.joinus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JoinUsApplication {

	public static void main(String[] args) {
		try
		{
			SpringApplication.run(JoinUsApplication.class, args);
		}
		catch (Exception e){
			e.printStackTrace();
			throw e;
		}
	}

}