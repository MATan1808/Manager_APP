#include "LoginManager.h"       // Bao gồm file header của LoginManager để triển khai các hàm

LoginManager::LoginManager(QObject *parent) : QObject(parent) { // Constructor của LoginManager
    networkManager = new QNetworkAccessManager(this); // Khởi tạo NetworkAccessManager để gửi yêu cầu HTTP
}

void LoginManager::loginUser(const QString &username, const QString &password) { // Hàm đăng nhập người dùng
    QUrl url("http://localhost:3000/api/auth/login"); // Định nghĩa URL API cho đăng nhập
    QNetworkRequest request(url); // Tạo yêu cầu mạng với URL đã định nghĩa
    request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json"); // Thiết lập header cho yêu cầu là JSON

    QJsonObject json; // Tạo đối tượng JSON để chứa dữ liệu gửi đi
    json["username"] = username; // Thêm username vào JSON
    json["password"] = password; // Thêm password vào JSON

    QNetworkReply *reply = networkManager->post(request, QJsonDocument(json).toJson()); // Gửi yêu cầu POST với dữ liệu JSON
    connect(reply, &QNetworkReply::finished, this, &LoginManager::onLoginReply); // Kết nối tín hiệu finished để xử lý phản hồi
}

void LoginManager::registerUser(const QString &username, const QString &email, const QString &password) { // Hàm đăng ký người dùng
    QUrl url("http://localhost:3000/api/auth/register"); // Định nghĩa URL API cho đăng ký
    QNetworkRequest request(url); // Tạo yêu cầu mạng với URL đã định nghĩa
    request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json"); // Thiết lập header cho yêu cầu là JSON

    QJsonObject json; // Tạo đối tượng JSON để chứa dữ liệu gửi đi
    json["username"] = username; // Thêm username vào JSON
    json["email"] = email;       // Thêm email vào JSON
    json["password"] = password; // Thêm password vào JSON

    QNetworkReply *reply = networkManager->post(request, QJsonDocument(json).toJson()); // Gửi yêu cầu POST với dữ liệu JSON
    connect(reply, &QNetworkReply::finished, this, &LoginManager::onRegisterReply); // Kết nối tín hiệu finished để xử lý phản hồi
}

void LoginManager::onLoginReply() { // Slot xử lý phản hồi từ server khi đăng nhập
    QNetworkReply *reply = qobject_cast<QNetworkReply*>(sender()); // Lấy đối tượng reply từ sender
    if (!reply) return; // Nếu reply rỗng, thoát khỏi hàm

    QByteArray responseData = reply->readAll(); // Đọc toàn bộ dữ liệu phản hồi từ server
    QJsonDocument jsonDoc = QJsonDocument::fromJson(responseData); // Chuyển đổi dữ liệu thành JSON document
    QJsonObject jsonObj = jsonDoc.object(); // Lấy đối tượng JSON từ document

    if (reply->error() == QNetworkReply::NoError) { // Kiểm tra nếu không có lỗi từ phản hồi
        QString token = jsonObj["token"].toString(); // Lấy token từ JSON
        emit loginSuccess(token); // Phát tín hiệu đăng nhập thành công với token
    } else {
        QString message = jsonObj["message"].toString(); // Lấy thông báo lỗi từ JSON
        if (message.isEmpty()) message = "Login failed"; // Nếu không có thông báo, đặt mặc định
        emit loginFailed(message); // Phát tín hiệu đăng nhập thất bại với thông báo lỗi
    }

    reply->deleteLater(); // Giải phóng bộ nhớ của reply
}

void LoginManager::onRegisterReply() { // Slot xử lý phản hồi từ server khi đăng ký
    QNetworkReply *reply = qobject_cast<QNetworkReply*>(sender()); // Lấy đối tượng reply từ sender
    if (!reply) return; // Nếu reply rỗng, thoát khỏi hàm

    QByteArray responseData = reply->readAll(); // Đọc toàn bộ dữ liệu phản hồi từ server
    QJsonDocument jsonDoc = QJsonDocument::fromJson(responseData); // Chuyển đổi dữ liệu thành JSON document
    QJsonObject jsonObj = jsonDoc.object(); // Lấy đối tượng JSON từ document

    if (reply->error() == QNetworkReply::NoError) { // Kiểm tra nếu không có lỗi từ phản hồi
        emit registerSuccess(); // Phát tín hiệu đăng ký thành công
    } else {
        QString message = jsonObj["message"].toString(); // Lấy thông báo lỗi từ JSON
        if (message.isEmpty()) message = "Registration failed"; // Nếu không có thông báo, đặt mặc định
        emit registerFailed(message); // Phát tín hiệu đăng ký thất bại với thông báo lỗi
    }

    reply->deleteLater(); // Giải phóng bộ nhớ của reply
}
