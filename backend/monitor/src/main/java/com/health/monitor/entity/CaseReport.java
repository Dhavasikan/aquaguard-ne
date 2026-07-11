package com.health.monitor.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "case_reports")
@Data
public class CaseReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String patientName;
    private Integer age;
    private String gender;
    private String village;
    private String district;
    private String symptoms;
    private String diseaseSuspected;
    private LocalDate reportDate;
    private Integer reportedBy;
    private String status = "PENDING";
    private String actionsTaken = "";
@jakarta.persistence.Column(columnDefinition = "TEXT")
private String aiSummary = "";
}