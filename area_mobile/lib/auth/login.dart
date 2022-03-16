import 'package:area_mobile/api/parse.dart';
import 'package:area_mobile/auth/reset.dart';
import 'package:area_mobile/home.dart';
import 'package:area_mobile/auth/register.dart';
import 'package:area_mobile/settings/settings.dart';
import 'package:flutter/material.dart';
import 'package:sign_button/sign_button.dart';
import 'package:flutter_web_auth/flutter_web_auth.dart';
import 'dart:io';
import 'package:http/http.dart' as http;

import 'package:email_validator/email_validator.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:oauth2/oauth2.dart' as oauth2;
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_web_auth/flutter_web_auth.dart';
import 'dart:ui' as ui;

/// The class for the login page.
class LoginPage extends StatefulWidget {
  static const routeName = '/';
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  bool _isVisible = false;
  ParseAPI _api = ParseAPI();
  final GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();

  get cookies => null;

  get UserData => null;

  void _onPressedIcon() {
    setState(() {
      _isVisible = !_isVisible;
    });
  }

  Widget _textInputField(
      String label,
      IconData icon,
      TextEditingController controller,
      TextInputType inputType,
      bool obscure,
      void Function()? onPress) {
    return Container(
      margin: EdgeInsets.only(top: 20),
      width: MediaQuery.of(context).size.width * 0.98,
      child: TextFormField(
        validator: (text) {
          if (text == null || text.isEmpty) {
            return '$label can\'t be empty !';
          }
          return null;
        },
        obscureText: obscure,
        controller: controller,
        keyboardType: inputType,
        decoration: InputDecoration(
            border:
                OutlineInputBorder(borderRadius: BorderRadius.circular(20.0)),
            suffixIcon: IconButton(icon: Icon(icon), onPressed: onPress),
            labelText: label),
      ),
    );
  }

