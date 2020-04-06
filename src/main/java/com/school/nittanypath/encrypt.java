package com.school.nittanypath;

import java.io.*;
import java.util.List;
import org.mindrot.jbcrypt.BCrypt;

public class encrypt {

    public static void main(String[] args) {

        String csvFile = "../CanvasPath/data/users_not_encrypted.csv";
        BufferedReader br = null;
        String line = "";
        String cvsSplitBy = ",";
        try {
            FileWriter myWriter = new FileWriter("../CanvasPath/data/java_encrypted.csv");
            br = new BufferedReader(new FileReader(csvFile));
            myWriter.write("Email,Password\n");
            while ((line = br.readLine()) != null) {

                // use comma as separator
                String[] l = line.split(cvsSplitBy);

                String hashed = BCrypt.hashpw(l[1], BCrypt.gensalt());
                myWriter.write(l[0] + "," + hashed + '\n');
                System.out.println(l[0]);

            }
            myWriter.close();

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }

}