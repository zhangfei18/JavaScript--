const MacroCommand = function () {
    return {
        commandsList: [],
        add: function (command) {
            this.commandsList.push(command);
        },
        execute: function () {
            for (let i = 0, command; command = this.commandsList[i++];) {
                command.execute();
            }
        }
    }
}
// 创建子命令
const openAcCommand = { execute: function () { console.log('打开空调') } }
const openTvCommand = { execute: function () { console.log('打开电视') } }
const openSoundCommand = { execute: function () { console.log('打开音响') } }
const closeDoorCommand = { execute: function () { console.log('关门') } }
const openPcCommand = { execute: function () { console.log('打开电脑') } }
const openQQCommand = { execute: function () { console.log('打开QQ') } }
// 创建宏命令
const macroCommand1 = MacroCommand();
macroCommand1.add(openTvCommand)
macroCommand1.add(openSoundCommand)
const macroCommand2 = MacroCommand();
macroCommand2.add(closeDoorCommand)
macroCommand2.add(openPcCommand)
macroCommand2.add(openQQCommand)

// 更大的宏命令
const macroCommand = MacroCommand();
macroCommand.add(openAcCommand)
macroCommand.add(macroCommand1)
macroCommand.add(macroCommand2)
