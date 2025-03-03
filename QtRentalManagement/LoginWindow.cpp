#include "LoginWindow.h"

LoginWindow::LoginWindow(QWidget *parent) : QWidget(parent), ui(new Ui::DockWidget)
{
    ui->setupUi(this);
    loginManager = new LoginManager(this);

    // Kết nối sự kiện nút với các phương thức
    connect(ui->btnLogin, &QPushButton::clicked, this, &LoginWindow::handleLogin);
    connect(ui->btnRegister, &QPushButton::clicked, this, &LoginWindow::handleRegister);

    // Kết nối tín hiệu từ LoginManager
    connect(loginManager, &LoginManager::loginSuccess, this, &LoginWindow::onLoginSuccess);
    connect(loginManager, &LoginManager::loginFailed, this, &LoginWindow::onLoginFailed);
    connect(loginManager, &LoginManager::registerSuccess, this, &LoginWindow::onRegisterSuccess);
    connect(loginManager, &LoginManager::registerFailed, this, &LoginWindow::onRegisterFailed);
}

LoginWindow::~LoginWindow()
{
    delete ui;
}

// Xử lý đăng nhập
void LoginWindow::handleLogin()
{
    QString username = ui->usernameField->text();
    QString password = ui->passwordField->text();
    loginManager->loginUser(username, password);
}

// Xử lý đăng ký
void LoginWindow::handleRegister()
{
    QString username = ui->usernameField->text();
    QString password = ui->passwordField->text();
    loginManager->registerUser(username, password);
}

// Xử lý khi đăng nhập thành công
void LoginWindow::onLoginSuccess(QString token)
{
    ui->statusLabel->setText("Đăng nhập thành công! Token: " + token);
    ui->statusLabel->setStyleSheet("color: green;");
}

// Xử lý khi đăng nhập thất bại
void LoginWindow::onLoginFailed(QString message)
{
    ui->statusLabel->setText("Đăng nhập thất bại: " + message);
    ui->statusLabel->setStyleSheet("color: red;");
}

// Xử lý khi đăng ký thành công
void LoginWindow::onRegisterSuccess()
{
    ui->statusLabel->setText("Đăng ký thành công!");
    ui->statusLabel->setStyleSheet("color: green;");
}

// Xử lý khi đăng ký thất bại
void LoginWindow::onRegisterFailed(QString message)
{
    ui->statusLabel->setText("Đăng ký thất bại: " + message);
    ui->statusLabel->setStyleSheet("color: red;");
}
