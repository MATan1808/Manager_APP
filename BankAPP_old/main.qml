import QtQuick 6.5
import QtQuick.Controls 6.5

ApplicationWindow {
    visible: true
    width: 400
    height: 600

    StackView {
        id: stackView
        anchors.fill: parent
        initialItem: LoginScreen {
            stackView: stackView  // Truyền stackView vào LoginScreen
        }

        pushEnter: Transition {
            PropertyAnimation {
                property: "opacity"
                from: 0
                to: 1
                duration: 500
            }
        }

        pushExit: Transition {
            PropertyAnimation {
                property: "opacity"
                from: 1
                to: 0
                duration: 300
            }
        }

        popEnter: Transition {
            PropertyAnimation {
                property: "opacity"
                from: 0
                to: 1
                duration: 500
            }
        }

        popExit: Transition {
            PropertyAnimation {
                property: "opacity"
                from: 1
                to: 0
                duration: 300
            }
        }
    }
}
