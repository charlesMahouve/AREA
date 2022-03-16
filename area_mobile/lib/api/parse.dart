import 'dart:io';

import 'package:email_validator/email_validator.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:oauth2/oauth2.dart' as oauth2;
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web_auth/flutter_web_auth.dart';
import "package:flutter_brand_icons/flutter_brand_icons.dart";

/// The class for handle user's data.
class ParseAPI {
  String domaine = "c"; // to fill
  final String applicationId = "";
  final String key = "";
  String userId = "",
      sessionToken = "",
      firstName = "",
      lastName = "",
      username = "";
  String name = "";
  final String googleClientId = "dvf";
  final String microsoftClientId = "";
  final String githubClientId = "";
  bool firstTimeService = true;

  /// login with google_sign_in
  ///

  /// The function for login a user.
  Future<bool> loginUser(String username, String password) async {
    try {
      var resp =
          await http.post(Uri.parse('http://localhost:8080/api/auth/signin'),
              headers: {
                HttpHeaders.contentTypeHeader: 'application/json',
              },
              body: json.encode({"username": username, "password": password}));
      if (resp.statusCode != 200) {
        print("Error: ${resp.reasonPhrase}, Status Code: ${resp.statusCode}");
        return false;
      }

      var body = json.decode(resp.body);
      this.userId = body['objectId'];
      this.sessionToken = body['sessionToken'];
      this.firstName = body['first_name'];
      this.lastName = body['last_name'];
      this.username = body['username'];
      this.firstTimeService = false;
    } catch (err) {
      print("Error when trying to login user ! $err");
      return false;
    }
    return true;
  }

  /// The function for register the user.
  Future<bool> registerUser(String email, String password) async {
    try {
      var resp =
          await http.post(Uri.parse('http://localhost:8080/api/auth/signup'),
              headers: {'Content-Type': 'application/json'},
              body: json.encode({
                "username": email,
                "email": email,
                "password": password,
                "roles": ["user"]
              }));
      if (resp.statusCode == 500) {
        print("Error: ${resp.reasonPhrase}, Status Code: ${resp.statusCode}");
        return false;
      }
      var body = json.decode(resp.body);
      this.userId = body['objectId'];
      this.sessionToken = body['sessionToken'];
      this.username = username;
    } catch (err) {
      print("Error when trying to register user ! $err");
      return false;
    }
    return true;
  }

  /// The function reset user password.
  Future<bool> resetPassword(String email) async {
    try {
      var resp = await http.post(Uri.parse('$domaine/user/email'),
          headers: {
            "Content-Type": "application/json",
          },
          body: json.encode({"email": email}));
      if (resp.statusCode != 200 && resp.statusCode != 202) {
        return false;
      }
    } catch (err) {
      print("Error when trying to reset password... $err");
    }

    return true;
  }

  /// The function to get user's action reaction.
  Future<List<dynamic>> getUserAreas() async {
    try {
      var resp = await http.post(
          Uri.parse('http://localhost:8080/api/area/myareas'),
          headers: {"Authorization": "Bearer $sessionToken"});

      if (resp.statusCode != 200) {
        return [];
      }

      return (json.decode(resp.body) as List);
    } catch (err) {
      print("Error when trying to get user area list... $err");
    }
    return [];
  }

  /// The function for update active area.
  Future<bool> updateActiveArea(bool isActif, String areaId) async {
    try {
      var resp = await http.put(Uri.parse('$domaine/area/$areaId/'),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer $sessionToken"
          },
          body: json.encode({'is_actif': isActif}));
      if (resp.statusCode != 200) {
        return false;
      }
      return true;
    } catch (err) {
      print("Error when trying to get user area list... $err");
    }
    return false;
  }

  /// The function to get the user Service connected.
  Future<List<dynamic>> getServiceUserConnected() async {
    try {
      var resp = await http.post(
          Uri.parse('http://localhost:8080/api/service/connect'),
          headers: {
            "Authorization": "Bearer $sessionToken",
            'Content-Type': 'application/json',
            "x-access-token": "Bearer $sessionToken"
          },
          body: json.encode({"serviceName": name}));
      if (resp.statusCode != 200) {
        return [];
      }
      return (json.decode(resp.body)['results'] as List);
    } catch (err) {
      print("Error when trying to get user area list... $err");
    }
    return [];
  }

  /// The function to get a service
  Future<List<dynamic>> getServices() async {
    try {
      http.Response response = await http.post(
        Uri.parse('http://localhost:8080/api/service/connect '), // to fill
        headers: {"Authorization": "Bearer ${this.sessionToken}"},
      );
      List<dynamic> data = json.decode(response.body)['results'];
      return data;
    } catch (e) {
      return List<dynamic>.empty();
    }
  }

  /// The function for create action reaction.
  Future<bool> createArea(dynamic body) async {
    try {
      var resp = await http.post(
          Uri.parse('http://localhost:8080/api/area/create'),
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer $sessionToken"
          },
          body: json.encode(body));
      if (resp.statusCode != 202) {
        print('Body resp ${resp.body}');
        return false;
      }
      return true;
    } catch (err) {
      print("Error when trying to get user area list... $err");
    }
    return false;
  }

  Future<bool> deleteArea(String areaId) async {
    try {
      var resp = await http.delete(Uri.parse('$domaine/area/$areaId/'),
          headers: {"Authorization": "Bearer $sessionToken"});

      if (resp.statusCode == 500) {
        print('Body resp ${resp.body}');
        return false;
      }
      return true;
    } catch (err) {
      print("Error when trying to get user area list... $err");
    }
    return false;
  }

  Future<bool> revokeToken(String service) async {
    try {
      var resp = await http.delete(Uri.parse('$domaine/service/$service'),
          headers: {"Authorization": "Bearer $sessionToken"});

      if (resp.statusCode == 500) {
        print('Body resp ${resp.body} Status: ${resp.statusCode}');
        return false;
      }
      return true;
    } catch (err) {
      print("Error when trying to get user area list... $err");
    }
    return false;
  }
}
