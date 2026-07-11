package com.health.monitor.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.health.monitor.entity.WaterQuality;
import com.health.monitor.service.WaterQualityService;

@RestController
@RequestMapping("/api/water")
public class WaterQualityController {

    @Autowired
    private WaterQualityService service;

    @GetMapping
    public List<WaterQuality> getAll() {
        return service.getAllReadings();
    }

    @PostMapping
    public WaterQuality create(@RequestBody WaterQuality reading) {
        return service.saveReading(reading);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id) {
        service.deleteReading(id);
        return "Reading deleted successfully";
    }
}