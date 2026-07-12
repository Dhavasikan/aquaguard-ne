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
@RequestMapping("/api/ai")
public class AiController {

    @Value("${groq.api.key}")
    private String groqApiKey;

    @PostMapping("/summarize")
    public ResponseEntity<String> summarize(@RequestBody Map<String, String> body) {
        String prompt = body.get("prompt");

        String groqUrl = "https://api.groq.com/openai/v1/chat/completions";

        String requestBody = "{"
                + "\"model\":\"llama-3.1-8b-instant\","
                + "\"messages\":[{\"role\":\"user\",\"content\":\""
                + prompt.replace("\"", "\\\"").replace("\n", " ")
                + "\"}]"
                + "}";

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(groqApiKey);

        org.springframework.http.HttpEntity<String> entity = new org.springframework.http.HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(groqUrl, entity, String.class);
            return ResponseEntity.ok(response.getBody());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"error\":\"" + e.getMessage() + "\"}");
        }
    }
}