package com.health.monitor.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.health.monitor.entity.WaterQuality;
import com.health.monitor.repository.WaterQualityRepository;

import java.util.List;

@Service
public class WaterQualityService {

    @Autowired
    private WaterQualityRepository repository;

    public List<WaterQuality> getAllReadings() {
        return repository.findAll();
    }

    public WaterQuality saveReading(WaterQuality reading) {
        return repository.save(reading);
    }

    public void deleteReading(Integer id) {
        repository.deleteById(id);
    }
}