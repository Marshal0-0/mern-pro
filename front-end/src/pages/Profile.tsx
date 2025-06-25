import React from 'react';
import "../Style/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../component/NavBar";
import data from "../data.json";
import clip1 from "../assets/clip-01.jpg";
import clip2 from "../assets/clip-02.jpg";
import clip3 from "../assets/clip-03.jpg";
import clip4 from "../assets/clip-04.jpg";
import profile from "../assets/profile.jpg";
import profileg from "../assets/profileGirl.jpg";
import { useState, useEffect, Fragment } from "react";
import { USER_SERVICE_URL } from '../utils/api';

interface User {
  gender: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
}

function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${USER_SERVICE_URL}/users/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `