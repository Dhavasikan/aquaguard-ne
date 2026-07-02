package com.health.monitor.repository;

import com.health.monitor.entity.CaseReport;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CaseReportRepository extends JpaRepository<CaseReport, Integer> {
    List<CaseReport> findByDistrict(String district);
}