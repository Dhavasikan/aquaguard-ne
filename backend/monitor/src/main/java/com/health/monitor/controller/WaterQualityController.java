package com.health.monitor.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.health.monitor.entity.WaterQuality;
import com.health.monitor.service.WaterQualityService;

import java.util.List;

@RestController
@RequestMapping("/api/water")
@CrossOrigin(origins = "https://aquaguard-ne.vercel.app")
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