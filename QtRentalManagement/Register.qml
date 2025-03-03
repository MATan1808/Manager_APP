import QtQuick 2.15          // Nhập module QtQuick để sử dụng các thành phần giao diện cơ bản như Rectangle, Text
import QtQuick.Controls 2.15 // Nhập module Controls để sử dụng các thành phần giao diện nâng cao như TextField, Button
import QtQuick.Layouts 1.15  // Nhập module Layouts để sắp xếp giao diện theo bố cục (ColumnLayout)

Rectangle {                  // Thành phần gốc của trang đăng ký
    id: registerPage         // Đặt ID để tham chiếu đến Rectangle trong QML

    // Gradient nền cho giao diện
    gradient: Gradient {
        GradientStop { position: 0.0; color: "#FCE4EC" } // Màu hồng nhạt ở trên
        GradientStop { position: 1.0; color: "#FFFFFF" } // Màu trắng ở dưới
    }

    ColumnLayout {           // Sử dụng ColumnLayout để sắp xếp các thành phần theo chiều dọc
        anchors.centerIn: parent // Căn giữa toàn bộ layout trong Rectangle
        spacing: 20          // Khoảng cách giữa các thành phần là 20 pixel

        Text {               // Tiêu đề "Register"
            id: registerTitle
            text: "Register" // Nội dung văn bản hiển thị
            font.pixelSize: 30 // Kích thước chữ lớn hơn cho tiêu đề
            font.bold: true  // Chữ in đậm
            color: "#000000" // Màu đen để rõ ràng trên nền gradient
            Layout.alignment: Qt.AlignHCenter // Căn giữa tiêu đề theo chiều ngang
        }

        // Vùng chứa các trường nhập liệu, có bóng đổ thủ công
        Item {
            Layout.preferredWidth: 300 // Chiều rộng của vùng nhập liệu
            Layout.preferredHeight: 200 // Chiều cao của vùng nhập liệu (tăng lên vì có thêm email)

            // Rectangle giả lập bóng đổ
            Rectangle {
                anchors.fill: inputArea
                anchors.margins: -5
                color: "#80000000" // Màu xám nhạt cho bóng đổ
                radius: 15 // Góc bo tròn lớn hơn một chút để tạo hiệu ứng mềm
                x: 3 // Dịch chuyển sang phải để tạo bóng
                y: 3 // Dịch chuyển xuống dưới để tạo bóng
                z: -1 // Đặt phía sau vùng nhập liệu
            }

            Rectangle {      // Vùng nhập liệu chính
                id: inputArea
                anchors.fill: parent
                color: "white"   // Màu nền trắng
                radius: 10       // Góc bo tròn 10 pixel
                opacity: 0.9     // Độ mờ nhẹ để tạo hiệu ứng trong suốt

                ColumnLayout {   // Sắp xếp các trường nhập liệu theo chiều dọc
                    anchors.fill: parent // Điền đầy vùng chứa
                    anchors.margins: 20 // Khoảng cách từ viền vào trong
                    spacing: 15      // Khoảng cách giữa các trường

                    TextField {      // Trường nhập liệu cho username
                        id: registerUsername // Đặt ID để tham chiếu đến TextField
                        placeholderText: "Username" // Văn bản gợi ý
                        Layout.fillWidth: true // Điền đầy chiều rộng của layout
                        font.pixelSize: 16 // Kích thước chữ lớn hơn

                        background: Rectangle { // Tùy chỉnh nền của TextField
                            color: "#F0F0F0" // Màu nền xám nhạt
                            radius: 5    // Góc bo tròn
                            border.color: parent.activeFocus ? "#FF4D4D" : "#D3D3D3" // Đổi màu viền khi focus
                            border.width: parent.activeFocus ? 2 : 1 // Tăng độ dày viền khi focus
                        }

                        // Hiệu ứng khi focus
                        Behavior on scale {
                            NumberAnimation { duration: 200 } // Hiệu ứng phóng to nhẹ khi focus
                        }
                        onFocusChanged: scale = focus ? 1.05 : 1.0 // Phóng to 5% khi focus
                    }

                    TextField {      // Trường nhập liệu cho email
                        id: registerEmail // Đặt ID để tham chiếu đến TextField
                        placeholderText: "Email" // Văn bản gợi ý
                        Layout.fillWidth: true // Điền đầy chiều rộng của layout
                        font.pixelSize: 16 // Kích thước chữ lớn hơn

                        background: Rectangle { // Tùy chỉnh nền của TextField
                            color: "#F0F0F0" // Màu nền xám nhạt
                            radius: 5    // Góc bo tròn
                            border.color: parent.activeFocus ? "#FF4D4D" : "#D3D3D3" // Đổi màu viền khi focus
                            border.width: parent.activeFocus ? 2 : 1 // Tăng độ dày viền khi focus
                        }

                        // Hiệu ứng khi focus
                        Behavior on scale {
                            NumberAnimation { duration: 200 } // Hiệu ứng phóng to nhẹ khi focus
                        }
                        onFocusChanged: scale = focus ? 1.05 : 1.0 // Phóng to 5% khi focus
                    }

                    TextField {      // Trường nhập liệu cho password
                        id: registerPassword // Đặt ID để tham chiếu đến TextField
                        placeholderText: "Password" // Văn bản gợi ý
                        echoMode: TextInput.Password // Ẩn nội dung nhập dưới dạng dấu chấm
                        Layout.fillWidth: true // Điền đầy chiều rộng của layout
                        font.pixelSize: 16 // Kích thước chữ lớn hơn

                        background: Rectangle { // Tùy chỉnh nền của TextField
                            color: "#F0F0F0" // Màu nền xám nhạt
                            radius: 5    // Góc bo tròn
                            border.color: parent.activeFocus ? "#FF4D4D" : "#D3D3D3" // Đổi màu viền khi focus
                            border.width: parent.activeFocus ? 2 : 1 // Tăng độ dày viền khi focus
                        }

                        // Hiệu ứng khi focus
                        Behavior on scale {
                            NumberAnimation { duration: 200 } // Hiệu ứng phóng to nhẹ khi focus
                        }
                        onFocusChanged: scale = focus ? 1.05 : 1.0 // Phóng to 5% khi focus
                    }
                }
            }
        }

        Button {             // Nút nhấn để thực hiện đăng ký
            id: registerButton
            text: "Register" // Nội dung hiển thị trên nút
            Layout.alignment: Qt.AlignHCenter // Căn giữa nút theo chiều ngang
            font.pixelSize: 16 // Kích thước chữ lớn hơn

            background: Rectangle { // Tùy chỉnh nền của nút
                id: backgroundRectRegister
                color: registerButton.hovered ? "#50E3C2" : "#4A90E2" // Đổi màu khi hover (xanh ngọc sang xanh lam)
                radius: 5    // Góc bo tròn
                border.color: "#000000" // Viền màu đen
                border.width: 2 // Độ dày viền 2 pixel
            }

            contentItem: Text { // Tùy chỉnh nội dung của nút (chữ "Register")
                text: parent.text
                font: parent.font
                color: "#000000" // Màu đen để rõ ràng trên nền button
                horizontalAlignment: Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
            }

            // Hiệu ứng khi nhấn và hover
            Behavior on scale {
                NumberAnimation { duration: 200 }
            }
            onHoveredChanged: scale = hovered ? 1.1 : 1.0 // Phóng to 10% khi hover

            onClicked: {     // Sự kiện được gọi khi nút được nhấn
                loginManager.registerUser(registerUsername.text, registerEmail.text, registerPassword.text) // Gọi hàm registerUser

                // Hiệu ứng nhấn
                scale = 0.95
                scaleAnimation.start()
            }

            // Hiệu ứng nhấn mượt mà
            NumberAnimation {
                id: scaleAnimation
                target: parent
                property: "scale"
                to: 1.0
                duration: 200
            }
        }

        Button {             // Nút để quay lại trang đăng nhập
            id: backToLoginButton
            text: "Back to Login" // Nội dung hiển thị trên nút
            Layout.alignment: Qt.AlignHCenter // Căn giữa nút theo chiều ngang
            font.pixelSize: 14 // Kích thước chữ nhỏ hơn một chút

            background: Rectangle { // Tùy chỉnh nền của nút
                id: backgroundRectBack
                color: backToLoginButton.hovered ? "#4A90E2" : "#50E3C2" // Đổi màu khi hover (xanh lam sang xanh ngọc)
                radius: 5    // Góc bo tròn
                border.color: "#000000" // Viền màu đen
                border.width: 2 // Độ dày viền 2 pixel
            }

            contentItem: Text { // Tùy chỉnh nội dung của nút (chữ "Back to Login")
                text: parent.text
                font: parent.font
                color: "#000000" // Màu đen để rõ ràng trên nền button
                horizontalAlignment: Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
            }

            // Hiệu ứng khi nhấn và hover
            Behavior on scale {
                NumberAnimation { duration: 200 }
            }
            onHoveredChanged: scale = hovered ? 1.1 : 1.0 // Phóng to 10% khi hover

            onClicked: {     // Sự kiện được gọi khi nút được nhấn
                stackView.pop() // Quay lại trang trước đó (Login.qml) trong StackView
            }
        }
    }

    // Hiệu ứng chuyển trang mượt mà
    Behavior on opacity {
        NumberAnimation { duration: 500 } // Hiệu ứng mờ dần khi chuyển trang
    }
}