  TextEditingController _login = TextEditingController();
  TextEditingController _password = TextEditingController();
  bool _isLoading = false;
  final _loginKey = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      appBar: AppBar(
        elevation: 0,
        backgroundColor: Colors.transparent,
        actions: [
          IconButton(
              icon: Icon(Icons.settings),
              onPressed: () {
                Navigator.of(context).pushNamed(SettingsPage.routeName,
                    arguments: {"api": _api});
              })
        ],
      ),
      body: Center(
        child: SingleChildScrollView(
            child: Form(
          key: _loginKey,
          child: Column(
            children: [
              Text("AREA",
                  style: TextStyle(
                      fontSize: MediaQuery.of(context).size.height * 0.05)),
              _textInputField("Login", Icons.account_box, _login,
                  TextInputType.emailAddress, false, null),
              _textInputField(
                  "Password",
                  _isVisible ? Icons.visibility : Icons.visibility_off,
                  _password,
                  TextInputType.text,
                  !_isVisible,
                  _onPressedIcon),
              Container(
                margin: EdgeInsets.only(top: 25),
                child: _isLoading
                    ? CircularProgressIndicator()
                    : Material(
                        elevation: 1.5,
                        color: Colors.blueGrey[400],
                        borderRadius: BorderRadius.circular(30),
                        child: MaterialButton(
                          minWidth: MediaQuery.of(context).size.width * 0.85,
                          onPressed: () async {
                            if (_loginKey.currentState!.validate()) {
                              setState(() {
                                _isLoading = true;
                              });
                              bool isLog = await _api.loginUser(
                                  _login.text, _password.text);
                              setState(() {
                                _isLoading = false;
                              });
                              if (isLog) {
                                Navigator.of(context).popAndPushNamed(
                                    HomePage.routeName,
                                    arguments: _api);
                              }
                              _scaffoldKey.currentState!.showSnackBar(SnackBar(
                                  behavior: SnackBarBehavior.floating,
                                  content: Text("Connexion failed !"),
                                  duration: Duration(seconds: 2)));
                            }
                          },
                          child: Text("Sign in"),
                        ),
                      ),
              ),
              Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                Text("Not register ?"),
                FlatButton(
                    shape: new RoundedRectangleBorder(
                        borderRadius: new BorderRadius.circular(30.0)),
                    splashColor: Colors.transparent,
                    onPressed: () async {
                      Navigator.of(context)
                          .popAndPushNamed(RegisterPage.routeName);
                    },
                    child: Text(
                      "Register",
                      style: TextStyle(
                          fontSize: 14,
                          foreground: Paint()
                            ..shader = ui.Gradient.linear(
                              const Offset(0, 0),
                              const Offset(200, 0),
                              <Color>[
                                Colors.grey,
                                const Color(0xFF78909C),
                              ],
                            )),
                    ))
              ]),
              Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                Text("Reset password ?"),
                FlatButton(
                    shape: new RoundedRectangleBorder(
                        borderRadius: new BorderRadius.circular(30.0)),
                    splashColor: Colors.transparent,
                    onPressed: () async {
                      Navigator.of(context).pushNamed(ResetPage.routeName);
                    },
                    child: Text(
                      "Reset",
                      style: TextStyle(
                          fontSize: 14,
                          foreground: Paint()
                            ..shader = ui.Gradient.linear(
                              const Offset(0, 0),
                              const Offset(200, 0),
                              <Color>[
                                Colors.grey,
                                const Color(0xFF78909C),
                              ],
                            )),
                    ))
              ]),
              Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                SignInButton.mini(
                  buttonType: ButtonType.google,
                  buttonSize: ButtonSize.large,
                  onPressed: () {
                    this.googleAuth();
                  },
                ),
              ]),
              Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                SignInButton.mini(
                  buttonType: ButtonType.microsoft,
                  buttonSize: ButtonSize.large,
                  onPressed: () {
                    this.microsoftAuth();
                  },
                ),
              ]),
              Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                SignInButton.mini(
                  buttonType: ButtonType.github,
                  buttonSize: ButtonSize.large,
                  onPressed: () {
                    this.githubAuth();
                  },
                ),
              ]),
            ],
          ),
        )),
      ),
    );
  }

  void _updateCookie(http.Response response) {
    String allSetCookie = response.headers['set-cookie']!;
    if (allSetCookie != null) {
      var setCookies = allSetCookie.split(',');
      for (var setCookie in setCookies) {
        var cookies = setCookie.split(';');
        for (var cookie in cookies) {
          _setCookie(cookie);
        }
      }
    }
  }

  void _setCookie(String rawCookie) {
    if (rawCookie.length > 0) {
      var keyValue = rawCookie.split('=');
      if (keyValue.length == 2) {
        var key = keyValue[0].trim();
        var value = keyValue[1];
        // ignore keys that aren't cookies
        if (key == 'Path' || key == 'Expires') return;
        this.cookies[key] = value;
      }
    }
  }

  void getAccess(String uri, String code, String provider) async {
    final response = await http.post(
      Uri.http('http://localhost:8080', '/auth/$provider'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'authorization_code': code,
        'redirect_uri': uri,
        'origin': 'mobile',
      }),
    );
    if (response.statusCode == 200) {
      this._updateCookie(response);
      var user = UserData.fromJson(jsonDecode(response.body));
      Navigator.of(context)
          .popAndPushNamed(HomePage.routeName, arguments: _api);
    } else {
      print("Error:");
    }
  }

  void googleAuth() async {
    const googleClientId = "";
    const String callbackUrlScheme =
        'com.googleusercontent.apps.$googleClientId';
    final url = Uri.https('accounts.google.com', '/o/oauth2/v2/auth', {
      'response_type': 'code',
      'client_id': '$googleClientId.apps.googleusercontent.com',
      'redirect_uri': '$callbackUrlScheme:/',
      'access_type': 'offline',
      'scope':
          'email profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/youtube',
    });
    final result = await FlutterWebAuth.authenticate(
        url: url.toString(), callbackUrlScheme: callbackUrlScheme);
    final code = Uri.parse(result).queryParameters['code'];
    getAccess('$callbackUrlScheme:/', code!, 'google');
  }

  void microsoftAuth() async {
    const String redirectUri = 'area://callback';
    var microsoftClientId;
    final url = Uri.https(
        'login.microsoftonline.com', '/common/oauth2/v2.0/authorize', {
      'response_type': 'code',
      'client_id': microsoftClientId,
      'redirect_uri': redirectUri,
      'scope':
          'openid user.read offline_access Mail.ReadBasic Mail.Read Mail.ReadWrite Mail.Send Calendars.Read Calendars.ReadWrite Tasks.ReadWrite',
    });
    final result = await FlutterWebAuth.authenticate(
        url: url.toString(), callbackUrlScheme: 'area');
    final code = Uri.parse(result).queryParameters['code'];
    getAccess(redirectUri, code!, 'microsoft');
  }

  void githubAuth() async {
    const String redirectUri = 'area://callback';
    var githubClientId;
    final url = Uri.https('github.com', '/login/oauth/authorize', {
      'response_type': 'code',
      'client_id': githubClientId,
      'redirect_uri': redirectUri,
      'scope': 'user:read user:email',
    });
    final result = await FlutterWebAuth.authenticate(
        url: url.toString(), callbackUrlScheme: 'area');
    final code = Uri.parse(result).queryParameters['code'];
    getAccess(redirectUri, code!, 'github');
  }
}

class UserData {}
