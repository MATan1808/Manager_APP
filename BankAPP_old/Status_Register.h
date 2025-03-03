#ifndef STATUS_REGISTER_H
#define STATUS_REGISTER_H
#include <QObject>

class Status_register: public QObject{
    Q_OBJECT
    Q_PROPERTY(QString status READ status WRITE setStatus NOTIFY statusChanged)
public:
    explicit Status_register(QObject *parent = nullptr) : QObject(parent), mStatus("") {}

    // Hàm đăng ky có thể gọi từ QML
    Q_INVOKABLE void registerUser(const QString &fullname ,const QString &email, const QString &password) {
        if (!fullname.isEmpty() && !email.isEmpty() && !password.isEmpty()) {

            setStatus("Register Successful");
            emit registerSuccess();
        } else {
            setStatus("Username/Password/Fullname is not empty");
            emit registerFail();
        }
    }

    // Getter cho thuộc tính status
    QString status() const {
        return mStatus;
    }

    // Setter cho status (cập nhật trạng thái đăng ký)
    void setStatus(const QString &status) {
        if (mStatus == status)
            return;

        mStatus = status;
        emit statusChanged();
    }

signals:
    void registerSuccess();  // Phát tín hiệu khi đăng ký thành công
    void registerFail();     // Phát tín hiệu khi đăng ký thất bại
    void statusChanged(); // Phát tín hiệu khi trạng thái thay đổi
private:
    QString mStatus; // Biến lưu trạng thái đăng nhập

};
#endif // STATUS_REGISTER_H
