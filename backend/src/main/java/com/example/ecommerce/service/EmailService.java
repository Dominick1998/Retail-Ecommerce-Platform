package com.example.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

/**
 * EmailService is a Spring service component responsible for sending email notifications.
 * It is designed to handle operations such as sending order confirmation emails to customers.
 */
@Service
public class EmailService {

    // Injecting the JavaMailSender bean to handle email-sending functionality
    @Autowired
    private JavaMailSender mailSender;

    /**
     * Sends an order confirmation email to the specified recipient.
     *
     * @param toEmail The recipient's email address.
     * @param subject The subject of the email.
     * @param body    The body content of the email.
     */
    public void sendOrderConfirmation(String toEmail, String subject, String body) {
        // Create a new SimpleMailMessage object to represent the email
        SimpleMailMessage message = new SimpleMailMessage();
        
        // Set the recipient's email address
        message.setTo(toEmail);
        
        // Set the subject of the email
        message.setSubject(subject);
        
        // Set the body content of the email
        message.setText(body);
        
        // Use the JavaMailSender instance to send the email
        mailSender.send(message);
    }
}