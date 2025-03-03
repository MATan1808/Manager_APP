# Khai báo các module Qt cần thiết cho project
# core: Module cơ bản của Qt
# gui: Hỗ trợ giao diện đồ họa (dùng với QApplication)
# network: Hỗ trợ các yêu cầu mạng (HTTP) cho LoginManager
# qml: Hỗ trợ QML engine
# quick: Hỗ trợ các thành phần giao diện QML (như StackView, TextField)
QT += core gui network qml quick

# Nếu phiên bản Qt lớn hơn 4, thêm module widgets (tuy không cần thiết cho QML nhưng giữ lại để tương thích nếu cần)
greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

# Kích hoạt hỗ trợ C++17 cho project
CONFIG += c++17

# Danh sách các file nguồn (.cpp) của project
SOURCES += \
    LoginManager.cpp \  # File xử lý logic đăng nhập/đăng ký
    main.cpp            # File chính khởi chạy ứng dụng

# Danh sách các file header (.h) của project
HEADERS += \
    LoginManager.h      # File header định nghĩa lớp LoginManager

# Thêm file tài nguyên QML (.qrc) để quản lý các file QML
RESOURCES += \
    main.qrc            # File tài nguyên chứa các file QML

# Cấu hình triển khai mặc định
# Đối với qnx: triển khai vào /tmp/$${TARGET}/bin
qnx: target.path = /tmp/$${TARGET}/bin
# Đối với unix (không phải Android): triển khai vào /opt/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
# Nếu target.path không rỗng, thêm vào danh sách triển khai
!isEmpty(target.path): INSTALLS += target
