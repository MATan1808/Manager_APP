import QtQuick 6.5
import QtQuick.Controls 6.5
import Status_Register 1.0

Rectangle {
    width: 400
    height: 600
    color: "#f4f4f4"

    Column {
        anchors.centerIn: parent
        spacing: 15

        Status_Register_Backend {
            id: myStatusRegister   // Sửa lại ID cho đúng
            onRegisterSuccess: {
                console.log("Register successful");
                root.isSignedIn = true;
            }
            onRegisterFail: {
                console.log("Register failed");
                root.isSignedIn = false;
            }
        }

        Text {
            text: "Register"
            font.pixelSize: 24
            color: "#333"
        }

        TextField {
            id: nameField
            placeholderText: "Full Name"
            width: 250
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
            text: "Sign Up"
            width: 200
            onClicked: {
                console.log("Registered: " + emailField.text)
                myStatusRegister.registerUser(nameField.text, emailField.text, passwordField.text)
            }
        }

        Button {
            text: "Back to Login"
            width: 200
            onClicked: stackView.pop()
        }

        Label {
            text: myStatusRegister.status   // Hiển thị trạng thái đăng ký
            color: "red"
            font.bold: true
        }
    }
}
