#ifndef LOGINMANAGER_H       // Bảo vệ chống bao gồm nhiều lần (include guard)
#define LOGINMANAGER_H

#include <QObject>              // Thư viện cơ bản chứa lớp QObject, cần thiết cho tín hiệu và slot
#include <QNetworkAccessManager> // Thư viện để gửi yêu cầu HTTP (POST, GET, v.v.)
#include <QNetworkReply>        // Thư viện để xử lý phản hồi từ yêu cầu mạng
#include <QJsonDocument>        // Thư viện để làm việc với JSON (chuyển đổi dữ liệu JSON)
#include <QJsonObject>          // Thư viện để thao tác với các đối tượng JSON

class LoginManager : public QObject { // Định nghĩa lớp LoginManager, kế thừa từ QObject để hỗ trợ tín hiệu và slot
    Q_OBJECT                  // Macro Q_OBJECT để Qt xử lý tín hiệu và slot (cần thiết cho moc)

public:
    explicit LoginManager(QObject *parent = nullptr); // Constructor với tham số parent mặc định là nullptr

    Q_INVOKABLE void loginUser(const QString &username, const QString &password); // Hàm đăng nhập, có thể gọi từ QML
    Q_INVOKABLE void registerUser(const QString &username, const QString &email, const QString &password); // Hàm đăng ký, có thể gọi từ QML, thêm email

signals:                      // Các tín hiệu phát ra từ LoginManager để thông báo trạng thái cho QML
    void loginSuccess(const QString &token); // Tín hiệu khi đăng nhập thành công, trả về token
    void loginFailed(const QString &message); // Tín hiệu khi đăng nhập thất bại, trả về thông báo lỗi
    void registerSuccess();   // Tín hiệu khi đăng ký thành công
    void registerFailed(const QString &message); // Tín hiệu khi đăng ký thất bại, trả về thông báo lỗi

private slots:                // Các slot để xử lý phản hồi từ server (chỉ dùng trong C++)
    void onLoginReply();      // Slot xử lý phản hồi từ server khi đăng nhập
    void onRegisterReply();   // Slot xử lý phản hồi từ server khi đăng ký

private:
    QNetworkAccessManager *networkManager; // Đối tượng quản lý yêu cầu mạng, dùng để gửi yêu cầu HTTP
};

#endif // LOGINMANAGER_H       // Kết thúc include guard
