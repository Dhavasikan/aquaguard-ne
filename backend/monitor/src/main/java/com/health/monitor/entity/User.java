package com.health.monitor.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String fullName;
    private String userCode;
    private String email;
    private String password;
    private String role;
    private String district;
    private String phone;
}