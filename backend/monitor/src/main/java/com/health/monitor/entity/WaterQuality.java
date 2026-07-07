package com.health.monitor.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "water_quality")
@Data
public class WaterQuality {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String sourceName;
    private String district;
    private Double ph;
    private Double turbidity;
    private String riskLevel;
    private LocalDate testDate;
}