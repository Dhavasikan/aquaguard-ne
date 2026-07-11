package com.health.monitor.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @PostMapping("/ask")
    public ResponseEntity<String> ask(@RequestBody Map<String, String> body) {
        String question = body.get("question");

        String geminiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key="
                + geminiApiKey;

        String systemPrompt = "You are the AquaGuard NE Health and Water Assistant, built into a community health monitoring website for Northeast India. "
                + "Answer questions about water-borne diseases (cholera, typhoid, hepatitis A, diarrhea, leptospirosis), "
                + "medicines, water safety, hygiene, and general health topics. Keep answers clear, concise, and practical "
                + "for community health workers. If asked something unrelated to health or this website, politely redirect "
                + "the conversation back to health and water topics. Question: " + question;

        String requestBody = "{\"contents\":[{\"parts\":[{\"text\":\"" 
                + systemPrompt.replace("\"", "\\\"").replace("\n", " ") 
                + "\"}]}]}";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        org.springframework.http.HttpEntity<String> entity = new org.springframework.http.HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(geminiUrl, entity, String.class);
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
}