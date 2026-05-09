// global array

const tasksList = [];

// Modals Ids
let sidebar = document.getElementById('sidebar');
let menuBtn = document.getElementById('menuBtn');
let openModal = document.getElementById('addTaskBtn');
let closeModal = document.getElementById('closeModal');
let taskModal = document.getElementById('taskModal');
let saveModal = document.getElementById('saveModal');
let taskGrid = document.getElementById("task-grid");

// Handle Ui with js 
openModal.addEventListener('click', function () {
  console.log('click add task modal');
  taskModal.style.display = 'flex';
})

closeModal.addEventListener('click', function () {
  console.log('click close modal');
  taskModal.style.display = 'none';
})

menuBtn.addEventListener('click', function () {
  console.log('click menu btn');
  sidebar.classList.toggle('open');
})

// Buttons Actions handle
taskGrid.addEventListener('click', function (event) {
})

function renderTask(task,taskNumber){
  let newTask = document.createElement('div');
  newTask.classList.add('task-card');
  newTask.dataset.index = taskNumber;
  newTask.innerHTML = ` <!-- Top -->
        <div class="task-top">

            <span class="badge high">${task.priority}</span>

            <div class="task-menu">
                <i data-lucide="more-horizontal"></i>
            </div>

        </div>

        <!-- Title -->
        <h4 class="task-title">${task.title}</h4>

        <!-- Description -->
        <p class="task-desc">
           ${task.description}
        </p>

        <!-- Date & Time -->
        <div class="task-date-time">

            <div class="task-info">
                <i data-lucide="calendar-days"></i>
                <span>${task.date}</span>
            </div>

            <div class="task-info">
                <i data-lucide="clock-3"></i>
                <span>${task.time}</span>
            </div>

        </div>

        <!-- Status -->
        <div class="task-status-row">

            <div class="task-status working">
                <span class="status-dot"></span>
                In Progress
            </div>

            <div class="task-priority">
                <i data-lucide="flag"></i>
                Priority Task
            </div>

        </div>

        <!-- Footer -->
        <div class="task-footer">

            <!-- User -->
            <div class="task-user">
                <div class="user-avatar">K</div>
                <span>Karan</span>
            </div>

            <!-- Actions -->
            <div class="task-actions">

                <button class="task-btn edit-task">
                    <i data-lucide="square-pen"></i>
                </button>

                <button class="task-btn delete-task">
                    <i data-lucide="trash-2"></i>
                </button>

                <button class="task-btn complete-task">
                    <i data-lucide="circle-check-big"></i>
                </button>

            </div>
        </div>`;
  taskGrid.appendChild(newTask);
  lucide.createIcons();
}
// save task form
saveModal.addEventListener('click', function (event) {
  console.log('click sumbit button');
  //  inputs values
  let title = document.getElementById('titleInput').value;
  let priority = document.getElementById('prioritySelect').value;
  let description = document.getElementById('descriptionInput').value;
  let date = document.getElementById('date-picker').value;
  let time = document.getElementById('time-picker').value;
  
  // object values tasks
  const task = {
    title: title,
    description: description,
    priority: priority,
    completed: false,
    date: date,
    time:time
  }
  tasksList.push(task);
  console.log(tasksList);
  renderTask(task,tasksList.length-1);
  taskModal.style.display = 'none';
})
lucide.createIcons()