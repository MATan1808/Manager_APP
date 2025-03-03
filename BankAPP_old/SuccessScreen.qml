import QtQuick 6.5
import QtQuick.Controls 6.5

Page {
    title: "Thành Công"

    Column {
        spacing: 15
        anchors.centerIn: parent

        Text {
            text: "Giao dịch thành công!"
            font.pixelSize: 20
        }

        Button {
            text: "Về trang chủ"
            width: 200
            onClicked: stackView.pop()
        }
    }
}
