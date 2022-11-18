//SPDX-License-Identifier:MIT

pragma solidity ^0.8.1;

contract TodoContract {
    //variables
    string[] todos;

    //events
    event logAddask(address username, uint256 taskId);
    event logDeleteTask(uint256 taskId, bool isCompleted);

    //mapping
    mapping(uint256 => address) tasktoowner;
    address owner;
    Task[] private tasks;

    struct Task {
        uint256 taskId;
        string todoText;
        address username;
        bool isCompleted;
    }

    function addTask(string memory todoText) public {
        uint taskId = tasks.length;
        tasks.push(Task(taskId, todoText, msg.sender, false));
        tasktoowner[taskId] = msg.sender;
        emit logAddask(msg.sender, taskId);
    }

    function deleteTask(uint256 taskId) public {
        require(
            tasktoowner[taskId] == msg.sender,
            "Only owner can delete the task"
        );
        emit logDeleteTask(taskId, true);
    }

    function getTasks() public view returns (Task[] memory) {
        uint256 counter = 0;
        Task[] memory tempTasks = new Task[](tasks.length);
        for (uint i = 0; i < tasks.length; i++) {
            if (tasktoowner[i] == msg.sender) {
                tempTasks[counter] = tasks[i];
                counter++;
            }
        }

        Task[] memory actualTasks = new Task[](counter);
        for (uint i = 0; i < counter; i++) {
            actualTasks[i] = tempTasks[i];
        }

        return actualTasks;
    }
}
