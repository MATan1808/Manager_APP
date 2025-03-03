import QtQuick 2.15
import QtQuick.Controls 2.15
import QtQuick.Layouts 1.15
import com.example 1.0

ApplicationWindow {
    visible: true
    width: 400
    height: 600
    title: "Login & Register"

    LoginManager {
        id: loginManager

        onLoginSuccess: {
            console.log("Login successful! Token: " + token)
            statusText.text = "Login successful!"
            statusText.color = "green"
        }

        onLoginFailed: {
            console.log("Login failed: " + message)
            statusText.text = "Login failed: " + message
            statusText.color = "red"
        }

        onRegisterSuccess: {
            console.log("Registration successful!")
            statusText.text = "Registration successful!"
            statusText.color = "green"
        }

        onRegisterFailed: {
            console.log("Registration failed: " + message)
            statusText.text = "Registration failed: " + message
            statusText.color = "red"
        }
    }

    StackView {
        id: stackView
        anchors.fill: parent
        initialItem: "qrc:/QML/Login.qml"
    }

    Text {
        id: statusText
        anchors.bottom: parent.bottom
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.bottomMargin: 20
        font.pixelSize: 16
    }
}
