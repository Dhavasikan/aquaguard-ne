package com.health.monitor.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AiService {

    @Value("${groq.api.key}")
    private String groqApiKey;

    public String getAiSummary(String prompt) {
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

        ResponseEntity<String> response = restTemplate.postForEntity(groqUrl, entity, String.class);
        String body = response.getBody();

        int contentStart = body.indexOf("\"content\":\"") + 11;
        int contentEnd = body.indexOf("\"", contentStart);
        return body.substring(contentStart, contentEnd).replace("\\n", " ");
    }
}