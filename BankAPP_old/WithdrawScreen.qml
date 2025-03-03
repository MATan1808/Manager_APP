import QtQuick 6.5
import QtQuick.Controls 6.5

Page {
    title: "Rút Tiền"

    Column {
        spacing: 15
        anchors.centerIn: parent

        TextField {
            id: amountField
            placeholderText: "Nhập số tiền muốn rút"
            width: 300
            validator: DoubleValidator { bottom: 0.01 }
        }

        Button {
            text: "Xác nhận Rút"
            width: 200
            onClicked: {
                if (amountField.text !== "") {
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
