import QtQuick 6.5
import QtQuick.Controls 6.5
import Status_Login 1.0

Rectangle {
    id: root
    width: 400
    height: 600
    color: "#f4f4f4"

    // Nhận stackView từ `main.qml`
    property StackView stackView

    // Biến kiểm tra trạng thái đăng nhập
    property bool isSignedIn: false

    // Gọi backend xử lý đăng nhập
    Status_Login_Backend {
        id: mystatus
        onLoginSuccess: {
            console.log("onLoginSuccess");
            root.isSignedIn = true;
        }
        onLoginFail: {
            console.log("onLoginFail");
            root.isSignedIn = false;
        }
    }

    Column {
        visible: !isSignedIn  // Ẩn đi nếu đã đăng nhập
        anchors.centerIn: parent
        spacing: 15

        Text {
            text: "Login"
            font.pixelSize: 24
            color: "#333"
        }

        TextField {
            id: emailField
            placeholderText: "Email"
            width: 250
        }

        TextField {
            id: passwordField
            placeholderText: "Password"
            echoMode: TextInput.Password
            width: 250
        }

        Button {
            text: "Login"
            width: 200
            onClicked: {
                console.log("Login clicked with: " + emailField.text)
                mystatus.login(emailField.text, passwordField.text)
            }
        }

        Button {
            text: "Register"
            width: 200
            onClicked: {
                if (stackView) {
                    stackView.push("RegisterScreen.qml")
                } else {
                    console.warn("stackView is not defined!")
                }
            }
        }

        Button {
            text: "Forgot password"
            width: 200
            font.family: "Times New Roman"
            font.pixelSize: 10
            onClicked: console.log("Forgot password clicked")
        }

        Label {
            text: mystatus.status   // Hiển thị trạng thái đăng nhập
            color: "red"
            font.bold: true
        }
    }
}
