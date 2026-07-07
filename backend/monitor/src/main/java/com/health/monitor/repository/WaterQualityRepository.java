package com.health.monitor.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.health.monitor.entity.WaterQuality;

public interface WaterQualityRepository extends JpaRepository<WaterQuality, Integer> {
}