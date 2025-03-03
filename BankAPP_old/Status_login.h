#ifndef STATUS_LOGIN_H
#define STATUS_LOGIN_H

#include <QObject>

class Status : public QObject {
    Q_OBJECT
    Q_PROPERTY(QString status READ status WRITE setStatus NOTIFY statusChanged)


public:
    explicit Status(QObject *parent = nullptr) : QObject(parent), mStatus("") {}

    // Hàm đăng nhập có thể gọi từ QML
    Q_INVOKABLE void login(const QString &username, const QString &password) {
        if (username == "youtube" && password == "youtube") {
            setStatus("Login Successful");
            emit loginSuccess();
        } else {
            setStatus("Username/Password is not correct");
            emit loginFail();
        }
    }

    // Getter cho thuộc tính status
    QString status() const {
        return mStatus;
    }

    // Setter cho status (cập nhật trạng thái đăng nhập)
    void setStatus(const QString &status) {
        if (mStatus == status)
            return;

        mStatus = status;
        emit statusChanged();
    }

signals:
    void loginSuccess();  // Phát tín hiệu khi đăng nhập thành công
    void loginFail();     // Phát tín hiệu khi đăng nhập thất bại
    void statusChanged(); // Phát tín hiệu khi trạng thái thay đổi

private:
    QString mStatus; // Biến lưu trạng thái đăng nhập
};

#endif // STATUS_LOGIN_H
