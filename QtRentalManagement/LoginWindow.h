#ifndef LOGINWINDOW_H
#define LOGINWINDOW_H

#include <QWidget>
#include "ui_login.h"  // Giao diện đã chuyển từ .ui sang .h
#include "LoginManager.h"  // Gọi API đăng nhập và đăng ký

class LoginWindow : public QWidget
{
    Q_OBJECT

public:
    explicit LoginWindow(QWidget *parent = nullptr);
    ~LoginWindow();

private slots:
    void handleLogin();
    void handleRegister();
    void onLoginSuccess(QString token);
    void onLoginFailed(QString message);
    void onRegisterSuccess();
    void onRegisterFailed(QString message);

private:
    Ui::DockWidget *ui;
    LoginManager *loginManager;
};

#endif // LOGINWINDOW_H
