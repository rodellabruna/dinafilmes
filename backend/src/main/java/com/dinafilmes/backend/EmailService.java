
package com.dinafilmes.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String toEmail, String subject, String body) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(toEmail);
            helper.setSubject(subject);
            helper.setText(body, true); // O segundo parâmetro 'true' indica que o texto é HTML
            helper.setFrom("dinafilmes2024@gmail.com");

            mailSender.send(message);
        } catch (Exception e) {
            e.printStackTrace(); // Gerencie a exceção adequadamente no seu projeto
        }
    }
}