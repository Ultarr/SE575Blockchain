package test2;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class GreetServer {
    private ServerSocket serverSocket;
    private Socket clientSocket;
    private PrintWriter out;
    private BufferedReader in;

    private String match;
    private int maxTries;
 
    public void start(int port) throws IOException, InterruptedException, NoSuchAlgorithmException {
        serverSocket = new ServerSocket(port);
        System.out.println("Before");
        clientSocket = serverSocket.accept();
        clientSocket.sendUrgentData(0);
        out = new PrintWriter(clientSocket.getOutputStream(), true);
        in = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
        while (true) {
        	String greeting = in.readLine();
        	if (greeting.contains("Match:")) {
        		match = greeting.substring(6);
        		System.out.println(match);
        	}
        	else if (greeting.contains("MaxTries:")) {
        		maxTries = Integer.parseInt(greeting.substring(9));
        		System.out.println(maxTries);
        	}
            if (greeting.contains("Hash:")) {
            	int response = this.getNonce(greeting);
                out.println("HTTP/1.1 200 OK\r\nAccess-Control-Allow-Origin: *\r\n\r\n" + response);
                break;
            }
            else {
            }
        }
    }
 
    public void stop() throws IOException {
        in.close();
        out.close();
        clientSocket.close();
        serverSocket.close();
    }

    private int getNonce(String input) throws NoSuchAlgorithmException {
    	int result = 0;
    	input = input.substring(5);
    	System.out.println("Input: " + input);
    	for (int i = 0; i <= maxTries; i++) {
    		String tempInput = input + i;
	    	MessageDigest digest = MessageDigest.getInstance("SHA-256");
	    	byte[] encodedhash = digest.digest(tempInput.getBytes(StandardCharsets.UTF_8));
	    	String testResult = bytesToHex(encodedhash);
	    	if (testResult.startsWith(match)) {
	    		result = i;
	    		break;
	    	}
    	}
    	return result;
    }

    private static String bytesToHex(byte[] hash) {
        StringBuffer hexString = new StringBuffer();
        for (int i = 0; i < hash.length; i++) {
        String hex = Integer.toHexString(0xff & hash[i]);
        if(hex.length() == 1) hexString.append('0');
            hexString.append(hex);
        }
        return hexString.toString();
    }

    public static void main(String[] args) throws IOException, InterruptedException, NoSuchAlgorithmException {
        GreetServer server = new GreetServer();
        while (true) {
        	server.start(8080);
        	server.stop();
        }
    }
}