#include <QApplication>         // Thư viện chính để tạo ứng dụng Qt, quản lý giao diện và sự kiện
#include <QQmlApplicationEngine> // Thư viện để chạy các file QML và tích hợp QML với C++
#include <QObject>              // Thư viện cơ bản chứa lớp QObject, cần thiết cho các lớp sử dụng tín hiệu và slot
#include "LoginManager.h"       // File header chứa định nghĩa lớp LoginManager

int main(int argc, char *argv[])
{
    QApplication app(argc, argv); // Khởi tạo ứng dụng Qt, nhận tham số dòng lệnh từ hệ điều hành

    // Đăng ký lớp LoginManager với QML engine
    // "com.example" là tên module, 1,0 là phiên bản, "LoginManager" là tên kiểu sẽ dùng trong QML
    qmlRegisterType<LoginManager>("com.example", 1, 0, "LoginManager");

    QQmlApplicationEngine engine; // Khởi tạo engine để tải và chạy các file QML

    const QUrl url(QStringLiteral("qrc:/QML/main.qml")); // Định nghĩa URL của file QML chính (main.qml) từ tài nguyên main.qrc

    // Kết nối tín hiệu objectCreated để kiểm tra xem QML có tải thành công hay không
    QObject::connect(&engine, &QQmlApplicationEngine::objectCreated,
                     &app, [url](QObject *obj, const QUrl &objUrl) {
                         if (!obj && url == objUrl) { // Nếu không tạo được đối tượng QML và URL khớp
                             QCoreApplication::exit(-1); // Thoát ứng dụng với mã lỗi -1
                         }
                     }, Qt::QueuedConnection); // Sử dụng QueuedConnection để xử lý tín hiệu bất đồng bộ

    engine.load(url); // Tải file main.qml từ tài nguyên để hiển thị giao diện

    return app.exec(); // Chạy vòng lặp sự kiện chính của ứng dụng và trả về mã thoát khi ứng dụng đóng
}
