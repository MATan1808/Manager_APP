import QtQuick 6.5
import QtQuick.Controls 6.5

Page {
    title: "Chuyển Tiền"

    Column {
        spacing: 15
        anchors.centerIn: parent

        TextField {
            id: receiverField
            placeholderText: "Nhập số tài khoản người nhận"
            width: 300
        }

        TextField {
            id: amountField
            placeholderText: "Nhập số tiền"
            width: 300
            validator: DoubleValidator { bottom: 0.01 }
        }

        Button {
            text: "Xác nhận Chuyển"
            width: 200
            onClicked: {
                if (receiverField.text !== "" && amountField.text !== "") {
                    stackView.push("SuccessScreen.qml")
                }
            }
        }

        Button {
            text: "Quay lại"
            width: 200
            onClicked: stackView.pop()
        }
    }
}
