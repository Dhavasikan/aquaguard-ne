package com.health.monitor.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

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
}