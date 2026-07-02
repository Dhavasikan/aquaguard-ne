package com.health.monitor.service;

import com.health.monitor.entity.CaseReport;
import com.health.monitor.repository.CaseReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CaseReportService {

    @Autowired
    private CaseReportRepository repository;

    public List<CaseReport> getAllReports() {
        return repository.findAll();
    }

    public CaseReport getReportById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public CaseReport saveReport(CaseReport report) {
        return repository.save(report);
    }

    public CaseReport updateReport(Integer id, CaseReport newData) {
        CaseReport existing = repository.findById(id).orElse(null);
        if (existing == null) return null;
        existing.setPatientName(newData.getPatientName());
        existing.setAge(newData.getAge());
        existing.setGender(newData.getGender());
        existing.setVillage(newData.getVillage());
        existing.setDistrict(newData.getDistrict());
        existing.setSymptoms(newData.getSymptoms());
        existing.setDiseaseSuspected(newData.getDiseaseSuspected());
        existing.setStatus(newData.getStatus());
        return repository.save(existing);
    }

    public void deleteReport(Integer id) {
        repository.deleteById(id);
    }
}