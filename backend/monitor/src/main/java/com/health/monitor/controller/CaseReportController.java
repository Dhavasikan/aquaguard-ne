package com.health.monitor.controller;

import com.health.monitor.entity.CaseReport;
import com.health.monitor.service.CaseReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:3000")
public class CaseReportController {

    @Autowired
    private CaseReportService service;

    @GetMapping
    public List<CaseReport> getAll() {
        return service.getAllReports();
    }

    @GetMapping("/{id}")
    public CaseReport getOne(@PathVariable Integer id) {
        return service.getReportById(id);
    }

    @PostMapping
    public CaseReport create(@RequestBody CaseReport report) {
        return service.saveReport(report);
    }

    @PutMapping("/{id}")
    public CaseReport update(@PathVariable Integer id, @RequestBody CaseReport report) {
        return service.updateReport(id, report);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id) {
        service.deleteReport(id);
        return "Report deleted successfully";
    }
}